import SafeEventEmitter from '@metamask/safe-event-emitter';
import type { JSONRPCRequest, JSONRPCResponse, Subprovider } from '@bitski/provider-engine';
import type { BufferBlock } from '@bitski/provider-engine/dist/modules/util/block-tracker';
import type { BitskiSDK, ProviderOptions } from './-private/sdk';
import { ProviderError } from 'bitski-provider/lib/errors/provider-error';
import {
  type Network,
  BinanceSmartChain,
  BinanceSmartChainTestnet,
  Mainnet,
  Goerli,
  Polygon,
  Mumbai,
} from 'bitski-provider/lib/network';
import { BitskiBrowserEngine } from './-private/providers/bitski-browser-engine';
import { createResponse } from './-private/utils/jsonrpc';
import { toHex } from './-private/utils/numbers';

interface RequestArguments {
  method: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  params?: unknown[] | object;
}

interface BitskiWeb3Provider {
  currentBlock?: BufferBlock;
  supportsSubscriptions(): boolean;
  subscribe(
    subscribeMethod: string | undefined,
    subscriptionMethod: string,
    parameters: any[],
  ): Promise<string>;
  unsubscribe(subscriptionId: string, unsubscribeMethod?: string): Promise<boolean>;
  isRunning(): boolean;
  start(): void;
  stop(): void;
  addProvider(source: Subprovider, index?: number): void;
  removeProvider(source: Subprovider): void;
}

type JSONRPCResponseHandler = (error: null | Error, response?: JSONRPCResponse) => void;

export interface LegacySendProvider {
  send(payload: JSONRPCRequest, callback: JSONRPCResponseHandler): void;
  send(method: string, params: unknown[]): Promise<JSONRPCResponse>;
}

export interface LegacySendAsyncProvider {
  sendAsync(payload: JSONRPCRequest, callback: JSONRPCResponseHandler): void;
}

export interface EIP1193Provider {
  request(request: RequestArguments, requestOptions?: unknown): Promise<unknown>;
}

interface AddEthereumChainParameter {
  chainId: string;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
}

interface SwitchEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
}

class DefaultNetworkStore implements NetworkStore {
  #networks = new Map([
    ['0x1', Mainnet],
    ['0x5', Goerli],
    ['0x89', Polygon],
    ['0x13881', Mumbai],
    ['0x38', BinanceSmartChain],
    ['0x61', BinanceSmartChainTestnet],
  ]);

  async get(chainId: string) {
    return this.#networks.get(chainId);
  }

  async add(chainDetails: AddEthereumChainParameter): Promise<void> {
    const chainId = parseInt(chainDetails.chainId, 16);
    const rpcUrl = chainDetails.rpcUrls[0];

    this.#networks.set(chainDetails.chainId, {
      chainId,
      rpcUrl,
    });
  }
}

export interface NetworkProviderStore {
  get(key: Network): BitskiBrowserEngine | undefined;
  set(key: Network, engine: BitskiBrowserEngine): void;
  forEach(fn: (provider: BitskiBrowserEngine) => void): void;
}

export interface NetworkStore {
  get(key: string): Promise<Network | undefined>;
  add(network: AddEthereumChainParameter): Promise<void>;
}

