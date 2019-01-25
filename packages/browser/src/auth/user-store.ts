import { User } from './user';

const USER_KEY = 'bitski.user';

export class UserStore {

  public get currentUser(): User | undefined {
    return this.user || this.fetchUser();
  }

  protected get storageKey(): string {
    return `${USER_KEY}.${this.clientId}`;
  }

  protected clientId: string;
  protected user?: User;

  constructor(clientId: string) {
    this.clientId = clientId;
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
    const userData = localStorage.getItem(this.storageKey);
    if (userData) {
      return User.fromString(userData);
    }
  }

  protected cacheUser(user: User | undefined) {
    if (user) {
      localStorage.setItem(this.storageKey, user.toStorageString());
    } else {
      localStorage.removeItem(this.storageKey);
    }
  }

}
