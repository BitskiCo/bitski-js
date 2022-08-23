import { TokenResponse } from '@openid/appauth';
import { AccessTokenProvider } from 'bitski-provider';
import { AuthenticationStatus, BitskiSDKOptions, OAuthSignInMethod } from '../bitski';
import { AuthenticationError } from '../errors/authentication-error';
import { AuthProvider } from './auth-provider';
import { OAuthManager, OAuthManagerOptions, SignInOptions } from './oauth-manager';
import { TokenStore } from './token-store';
import { User } from './user';
import { UserStore } from './user-store';

export class OpenidAuthProvider implements AccessTokenProvider, AuthProvider {
  public oauthManager: OAuthManager;
  public tokenStore: TokenStore;
  public userStore: UserStore;
  public signOutCallback?: () => void;

  constructor(
    clientId: string,
    redirectUri: string,
    additionalScopes?: string[],
    opts?: BitskiSDKOptions,
  ) {
    opts = opts || {};

    const settings: OAuthManagerOptions = {
      additionalScopes,
      clientId,
      redirectUri,
    };
    Object.assign(settings, opts);

    this.oauthManager = new OAuthManager(settings);
    this.tokenStore = new TokenStore(clientId, opts.store);
    this.userStore = new UserStore(clientId, opts.store);
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

    throw AuthenticationError.NotSignedIn();
  }

  public async getIdToken(): Promise<string | undefined> {
    const currentIdToken = await this.tokenStore.getCurrentToken();

    if (currentIdToken) {
      return currentIdToken;
    }
    if (await this.tokenStore.getRefreshToken()) {
      return this.refreshIdToken();
    }
    return Promise.reject(AuthenticationError.NotSignedIn());
  }

  public async getRefreshToken(): Promise<string> {
    const refreshToken = await this.tokenStore.getRefreshToken();

    if (refreshToken) {
      return refreshToken;
    }
    // Error: the user did not approve this app for offline access
    if (await this.tokenStore.getCurrentToken()) {
      return Promise.reject(AuthenticationError.NoRefreshToken());
    }
    // Error: the user is not signed in.
    return Promise.reject(AuthenticationError.NotSignedIn());
  }

  public async invalidateToken(): Promise<void> {
    await this.tokenStore.invalidateCurrentToken();
    if (this.signOutCallback) {
      this.signOutCallback();
    }
  }

  private async refreshTokens(): Promise<TokenResponse> {
    const refreshToken = await this.tokenStore.getRefreshToken();
    if (!refreshToken) {
      throw AuthenticationError.NoRefreshToken();
    }

    try {
      const tokenResponse = await this.oauthManager.refreshAccessToken(refreshToken);
      this.tokenStore.persistTokenResponse(tokenResponse);
      return tokenResponse;
    } catch (error) {
      await this.tokenStore.clear();
      await this.userStore.clear();
      throw error;
    }
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
        return Promise.reject(AuthenticationError.UnsupportedAuthenticationMethod());
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
    await this.userStore.clear();
    // Call the sign out callback if one has been provided
    if (this.signOutCallback) {
      this.signOutCallback();
    }
    // We don't currently have the ability to invalidate access tokens, so for now simply resolve.
    // Down the road this may perform a network request to invalidate.
    return Promise.resolve();
  }

  private async getOrFetchUser(): Promise<User> {
    const currentUser = await this.userStore.getCurrentUser();
    if (currentUser) {
      return currentUser;
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
        this.userStore.set(user);
        return user;
      });
  }
}
