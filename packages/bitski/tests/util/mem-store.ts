import { BitskiProviderStore } from 'bitski-provider';

export default class MemStore implements BitskiProviderStore {
  private store: { [key: string]: unknown } = {};

  keys(): string[] {
    return Object.keys(this.store);
  }

  async getItem(key: string): Promise<unknown | undefined> {
    return this.store[key];
  }

  async setItem(key: string, value: unknown): Promise<void> {
    this.store[key] = value;
  }

  async clearItem(key: string): Promise<void> {
    delete this.store[key];
  }

  async clear(): Promise<void> {
    this.store = {};
  }
}
