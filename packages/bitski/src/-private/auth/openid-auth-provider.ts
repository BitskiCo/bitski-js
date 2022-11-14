import { AuthorizationServiceConfiguration, TokenResponse } from '@openid/appauth';
import { AuthenticationStatus, OAuthSignInMethod } from '../constants';
import { AuthProvider } from './auth-provider';
import { OAuthManager, SignInOptions } from './oauth-manager';
import { TokenStore } from './token-store';
import { User } from './user';
import { BitskiProviderStore } from 'bitski-provider';

export class OpenidAuthProvider implements AuthProvider {
  public oauthManager: OAuthManager;
  public tokenStore: TokenStore;
  public signOutCallback?: () => void;

  private _refreshTokensPromise: Promise<TokenResponse> | undefined;
  private currentUser: User | undefined;
  private didConnect = false;

  constructor(
    clientId: string,
    redirectUri: string,
    store: BitskiProviderStore,
    additionalScopes?: string[],
    configuration?: AuthorizationServiceConfiguration,
  ) {
    this.oauthManager = new OAuthManager({
      additionalScopes,
      clientId,
      redirectUri,
      configuration,
    });
    this.tokenStore = new TokenStore(clientId, store);
  }

  public async getAuthStatus(): Promise<AuthenticationStatus> {
    if (await this.tokenStore.getCurrentToken()) {
      return AuthenticationStatus.Connected;
    } else if (await this.tokenStore.getRefreshToken()) {
      return AuthenticationStatus.Expired;
    } else {
      return AuthenticationStatus.NotConnected;
    }
  }

  public async getAccessToken(): Promise<string> {
    const currentToken = await this.tokenStore.getCurrentToken();

    if (currentToken) {
      return currentToken;
    }

    if (await this.tokenStore.getRefreshToken()) {
      return this.refreshAccessToken();
    }

    throw new Error('Not signed in');
  }

  public async getIdToken(): Promise<string | undefined> {
    const currentIdToken = await this.tokenStore.getCurrentToken();

    if (currentIdToken) {
      return currentIdToken;
    }
    if (await this.tokenStore.getRefreshToken()) {
      return this.refreshIdToken();
    }
    return Promise.reject(new Error('Not signed in'));
  }

  public async getRefreshToken(): Promise<string> {
    const refreshToken = await this.tokenStore.getRefreshToken();

    if (refreshToken) {
      return refreshToken;
    }
    // Error: the user did not approve this app for offline access
    if (await this.tokenStore.getCurrentToken()) {
      return Promise.reject(new Error('No refresh token available'));
    }
    // Error: the user is not signed in.
    return Promise.reject(new Error('Not signed in'));
  }

  public async invalidateToken(): Promise<void> {
    await this.tokenStore.invalidateCurrentToken();
    if (this.signOutCallback) {
      this.signOutCallback();
    }
  }

  private refreshTokens(): Promise<TokenResponse> {
    if (!this._refreshTokensPromise) {
      this._refreshTokensPromise = this.tokenStore.getRefreshToken().then(async (refreshToken) => {
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        try {
          const tokenResponse = await this.oauthManager.refreshAccessToken(refreshToken);
          this.tokenStore.persistTokenResponse(tokenResponse);
          return tokenResponse;
        } catch (error) {
          this.currentUser = undefined;
          await this.tokenStore.clear();
          throw error;
        } finally {
          this._refreshTokensPromise = undefined;
        }
      });
    }

    return this._refreshTokensPromise;
  }

  public async refreshAccessToken(): Promise<string> {
    const tokenResponse = await this.refreshTokens();
    return tokenResponse.accessToken;
  }

  public async refreshIdToken(): Promise<string | undefined> {
    const tokenResponse = await this.refreshTokens();
    return tokenResponse.idToken;
  }

  public signIn(method: OAuthSignInMethod, opts?: SignInOptions): Promise<User> {
    let promise: Promise<any>;
    switch (method) {
      case OAuthSignInMethod.Redirect:
        promise = this.oauthManager.signInRedirect(opts);
        break;
      case OAuthSignInMethod.Silent:
        return Promise.reject(new Error('Sign in method not supported'));
      default:
        promise = this.oauthManager.signInPopup(opts);
        break;
    }

    return promise.then((tokenResponse) => {
      this.tokenStore.persistTokenResponse(tokenResponse);
      return this.loadUser();
    });
  }

  public connect(): Promise<User> {
    return this.refreshAccessToken().then(() => {
      return this.loadUser();
    });
  }

  public getUser(): Promise<User> {
    return this.getOrFetchUser();
  }

  public getUserFromCache(): User | undefined {
    return this.currentUser;
  }

  public async signInOrConnect(
    signInMethod: OAuthSignInMethod = OAuthSignInMethod.Popup,
    opts?: SignInOptions,
  ): Promise<User> {
    switch (await this.getAuthStatus()) {
      case AuthenticationStatus.Connected:
        return this.loadUser();
      case AuthenticationStatus.Expired:
        return this.connect();
      case AuthenticationStatus.NotConnected:
        return this.signIn(signInMethod, opts);
    }
  }

  public redirectCallback(): Promise<User> {
    return this.oauthManager.redirectCallback().then((tokenResponse) => {
      this.tokenStore.persistTokenResponse(tokenResponse);
      return this.loadUser();
    });
  }

  public async signOut(): Promise<any> {
    await this.tokenStore.clear();
    // Call the sign out callback if one has been provided
    if (this.signOutCallback) {
      this.signOutCallback();
    }
    // We don't currently have the ability to invalidate access tokens, so for now simply resolve.
    // Down the road this may perform a network request to invalidate.
    return Promise.resolve();
  }

  private async getOrFetchUser(): Promise<User> {
    if (this.currentUser) {
      return this.currentUser;
    }
    return this.loadUser();
  }

  private loadUser(): Promise<User> {
    return this.getAccessToken()
      .then((accessToken) => {
        return this.oauthManager.requestUserInfo(accessToken);
      })
      .then((json) => {
        return User.fromJson(json);
      })
      .then((user) => {
        this.currentUser = user;
        return user;
      });
  }

  public loadFromCache(): void {
    this.tokenStore.loadTokensFromCache();
  }
}
