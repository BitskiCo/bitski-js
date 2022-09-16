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

export interface LegacySendProvider {
  send(
    payload: JSONRPCRequest,
    // Used "null" value to match the legacy version
    // eslint-disable-next-line @typescript-eslint/ban-types
    callback: (err?: Error | null, response?: JSONRPCResponse) => void,
  ): void;
}

export interface LegacySendAsyncProvider {
  sendAsync(payload: JSONRPCRequest): Promise<JSONRPCResponse>;
}

export interface LegacyRequestProvider {
  request(
    payload: JSONRPCRequest,
    callback: (err: Error | undefined, response: JSONRPCResponse) => void,
  ): void;
}

export interface EIP1193Provider {
  request(request: RequestArguments, requestOptions?: unknown): Promise<JSONRPCResponse>;
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
  rpcUrls?: string[];
}

interface SwitchEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
}

const DEFAULT_NETWORK_STORE = new Map([
  ['0x1', Mainnet],
  ['0x5', Goerli],
  ['0x89', Polygon],
  ['0x13881', Mumbai],
  ['0x38', BinanceSmartChain],
  ['0x61', BinanceSmartChainTestnet],
]);

export interface NetworkProviderStore {
  get(key: Network): BitskiBrowserEngine | undefined;
  set(key: Network, engine: BitskiBrowserEngine): void;
  forEach(fn: (provider: BitskiBrowserEngine) => void): void;
}

export interface NetworkStore {
  get(key: string): Promise<Network | undefined>;
  set(key: string, network: Network): void;
}

export class BitskiProvider
  extends SafeEventEmitter
  implements
    BitskiWeb3Provider,
    LegacyRequestProvider,
    LegacySendAsyncProvider,
    LegacySendProvider,
    EIP1193Provider
{
  private sdkPromise: Promise<Pick<BitskiSDK, 'createProvider'> | null>;
  private currentProviderPromise: Promise<BitskiBrowserEngine>;

  private providerOptions: ProviderOptions;
  private currentProvider: BitskiBrowserEngine | undefined;
  private currentChainId: string | undefined;
  private subproviders: [Subprovider, number | undefined][] = [];

  private networkStore: NetworkStore | Map<string, Network>;
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
    this.networkStore = networkStore ?? DEFAULT_NETWORK_STORE;
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

  async request({ method, params = [] }: RequestArguments): Promise<JSONRPCResponse> {
    if (method === 'wallet_addEthereumChain') {
      return this.addChain(params[0]);
    } else if (method === 'wallet_switchEthereumChain') {
      return this.switchChain(params[0]);
    } else if (method === 'eth_chainId') {
      await this.currentProviderPromise;
      return createResponse(undefined, this.currentChainId);
    } else {
      try {
        const provider = await this.currentProviderPromise;
        const result = await provider.send(method, params as any);

        return createResponse(undefined, result);
      } catch (error) {
        return createResponse(error);
      }
    }
  }

  public send(
    payload: JSONRPCRequest,
    callback: (err?: Error | null, response?: any) => void,
  ): void {
    this.request(payload)
      .then((response) => {
        callback(undefined, response);
      })
      .catch((err: Error) => {
        callback(err);
      });
  }

  /**
   * @deprecated Please use `.request` instead.
   * @param payload - Request Payload
   */
  public async sendAsync(payload: JSONRPCRequest): Promise<JSONRPCResponse> {
    return this.request(payload);
  }

  private async addChain(chainDetails: AddEthereumChainParameter) {
    if (await this.networkStore.get(chainDetails.chainId)) {
      return createResponse(Error('Chain already exists'));
    }

    const chainId = parseInt(chainDetails.chainId, 16);
    const rpcUrl = chainDetails.rpcUrls?.[0];

    if (!rpcUrl) {
      return createResponse(Error('RPC url is required when adding a chain'));
    }

    await this.networkStore.set(chainDetails.chainId, {
      chainId,
      rpcUrl,
    });

    return createResponse(undefined, null);
  }

  private async switchChain(chainDetails: SwitchEthereumChainParameter) {
    const network = await this.networkStore.get(chainDetails.chainId);

    if (!network) {
      return createResponse(new ProviderError('Chain does not exist', 4902));
    }

    this.currentProviderPromise = this.setupChain(network);
    this.emit('chainChanged');

    return createResponse(undefined, null);
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
