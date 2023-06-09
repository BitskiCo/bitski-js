import SafeEventEmitter from '@metamask/safe-event-emitter';
import { createInflightCacheMiddleware } from 'eth-json-rpc-middleware/dist/inflight-cache';
import {
  EthEvent,
  EthEventListener,
  EthMethod,
  EthProvider,
  EthRequest,
  EthResult,
} from 'eth-provider-types';
import {
  JsonRpcEngine,
  JsonRpcFailure,
  JsonRpcSuccess,
  JsonRpcVersion,
  createAsyncMiddleware,
} from 'json-rpc-engine';

import { BITSKI_API_BASE_URL, BITSKI_SIGNER_BASE_URL, UNAUTHORIZED_ERRORS } from './constants';
import { createBlockCacheMiddleware } from './middleware/block-cache';
import { createChainManagementMiddleware } from './middleware/chain-management';
import { createEthAccountsMiddleware } from './middleware/eth-accounts';
import { createFetchRestMiddleware } from './middleware/fetch-rest';
import { createFetchRpcMiddleware } from './middleware/fetch-rpc';
import { createFilterMiddleware } from './middleware/filter';
import { createFixtureMiddleware } from './middleware/fixture';
import { createSignatureMiddleware } from './middleware/signature';
import { createSubscriptionMiddleware } from './middleware/subscription';
import { createTransactionValidatorMiddleware } from './middleware/transaction-validator';
import { createTypedDataSanitizerMiddleware } from './middleware/typed-data-sanitizer';
import createBrowserSigner from './signers/browser';
import { BitskiProviderStateStore, LocalStorageStore } from './store';
import { BitskiProviderConfig, InternalBitskiProviderConfig, RequestContext } from './types';
import { assert, expect } from './utils/type-utils';

// global value provided by scripts/insert-package-version.mjs
declare const BITSKI_PROVIDER_VERSION: string;

// Some eth methods result in a subscription being created, and return the id of that subscription.
// We need to keep track of the subscription id and the chain id it was created on, so we can
// call future methods to interact with or unsubscribe from the subscription.
const SUB_METHODS = new Set([
  EthMethod.eth_subscribe,
  EthMethod.eth_newFilter,
  EthMethod.eth_newBlockFilter,
  EthMethod.eth_newPendingTransactionFilter,
]);

const SUB_INTERACTION_METHODS = new Set([
  EthMethod.eth_getFilterChanges,
  EthMethod.eth_getFilterLogs,
]);

const UNSUB_METHODS = new Set([EthMethod.eth_unsubscribe, EthMethod.eth_uninstallFilter]);

export class BitskiProvider<Extra = unknown> implements EthProvider {
  private engine = new JsonRpcEngine();
  private events = new SafeEventEmitter();
  private destructors: (() => void)[] = [];

  private requestId = 0;
  private store: BitskiProviderStateStore;
  private config: InternalBitskiProviderConfig<Extra>;
  private didEmitConnect = false;
  private activeSubs = new Set<string>();

  constructor(config: BitskiProviderConfig<Extra>) {
    const { appId: maybeAppId, clientId } = config;

    const appId = maybeAppId ?? clientId;

    if (!appId) {
      throw new Error('You must provide an appId to BitskiProvider');
    } else if (maybeAppId && clientId) {
      throw new Error('You must provide either an appId or a clientId to BitskiProvider, not both');
    } else if (clientId) {
      console.warn('clientId is deprecated, please use appId instead');
    }

    this.config = {
      ...config,

      fetch: config.fetch ?? fetch,
      additionalHeaders: {
        'X-API-KEY': appId,
        'X-CLIENT-ID': appId,
        'X-CLIENT-VERSION': BITSKI_PROVIDER_VERSION,
        ...(config.additionalHeaders ?? {}),
      },

      apiBaseUrl: config.apiBaseUrl ?? BITSKI_API_BASE_URL,
      signerBaseUrl: config.signerBaseUrl ?? BITSKI_SIGNER_BASE_URL,

      store: config.store ?? new LocalStorageStore(),
      sign: config.sign ?? createBrowserSigner(),
    };

    this.store = new BitskiProviderStateStore(this.config.store);

    // Setup the engine
    const engine = this.engine;

    config.prependMiddleware?.forEach((middleware) =>
      // TODO: Need to typecast because JSON RPC engine middleware can't have
      // additional props on it, can get rid of this once we get rid of JSON RPC engine
      engine.push(createAsyncMiddleware(middleware as any)),
    );

    // Handles static responses
    engine.push(createFixtureMiddleware());
    engine.push(createChainManagementMiddleware());

    if (!config.disableValidation) {
      // Ensures that transactions are well formed (nonce, gas, gasPrice, from) before they are sent to Bitski
      engine.push(createTypedDataSanitizerMiddleware());
      engine.push(createTransactionValidatorMiddleware());
    }

    if (!config.disableCaching) {
      engine.push(createBlockCacheMiddleware());
    }

    engine.push(createFilterMiddleware());
    engine.push(createSubscriptionMiddleware());

    if (!config.disableCaching) {
      engine.push(createInflightCacheMiddleware());
    }

    engine.push(createEthAccountsMiddleware());
    engine.push(createSignatureMiddleware());
    engine.push(createFetchRestMiddleware());
    engine.push(createFetchRpcMiddleware());
  }

