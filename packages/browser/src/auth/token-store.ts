import { TokenResponse } from '@openid/appauth';
import { ACCESS_TOKEN_KEY, ID_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants';
import { LocalStorageStore } from '../utils/localstorage-store';
import { Store } from '../utils/store';
import { AccessToken } from './access-token';

export class TokenStore {
  public async getCurrentToken(): Promise<string | undefined> {
    const accessToken = await this.accessToken;
    if (accessToken && !accessToken.expired) {
      return accessToken.token;
    }
  }

  public async getCurrentIdToken(): Promise<string | undefined> {
    const idToken = await this.idToken;
    const accessToken = await this.accessToken;

    if (idToken && accessToken && !accessToken.expired) {
      return idToken;
    }
  }

  public getRefreshToken(): Promise<string | undefined> {
    return this.refreshToken;
  }

  protected get idTokenKey(): string {
    return `${ID_TOKEN_KEY}.${this.clientId}`;
  }

  protected get accessTokenKey(): string {
    return `${ACCESS_TOKEN_KEY}.${this.clientId}`;
  }

  protected get refreshTokenKey(): string {
    return `${REFRESH_TOKEN_KEY}.${this.clientId}`;
  }
  protected store: Store;
  protected accessToken: Promise<AccessToken | undefined>;
  protected refreshToken: Promise<string | undefined>;
  protected idToken: Promise<string | undefined>;
  protected clientId: string;

  constructor(clientId: string, store?: Store) {
    this.clientId = clientId;
    this.store = store || new LocalStorageStore();
    this.accessToken = Promise.resolve(this.store.getItem(this.accessTokenKey)).then(
      (accessTokenString) => {
        if (accessTokenString) {
          return AccessToken.fromString(accessTokenString);
        }
      },
    );

    this.idToken = this.store.getItem(this.idTokenKey);
    this.refreshToken = this.store.getItem(this.refreshTokenKey);
  }

  public persistTokenResponse(response: TokenResponse): void {
    if (response.refreshToken) {
      this.store.setItem(this.refreshTokenKey, response.refreshToken);
    }
    const parsedToken = AccessToken.fromTokenResponse(response);
    this.store.setItem(this.accessTokenKey, parsedToken.toStorageString());
    this.store.setItem(this.idTokenKey, response.idToken);
    this.accessToken = Promise.resolve(parsedToken);
    this.idToken = Promise.resolve(response.idToken);
  }

  public async invalidateCurrentToken(): Promise<void> {
    this.accessToken = Promise.resolve(undefined);
    this.idToken = Promise.resolve(undefined);

    await Promise.all([
      this.store.clearItem(this.accessTokenKey),
      this.store.clearItem(this.idTokenKey),
    ]);
  }

  public async clear(): Promise<void> {
    this.accessToken = Promise.resolve(undefined);
    this.idToken = Promise.resolve(undefined);
    this.refreshToken = Promise.resolve(undefined);

    await Promise.all([
      this.store.clearItem(this.refreshTokenKey),
      this.store.clearItem(this.accessTokenKey),
      this.store.clearItem(this.idTokenKey),
    ]);
  }
}
