import {
  EthChainDefinition,
  EthEvent,
  EthEventParams,
  EthMethod,
  EthMethodParams,
  EthRequest,
  EthResult,
} from 'eth-provider-types';
import { JsonRpcMiddleware } from 'json-rpc-engine';

export interface User {
  id: string;
  accounts?: string[];
}

export interface EthChainDefinitionWithRpcUrl extends EthChainDefinition {
  rpcUrls: [firstUrl: string, ...restUrls: string[]];
}

// A generic interface for caching values. Allows for more
// flexibility in storing access tokens and other persistent data.
export interface BitskiProviderStore {
  // Empty the cache
  clear(): Promise<void>;

  keys(): string[];

  // Get an item from the cache
  getItem(key: string): Promise<unknown | undefined>;

  // Set an item in the cache
  setItem(key: string, value: unknown): Promise<void>;

  // Remove the key from the cache
  clearItem(key: string): Promise<void>;

  onUpdate?(fn: () => void);
}

export interface InternalBitskiProviderConfig {
  fetch: typeof fetch;
  additionalHeaders: Record<string, string>;

  prependMiddleware?: JsonRpcMiddleware<unknown[], unknown>[];
  pollingInterval?: number;
  disableCaching?: boolean;
  disableValidation?: boolean;

  clientId: string;
  apiBaseUrl: string;
  signerBaseUrl: string;
  transactionCallbackUrl?: string;

  store: BitskiProviderStore;
  sign: SignFn;
  getUser?(): Promise<User | undefined>;
  getAccessToken?(): Promise<string>;
  clearAccessToken?(): Promise<void>;
}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type BitskiProviderConfig = Optional<
  InternalBitskiProviderConfig,
  'apiBaseUrl' | 'signerBaseUrl' | 'fetch' | 'additionalHeaders' | 'sign' | 'getUser' | 'store'
>;

/**
 * Each provider request is made with a context object. The context object contains
 * information such as the current chain the request should be made on and the
 * configuration of the provider. This allows us to "switch" chains just by using
 * a different context.
 */
export interface RequestContext {
  // The current chain the request is being made on
  chain: EthChainDefinitionWithRpcUrl;

  // The configuration of the provider
  config: InternalBitskiProviderConfig;

  // Additional parameters added to the context of a sign request, e.g. the origin
  // that is attempting to sign
  signContext?: Record<string, string>;

  // Allows middleware to emit an event on the provider
  emit: <T extends EthEvent>(eventName: T, ...params: EthEventParams[T]) => void;

  // Allows middleware to make a request using the provider
  request<T extends EthMethod>(
    { method, params }: EthRequest<T>,
    opts?: { skipCache?: boolean },
  ): EthResult<T>;

  // Adds a destructor that should run when the provider is destroyed
  addDestructor(fn: () => void): void;
}

export interface EthSignMethodParams extends EthMethodParams {
  personal_sign: [data: string, address: string];
}

export type EthSignMethod =
  | EthMethod.eth_sendTransaction
  | EthMethod.eth_signTransaction
  | EthMethod.eth_sign
  | EthMethod.eth_signTypedData
  | EthMethod.eth_signTypedData_v1
  | EthMethod.eth_signTypedData_v3 // For metamask compatibility
  | EthMethod.eth_signTypedData_v4
  | 'personal_sign'; // legacy compat

export type SignFn = <T extends EthSignMethod>(
  method: T,
  params: EthSignMethodParams[T],
  context: RequestContext,
) => Promise<string>;
