import {
  EthChainDefinition,
  EthEvent,
  EthEventParams,
  EthMethod,
  EthMethodParams,
  EthRequest,
  EthResult,
} from 'eth-provider-types';
import { JsonRpcRequest, PendingJsonRpcResponse } from 'json-rpc-engine';
import type { BitskiProviderStateStore } from './store';
import { PaymasterDefinition, WaasDefinition } from './utils/transaction';

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
  clear(): void | Promise<void>;

  keys?(): string[] | Promise<string[]>;

  // Get an item from the cache
  getItem(key: string): unknown | undefined | Promise<unknown | undefined>;

  // Set an item in the cache
  setItem(key: string, value: unknown): void | Promise<void>;

  // Remove the key from the cache
  clearItem(key: string): void | Promise<void>;

  onUpdate?(fn: () => void);

  destroy?(): void;
}

export interface InternalBitskiProviderConfig<Extra = unknown> {
  fetch: typeof fetch;
  additionalHeaders: Record<string, string>;
  paymaster?: PaymasterDefinition;
  prependMiddleware?: ProviderMiddleware<unknown[], unknown, Extra>[];
  pollingInterval?: number;
  disableCaching?: boolean;
  disableValidation?: boolean;
  additionalSigningContext?: Record<string, string>;

  appId?: string;

  /** @deprecated switch to appId */
  clientId?: string;
  apiBaseUrl: string;
  signerBaseUrl: string;
  transactionCallbackUrl?: string;
  signerQueryParams?: URLSearchParams;

  waas?: WaasDefinition;

  store: BitskiProviderStore;
  sign: SignFn;
  getUser?(): Promise<User | undefined>;
  getAccessToken?(): Promise<string>;
  clearAccessToken?(): Promise<void>;
}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type BitskiProviderConfig<Extra = unknown> = Optional<
  InternalBitskiProviderConfig<Extra>,
  'apiBaseUrl' | 'signerBaseUrl' | 'fetch' | 'additionalHeaders' | 'sign' | 'getUser' | 'store'
> & {
  signerMethod?: 'popup' | 'iframe' | 'redirect';
};

/**
 * Each provider request is made with a context object. The context object contains
 * information such as the current chain the request should be made on and the
 * configuration of the provider. This allows us to "switch" chains just by using
 * a different context.
 */
export interface RequestContext<Extra = unknown> {
  // The current chain the request is being made on
  chain: EthChainDefinitionWithRpcUrl;
  paymaster?: PaymasterDefinition;
  waas?: WaasDefinition;

  // The configuration of the provider
  config: InternalBitskiProviderConfig<Extra>;

  store: BitskiProviderStateStore;

  // Extra information that can be added by a user of the provider
  extra?: Extra;

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

export type ProviderMiddleware<T = unknown[], U = unknown, V = unknown> = (
  req: JsonRpcRequest<T> & { context: RequestContext<V> },
  res: PendingJsonRpcResponse<U>,
  next: () => Promise<void>,
) => Promise<void>;

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
