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
  }

  public getItem(key: string): any {
    return this.storage.getItem(key);
  }

  public setItem(key: string, value: any) {
    this.storage.setItem(key, value);
  }

  public clearItem(key: string) {
    this.storage.removeItem(key);
  }

}