export class BitskiProvider
  extends SafeEventEmitter
  implements BitskiWeb3Provider, LegacySendAsyncProvider, LegacySendProvider, EIP1193Provider
{
  private sdkPromise: Promise<Pick<BitskiSDK, 'createProvider'> | null>;
  private currentProviderPromise: Promise<BitskiBrowserEngine>;

  private providerOptions: ProviderOptions;
  private currentProvider: BitskiBrowserEngine | undefined;
  private currentChainId: string | undefined;
  private subproviders: [Subprovider, number | undefined][] = [];

  private networkStore: NetworkStore;
  private networkProviderStore: NetworkProviderStore;

  private subscriptionMap = new Map<string, BitskiBrowserEngine>();

  constructor(
    sdkPromise: Promise<Pick<BitskiSDK, 'createProvider'> | null>,
    network: Network,
    options: ProviderOptions = {},

    // Network and network provider store allows multiple instances of
    // BitskiProvider to share state. This is used by the extension so we only
    // have one provider per-chain, but can have different selected providers
    // per page.
    networkStore?: NetworkStore,
    networkProviderStore: NetworkProviderStore = new Map(),
  ) {
    super();
    this.sdkPromise = sdkPromise;
    this.providerOptions = options;
    this.networkStore = networkStore ?? new DefaultNetworkStore();
    this.networkProviderStore = networkProviderStore;

    this.currentProviderPromise = this.setupChain(network);
  }

  get currentBlock(): BufferBlock | undefined {
    return this.currentProvider?.currentBlock;
  }

  supportsSubscriptions(): boolean {
    return !this.providerOptions.disableBlockTracking;
  }

  async subscribe(
    subscribeMethod: string | undefined,
    subscriptionMethod: string,
    parameters: any[],
  ): Promise<string> {
    const provider = await this.currentProviderPromise;
    const subscriptionId = await provider.subscribe(
      subscribeMethod,
      subscriptionMethod,
      parameters,
    );

    this.subscriptionMap.set(subscriptionId, provider);

    return subscriptionId;
  }

  async unsubscribe(subscriptionId: string, unsubscribeMethod?: string): Promise<boolean> {
    const provider = this.subscriptionMap.get(subscriptionId);
    const result = await (provider?.unsubscribe(subscriptionId, unsubscribeMethod) ?? false);

    if (result) {
      this.subscriptionMap.delete(subscriptionId);
    }

    return result;
  }

  isRunning(): boolean {
    return this.currentProvider?.isRunning() ?? false;
  }

  start(): void {
    // Wait for the provider promise so we're loaded and bootstrapped
    this.currentProviderPromise.then(() => {
      this.networkProviderStore.forEach((p) => p.start());
    });
  }

  stop(): void {
    this.currentProviderPromise.then(() => {
      this.networkProviderStore.forEach((p) => p.stop());
    });
  }

  addProvider(source: Subprovider, index?: number): void {
    this.currentProviderPromise.then(() => {
      this.networkProviderStore.forEach((p) => p.addProvider(source, index));
    });

    // Save the subprovider to add to new chains if we ever switch chains
    this.subproviders.push([source, index]);
  }

  removeProvider(source: Subprovider): void {
    this.currentProviderPromise.then(() => {
      this.networkProviderStore.forEach((p) => p.removeProvider(source));
    });

    // Remove from saved subproviders
    const index = this.subproviders.findIndex((s) => s[0] === source);
    this.subproviders.splice(index, 1);
  }

  async request({ method, params = [] }: RequestArguments): Promise<unknown> {
    if (method === 'wallet_addEthereumChain') {
      return this.addChain(params[0]);
    } else if (method === 'wallet_switchEthereumChain') {
      return this.switchChain(params[0]);
    } else if (method === 'eth_chainId') {
      await this.currentProviderPromise;
      return this.currentChainId;
    } else {
      const provider = await this.currentProviderPromise;
      return provider.send(method, params as any);
    }
  }

  public send(method: string, params: unknown[]): Promise<JSONRPCResponse>;
  public send(payload: JSONRPCRequest, callback: JSONRPCResponseHandler): void;
  public send(
    methodOrPayload: string | JSONRPCRequest,
    paramsOrCallback: unknown[] | JSONRPCResponseHandler,
  ): void | Promise<JSONRPCResponse> {
    if (typeof methodOrPayload !== 'string' && !Array.isArray(paramsOrCallback)) {
      return this.sendAsync(methodOrPayload, paramsOrCallback);
    }

    return this.request({ method: methodOrPayload as string, params: paramsOrCallback })
      .then((result) => {
        return createResponse(undefined, result);
      })
      .catch((err) => {
        return createResponse(err);
      });
  }

  /**
   * @deprecated Please use `.request` instead.
   * @param payload - Request Payload
   */
  public sendAsync(payload: JSONRPCRequest, callback: JSONRPCResponseHandler): void {
    this.request(payload)
      .then((response) => {
        callback(null, createResponse(undefined, response));
      })
      .catch((err: Error) => {
        callback(err);
      });
  }

  private async addChain(chainDetails: AddEthereumChainParameter) {
    if (await this.networkStore.get(chainDetails.chainId)) {
      throw new Error('Chain already exists');
    }

    if (!(chainDetails.rpcUrls?.length > 0)) {
      throw new Error('RPC url is required when adding a chain');
    }

    await this.networkStore.add(chainDetails);

    return null;
  }

  private async switchChain(chainDetails: SwitchEthereumChainParameter) {
    const network = await this.networkStore.get(chainDetails.chainId);

    if (!network) {
      throw new ProviderError('Chain does not exist', 4902);
    }

    this.currentProviderPromise = this.setupChain(network);
    this.emit('chainChanged');

    return null;
  }

  private async setupChain(network: Network) {
    let provider = this.networkProviderStore.get(network);

    if (!provider) {
      const sdk = await this.sdkPromise;

      if (!sdk) {
        throw new Error('Bitski SDK not available');
      }

      provider = sdk.createProvider(network, this.providerOptions);

      // Add all previously added providers to the new chain
      for (const [subprovider, index] of this.subproviders) {
        provider.addProvider(subprovider, index);
      }

      // Override provider emit so it emits directly to the wrapper/loader
      provider.emit = this.emit.bind(this);

      this.networkProviderStore.set(network, provider);

      provider.start();
    }

    // Set current provider so we can access it for non-async values
    this.currentProvider = provider;
    this.currentChainId = toHex(network.chainId);
    return provider;
  }
}
