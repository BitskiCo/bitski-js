import { TokenResponse } from '@openid/appauth';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants';
import { LocalStorageStore } from '../utils/localstorage-store';
import { Store } from '../utils/store';
import { AccessToken } from './access-token';

export class TokenStore {

  public get currentToken(): string | undefined {
    if (this.accessToken && !this.accessToken.expired) {
      return this.accessToken.token;
    }
  }

  public get refreshToken(): string | undefined {
    const token = this.store.getItem(this.refreshTokenKey);
    if (token) {
      return token;
    }
  }

  protected get accessTokenKey(): string {
    return `${ACCESS_TOKEN_KEY}.${this.clientId}`;
  }

  protected get refreshTokenKey(): string {
    return `${REFRESH_TOKEN_KEY}.${this.clientId}`;
  }
  protected store: Store;
  protected accessToken?: AccessToken;
  protected clientId: string;

  constructor(clientId: string, store?: Store) {
    this.clientId = clientId;
    this.store = store || new LocalStorageStore();
    const accessTokenString = this.store.getItem(this.accessTokenKey);
    if (accessTokenString) {
      let parsedToken: AccessToken | undefined;
      try {
        parsedToken = AccessToken.fromString(accessTokenString);
      } finally {
        this.accessToken = parsedToken;
      }
    }
  }

  public persistTokenResponse(response: TokenResponse) {
    if (response.refreshToken) {
      this.store.setItem(this.refreshTokenKey, response.refreshToken);
    }
    const parsedToken = AccessToken.fromTokenResponse(response);
    this.store.setItem(this.accessTokenKey, parsedToken.toStorageString());
    this.accessToken = parsedToken;
  }

  public invalidateCurrentToken() {
    this.accessToken = undefined;
    this.store.clearItem(this.accessTokenKey);
  }

  public clear() {
    this.accessToken = undefined;
    this.store.clearItem(this.refreshTokenKey);
    this.store.clearItem(this.accessTokenKey);
  }

}