  async requestWithExtra<T extends EthMethod>(request: EthRequest<T>, extra?: Extra): EthResult<T>;
  async requestWithExtra(request: EthRequest, extra?: Extra): EthResult<typeof request.method> {
    const { method, params } = request;
    let chainId: string;

    if (SUB_INTERACTION_METHODS.has(method) || UNSUB_METHODS.has(method)) {
      const id = params?.[0] as string;

      assert(this.activeSubs.has(id), `Subscription/filter not found for id: ${id}`);

      const parts = id.split(':');

      // extract chain and subscription id from compound id
      chainId = parts[0];
      params[0] = parts[1];

      if (UNSUB_METHODS.has(method)) {
        this.activeSubs.delete(id);
      }
    } else {
      chainId = await this.store.getCurrentChainId();
    }

    try {
      let result = await this.requestWithChain(chainId, request, { extra });

      if (SUB_METHODS.has(method)) {
        // Ensure the subscription id is unique across chains
        // by creating unique compound id
        result = `${chainId}:${result as string}`;
        this.activeSubs.add(result);
      }

      return result;
    } catch (err) {
      if (UNAUTHORIZED_ERRORS.some((phrase) => (err as Error).message.includes(phrase))) {
        await this.config.clearAccessToken?.();
      }

      throw err;
    }
  }

  async request<T extends EthMethod>(request: EthRequest<T>): EthResult<T> {
    return this.requestWithExtra(request);
  }

  supportsSubscriptions(): boolean {
    return true;
  }

  isConnected(): boolean {
    return true;
  }

  on<T extends EthEvent>(eventName: T, listener: EthEventListener<T>): void {
    this.events.on(eventName, listener as (...args: any[]) => void);

    // Don't emit `connect` until after the first connect listener has been
    // added, to ensure apps have time to set up their listeners.
    if (eventName === EthEvent.connect && !this.didEmitConnect) {
      this.didEmitConnect = true;
      this.store.getCurrentChainId().then((chainId) => {
        // Wait a tick to allow any other listeners to be added
        setTimeout(() => {
          this.events.emit(EthEvent.connect, { chainId });
        });
      });
    }
  }

  removeListener<T extends EthEvent>(eventName: T, listener: EthEventListener<T>): void {
    this.events.removeListener(eventName, listener as (...args: any[]) => void);
  }

  destroy(): void {
    this.destructors.forEach((destroy) => destroy());
    this.config.store.destroy?.();
  }

  private async requestWithChain<T extends EthMethod>(
    chainId: string,
    { method, params }: EthRequest<T>,
    opts?: { skipCache?: boolean; extra?: Extra },
  ): EthResult<T> {
    const chain = expect(await this.store.findChain(chainId), 'expected a chain');

    const context: RequestContext<Extra> = {
      chain,
      config: this.config,
      store: this.store,
      emit: this.events.emit.bind(this.events),
      extra: opts?.extra,
      request: (req, opts) => this.requestWithChain(chainId, req, opts),
      addDestructor: (destroy) => this.destructors.push(destroy),
    };

    const req = {
      id: this.requestId++,
      jsonrpc: '2.0' as JsonRpcVersion,
      method,
      params: params as unknown[],
      context,

      // Used by block-cache middleware
      skipCache: !!opts?.skipCache,
    };

    const res = await this.engine.handle(req);

    if ((res as JsonRpcFailure).error !== undefined) {
      throw (res as JsonRpcFailure).error;
    } else {
      // TODO: Fix this type cast
      return (res as JsonRpcSuccess<unknown>).result as EthResult<T>;
    }
  }
}

export const createBitskiProvider = <Extra = unknown>(
  config: BitskiProviderConfig<Extra>,
): BitskiProvider<Extra> => {
  return new BitskiProvider(config);
};
