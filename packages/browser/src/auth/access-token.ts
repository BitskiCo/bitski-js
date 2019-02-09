import { TokenResponse } from '@openid/appauth';
/**
 * Represents a Bitski access token
 */
export class AccessToken {

  /**
   * Creates a token from a TokenResponse object
   * @param tokenResponse The token response object to build a token from
   */
  public static fromTokenResponse(tokenResponse: TokenResponse) {
    let expiresAt: number | undefined;
    if (tokenResponse.expiresIn) {
      expiresAt = Math.floor(Date.now() / 1000) + tokenResponse.expiresIn;
    }
    return new AccessToken(tokenResponse.accessToken, expiresAt, tokenResponse.scope);
  }

  /**
   * Creates a token from a storage string
   * @param s JSON string representing the token
   */
  public static fromString(s: string): AccessToken | undefined {
    let parsed: any | undefined;
    try {
      parsed = JSON.parse(s);
    } catch (error) {
      return;
    }
    if (!parsed.token) {
      return;
    }
    return new AccessToken(parsed.token, parsed.expiresAt, parsed.scope);
  }

  /**
   * The actual access token
   */
  public token: string;

  /**
   * When the token expires (in seconds)
   */
  public expiresAt?: number;

  /**
   * Scopes this token has access to
   */
  public scope?: string;

  /**
   * Calculates if the token is still active
   */
  public get expired() {
    if (this.expiresAt) {
      const now = Math.floor(Date.now() / 1000);
      const expiresIn = this.expiresAt - now;
      return expiresIn <= 0;
    }
    return false;
  }

  /**
   *
   * @param token the access token
   * @param expiresAt the token expiration date (in seconds) (optional)
   * @param scope the scopes this token represents (optional)
   */
  constructor(token: string, expiresAt?: number, scope?: string) {
    this.token = token;
    this.scope = scope;
    this.expiresAt = expiresAt;
  }

  /**
   * Returns a JSON string suitable for writing in local storage
   */
  public toStorageString(): string {
    return JSON.stringify({
      expiresAt: this.expiresAt,
      scope: this.scope,
      token: this.token,
    });
  }

}
