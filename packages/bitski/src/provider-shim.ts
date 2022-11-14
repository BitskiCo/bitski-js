import type { BitskiSDK, ProviderOptions } from './-private/sdk';
import { BitskiProvider } from 'bitski-provider';
import { EthEvent, EthMethod } from 'eth-provider-types';
import { Network } from './-private/network';
import { toHex } from './-private/utils/numbers';

interface RequestArguments {
  method: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  params?: unknown[] | object;
}

interface BitskiWeb3Provider {
  currentBlock: undefined;
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
  addProvider(source: unknown, index?: number): void;
  removeProvider(source: unknown): void;
}

export interface JSONRPCRequest {
  id?: number;
  jsonrpc?: string;
  method: string;
  params: any[];
  skipCache?: boolean;
  origin?: any;
}

export interface JSONRPCResponse {
  id: number;
  jsonrpc: string;
  error?: any;
  result?: any;
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

// gotta keep it within MAX_SAFE_INTEGER
const extraDigits = 3;
function createRandomId() {
  // 13 time digits
  const datePart = new Date().getTime() * Math.pow(10, extraDigits);
  // 3 random digits
  const extraPart = Math.floor(Math.random() * Math.pow(10, extraDigits));
  // 16 digits
  return datePart + extraPart;
}

export function createResponse(error: unknown, result?: unknown): JSONRPCResponse {
  return {
    id: createRandomId(),
    jsonrpc: '2.0',
    error,
    result,
  };
}

export class BitskiProviderShim
  implements BitskiWeb3Provider, LegacySendAsyncProvider, LegacySendProvider, EIP1193Provider
{
  private providerPromise: Promise<BitskiProvider> | undefined;

  constructor(
    private loadSdk: () => Promise<Pick<BitskiSDK, 'createProvider'> | null>,
    private options: ProviderOptions = {},
  ) {}

  private loadProvider(): Promise<BitskiProvider> {
    if (!this.providerPromise) {
      this.providerPromise = this.loadSdk().then((sdk) => {
        if (!sdk) {
          throw new Error('Bitski SDK not found');
        }
        return sdk.createProvider(this.options);
      });
    }

    return this.providerPromise;
  }

  // TODO: Update types in v4 to use eth-provider-types
  async request({ method, params = [] }: RequestArguments): Promise<unknown> {
    const provider = await this.loadProvider();
    return provider.request({ method: method as EthMethod, params: params as any });
  }

  on(eventName: string, listener: (...args: unknown[]) => void): void {
    this.loadProvider().then((provider) => provider.on(eventName as EthEvent, listener));
  }

  removeListener(eventName: string, listener: (...args: unknown[]) => void): void {
    this.loadProvider().then((provider) =>
      provider.removeListener(eventName as EthEvent, listener),
    );
  }

  /**
   * @deprecated Please use `.request` instead.
   */
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
   */
  sendAsync(payload: JSONRPCRequest, callback: JSONRPCResponseHandler): void {
    this.request(payload)
      .then((response) => {
        callback(null, createResponse(undefined, response));
      })
      .catch((err: Error) => {
        callback(err);
      });
  }

  // method used externally to set provider
  private setNetwork(network: Network): void {
    this.providerPromise = this.loadProvider().then(async (provider) => {
      await provider.request({
        method: EthMethod.wallet_addEthereumChain,
        params: [
          {
            chainId: toHex(network.chainId),
            rpcUrls: [network.rpcUrl],
          },
        ],
      });

      await provider.request({
        method: EthMethod.wallet_switchEthereumChain,
        params: [{ chainId: toHex(network.chainId) }],
      });

      return provider;
    });
  }

  supportsSubscriptions(): boolean {
    return true;
  }

  isConnected(): boolean {
    return true;
  }

  /**
   * @deprecated currentBlock is no longer exposed directly, use subscriptions or filters instead
   */
  get currentBlock(): undefined {
    return undefined;
  }

  /**
   * @deprecated call request with eth_subscribe directly instead
   */
  subscribe(
    _subscribeMethod: string | undefined,
    subscriptionMethod: string,
    params: any,
  ): Promise<string> {
    console.warn(
      'BitskiProvider#subscribe() is deprecated. It is no longer necessary to call this method.',
    );
    return Promise.resolve('');
  }

  /**
   * @deprecated call request with eth_ussubscribe directly instead
   */
  unsubscribe(subscriptionId: string, _unsubscribeMethod: string | undefined): Promise<boolean> {
    console.warn(
      'BitskiProvider#unsubscribe() is deprecated. It is no longer necessary to call this method.',
    );
    return Promise.resolve(true);
  }

  /**
   * @deprecated BitskiSDK is always running
   */
  isRunning(): boolean {
    console.warn(
      'BitskiProvider#isRunning() is deprecated. It is no longer necessary to call this method.',
    );
    return true;
  }

  /**
   * @deprecated BitskiSDK does not need to be started anymore
   */
  start(): void {
    console.warn(
      'BitskiProvider#start() is deprecated. It is no longer necessary to call this method.',
    );
  }

  /**
   * @deprecated BitskiSDK does not need to be stopped anymore. Unsubscribe from all active
   * subscriptions instead.
   */
  stop(): void {
    console.warn(
      'BitskiProvider#stop() is deprecated. It is no longer necessary to call this method.',
    );
  }

  /**
   * @deprecated BitskiSDK does not support custom providers anymore
   */
  addProvider(_source: unknown, _index?: number): void {
    console.warn(
      'BitskiProvider#addProvider() is deprecated. It is no longer necessary to call this method.',
    );
  }

  /**
   * @deprecated BitskiSDK does not support custom providers anymore
   */
  removeProvider(source: unknown): void {
    console.warn(
      'BitskiProvider#removeProvider() is deprecated. It is no longer necessary to call this method.',
    );
  }
}
