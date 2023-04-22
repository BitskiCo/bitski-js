import { TokenResponse } from '@openid/appauth';
import { BitskiProviderStore } from 'bitski-provider';
import { ACCESS_TOKEN_KEY, ID_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants';
import { AccessToken } from './access-token';
import { string } from 'decoders';

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
  protected store: BitskiProviderStore;
  protected accessToken!: Promise<AccessToken | undefined>;
  protected refreshToken!: Promise<string | undefined>;
  protected idToken!: Promise<string | undefined>;
  protected clientId: string;

  constructor(clientId: string, store: BitskiProviderStore) {
    this.clientId = clientId;
    this.store = store;
    this.loadTokensFromCache();
    this.store.onUpdate?.(() => this.loadTokensFromCache());
  }

  public loadTokensFromCache(): void {
    this.accessToken = Promise.resolve(this.store.getItem(this.accessTokenKey))
      .then((accessTokenString) => {
        const accessTokenResult = string.decode(accessTokenString);
        if (accessTokenResult.value) {
          return AccessToken.fromString(accessTokenResult.value);
        }
      })
      .catch(() => {
        console.log('Could not parse accessToken, setting to undefined');
        return undefined;
      });

    this.idToken = Promise.resolve(this.store.getItem(this.idTokenKey))
      .then((token) => string.decode(token).value)
      .catch(() => {
        console.log('Could not parse idToken, setting to undefined');
        return undefined;
      });

    this.refreshToken = Promise.resolve(this.store.getItem(this.refreshTokenKey))
      .then((token) => string.decode(token).value)
      .catch(() => {
        console.log('Could not parse refreshToken, setting to undefined');
        return undefined;
      });
  }

  public persistTokenResponse(response: TokenResponse): void {
    const parsedToken = AccessToken.fromTokenResponse(response);

    this.store.setItem(this.accessTokenKey, parsedToken.toStorageString());
    this.accessToken = Promise.resolve(parsedToken);

    this.store.setItem(this.idTokenKey, response.idToken);
    this.idToken = Promise.resolve(response.idToken);

    if (response.refreshToken) {
      this.store.setItem(this.refreshTokenKey, response.refreshToken);
      this.refreshToken = Promise.resolve(response.refreshToken);
    }
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
