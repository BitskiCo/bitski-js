import { USER_KEY } from '../constants';
import { LocalStorageStore } from '../utils/localstorage-store';
import { Store } from '../utils/store';
import { User } from './user';

export class UserStore {

  public get currentUser(): User | undefined {
    return this.user || this.fetchUser();
  }

  protected get storageKey(): string {
    return `${USER_KEY}.${this.clientId}`;
  }

  protected store: Store;
  protected clientId: string;
  protected user?: User;

  constructor(clientId: string, store?: Store) {
    this.clientId = clientId;
    this.store = store || new LocalStorageStore();
    this.user = this.fetchUser();
  }

  public set(user: User | undefined) {
    this.user = user;
    this.cacheUser(user);
  }

  public clear() {
    this.user = undefined;
    this.cacheUser(undefined);
  }

  protected fetchUser(): User | undefined {
    const userData = this.store.getItem(this.storageKey);
    if (userData) {
      return User.fromString(userData);
    }
  }

  protected cacheUser(user: User | undefined) {
    if (user) {
      this.store.setItem(this.storageKey, user.toStorageString());
    } else {
      this.store.clearItem(this.storageKey);
    }
  }

}
