import { AuthorizationRequest, TokenRequest } from '@openid/appauth';
import { OAuthManager, SignInOptions } from '../../src/auth/oauth-manager';

export class MockOAuthManager extends OAuthManager {
  public currentAuthRequest?: AuthorizationRequest;
  public currentTokenRequest?: TokenRequest;

  protected createAuthRequest(opts: SignInOptions): AuthorizationRequest {
    const request = super.createAuthRequest(opts);
    this.currentAuthRequest = request;
    return request;
  }

  protected createTokenRequest(code: string): TokenRequest {
    const request = super.createTokenRequest(code);
    this.currentTokenRequest = request;
    return request;
  }

  protected createRefreshTokenRequest(refreshToken: string): TokenRequest {
    const request = super.createRefreshTokenRequest(refreshToken);
    this.currentTokenRequest = request;
    return request;
  }

}
