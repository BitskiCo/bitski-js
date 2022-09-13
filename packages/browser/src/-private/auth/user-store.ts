import { USER_KEY } from '../constants';
import { LocalStorageStore } from '../utils/localstorage-store';
import { Store } from '../utils/store';
import { User } from './user';

export class UserStore {
  public async getCurrentUser(): Promise<User | undefined> {
    const user = await this.user;

    return user ?? this.fetchUser();
  }

  protected get storageKey(): string {
    return `${USER_KEY}.${this.clientId}`;
  }

  protected store: Store;
  protected clientId: string;
  protected user: Promise<User | undefined>;

  constructor(clientId: string, store?: Store) {
    this.clientId = clientId;
    this.store = store || new LocalStorageStore();
    this.user = this.fetchUser();
  }

  public async set(user: User | undefined): Promise<void> {
    this.user = Promise.resolve(user);
    await this.cacheUser(user);
  }

  public async clear(): Promise<void> {
    this.user = Promise.resolve(undefined);
    await this.cacheUser(undefined);
  }

  protected async fetchUser(): Promise<User | undefined> {
    const userData = await this.store.getItem(this.storageKey);
    if (userData) {
      return User.fromString(userData);
    }
  }

  protected async cacheUser(user: User | undefined): Promise<void> {
    if (user) {
      await this.store.setItem(this.storageKey, user.toStorageString());
    } else {
      await this.store.clearItem(this.storageKey);
    }
  }
}
