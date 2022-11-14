// Default implementation of generic store interface.

import { EthChainDefinition } from 'eth-provider-types';
import { DEFAULT_CHAINS, SUPPORTED_CHAIN_IDS } from './constants';
import { BitskiProviderStore, EthChainDefinitionWithRpcUrl } from './types';
import { array, object, optional, string, number, nonEmptyArray } from 'decoders';

export const CHAINS_STORAGE_KEY = 'bitski-chains';
export const CURRENT_CHAIN_STORAGE_KEY = 'bitski-current-chain';

// A decoder for EthChainDefinitionWithRpcUrl
const chainDefinitionDecoder = object({
  chainId: string,
  rpcUrls: nonEmptyArray(string),

  chainName: optional(string),
  nativeCurrency: optional(
    object({
      name: string,
      symbol: string, // 2-6 characters long
      decimals: number,
    }),
  ),
  blockExplorerUrls: optional(array(string)),
  iconUrls: optional(array(string)), // Currently ignored.
});

// Uses localStorage or sessionStorage (pass which one you want in constructor).
export class LocalStorageStore implements BitskiProviderStore {
  protected storage: Storage;

  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  keys(): string[] {
    return Object.keys(this.storage);
  }

  async clear(): Promise<void> {
    this.storage.clear();
  }

  async getItem<T>(key: string): Promise<T | undefined> {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : undefined;
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    this.storage.setItem(key, JSON.stringify(value));
  }

  async clearItem(key: string): Promise<void> {
    this.storage.removeItem(key);
  }
}

function ensureRpcUrl(
  definition: EthChainDefinition,
): asserts definition is EthChainDefinitionWithRpcUrl {
  if (!definition.rpcUrls || definition.rpcUrls.length === 0) {
    const chainId = definition.chainId;

    if (!SUPPORTED_CHAIN_IDS.includes(chainId)) {
      throw new Error(
        `no RPC url found for chainId ${chainId}, and it is not a chain supported directly by Bitski`,
      );
    }

    definition.rpcUrls = [`https://api.bitski.com/v1/web3/chains/${parseInt(chainId, 16)}`];
  }
}

export class BitskiProviderStateStore {
  private chains!: Promise<EthChainDefinitionWithRpcUrl[]>;
  private currentChainId!: Promise<string>;

  constructor(protected readonly store: BitskiProviderStore) {
    this.load();
    this.store.onUpdate?.(async () => this.load());
  }

  async findChain(chainId: string): Promise<EthChainDefinitionWithRpcUrl | undefined> {
    const chains = await this.chains;
    return chains.find((chain) => chain.chainId === chainId);
  }

  async addChain(definition: EthChainDefinition): Promise<void> {
    if (await this.findChain(definition.chainId)) {
      // Chain already exists, return success
      return;
    }

    ensureRpcUrl(definition);

    const chains = await this.chains;
    chains.push(definition);

    this.store.setItem(CHAINS_STORAGE_KEY, chains);
  }

  async getCurrentChainId(): Promise<string> {
    return this.currentChainId;
  }

  async setCurrentChainId(chainId: string): Promise<void> {
    this.currentChainId = Promise.resolve(chainId);
    this.store.setItem(CURRENT_CHAIN_STORAGE_KEY, chainId);
  }

  private load(): void {
    this.chains = this.store.getItem(CHAINS_STORAGE_KEY).then((chains) => {
      const result = array(chainDefinitionDecoder).decode(chains);
      return result.value ?? DEFAULT_CHAINS.slice();
    });

    this.currentChainId = this.store.getItem(CURRENT_CHAIN_STORAGE_KEY).then((chainId) => {
      const result = string.decode(chainId);
      return result.value ?? '0x1';
    });
  }
}
