import { TokenResponse } from '@openid/appauth';
import { AccessToken } from './access-token';

const REFRESH_TOKEN_KEY = 'bitski.refresh_token';
const ACCESS_TOKEN_KEY = 'bitski.access_token';

export class TokenStore {

  public get currentToken(): string | undefined {
    if (this.accessToken && !this.accessToken.expired) {
      return this.accessToken.token;
    }
  }

  public get refreshToken(): string | undefined {
    const token = localStorage.getItem(this.refreshTokenKey);
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

  protected accessToken?: AccessToken;
  protected clientId: string;

  constructor(clientId: string) {
    this.clientId = clientId;
    const accessTokenString = localStorage.getItem(this.accessTokenKey);
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
      localStorage.setItem(this.refreshTokenKey, response.refreshToken);
    }
    const parsedToken = AccessToken.fromTokenResponse(response);
    localStorage.setItem(this.accessTokenKey, parsedToken.toStorageString());
    this.accessToken = parsedToken;
  }

  public invalidateCurrentToken() {
    this.accessToken = undefined;
    localStorage.removeItem(this.accessTokenKey);
  }

  public clear() {
    this.accessToken = undefined;
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.accessTokenKey);
  }

}
