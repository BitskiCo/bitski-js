import { Store } from './store';

// Default implementation of generic store interface.
// Uses localStorage or sessionStorage (pass which one you want in constructor).
export class LocalStorageStore implements Store {
  protected storage: Storage;

  constructor(storage: Storage = localStorage) {
    this.storage = storage;
  }

  public clear() {
    this.storage.clear();
    return Promise.resolve();
  }

  public getItem(key: string): Promise<string | undefined> {
    return Promise.resolve(this.storage.getItem(key) ?? undefined);
  }

  public setItem(key: string, value: string) {
    this.storage.setItem(key, value);
    return Promise.resolve();
  }

  public clearItem(key: string) {
    this.storage.removeItem(key);
    return Promise.resolve();
  }
}
