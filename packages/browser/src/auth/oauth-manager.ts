import {
  AuthorizationError,
  AuthorizationNotifier,
  AuthorizationRequest,
  AuthorizationRequestHandler,
  AuthorizationResponse,
  AuthorizationServiceConfiguration,
  BaseTokenRequestHandler,
  FetchRequestor,
  GRANT_TYPE_AUTHORIZATION_CODE,
  GRANT_TYPE_REFRESH_TOKEN,
  RedirectRequestHandler,
  TokenRequest,
  TokenRequestHandler,
  TokenResponse,
} from '@openid/appauth';
import { BITSKI_USER_API_HOST, DEFAULT_OAUTH_CONFIGURATION, DEFAULT_OPTIONAL_SCOPES, DEFAULT_SCOPES } from '../constants';
import { AuthenticationError } from '../errors/authentication-error';
import { NoHashQueryStringUtils } from '../utils/no-hash-query-string-utils';
import { parseResponse } from '../utils/request-utils';
import { PopupBlockedError, PopupClosedError, PopupRequestHandler } from './popup-handler';
import { UserInfoResponse } from './user';

export interface OAuthManagerOptions {
  clientId: string;
  redirectUri: string;
  configuration?: AuthorizationServiceConfiguration;
  additionalScopes?: string[];
}

export interface SignInOptions {
  login_hint?: string;
}

// Use this constant in login_hint to indicate that the sign up UI should be displayed
export const LOGIN_HINT_SIGNUP = 'signup';

/**
 * Responsible for submitting requests to our OAuth server.
 */
export class OAuthManager {

  // Represents the oauth endpoints and settings
  public configuration: AuthorizationServiceConfiguration;

  protected clientId: string;
  protected redirectUri: string;
  protected tokenHandler: TokenRequestHandler;
  protected notifier: AuthorizationNotifier;
  protected authHandler?: AuthorizationRequestHandler;
  protected pendingResolver?: { fulfill: (value: AuthorizationResponse) => void, reject: (error: Error) => void };
  protected scopes: string[];

  /**
   * Create a new OAuth Manager
   * @param options Settings object
   * @param options.clientId string: The client id to use for various requests
   * @param options.redirectUri string: The redirect URI to use for responding to auth requests
   * @param options.configuration AuthorizationServiceConfiguration (optional): The configuration for the OAuth server
   * @param options.additionalScopes string[] (optional): Additional scopes to request outside of openid.
   * Default is offline. Pass an empty array to only request openid.
   */
  constructor(options: OAuthManagerOptions) {
    this.clientId = options.clientId;
    this.redirectUri = options.redirectUri;
    this.configuration = options.configuration || new AuthorizationServiceConfiguration(DEFAULT_OAUTH_CONFIGURATION);
    const additionalScopes = options.additionalScopes || DEFAULT_OPTIONAL_SCOPES;
    this.scopes = DEFAULT_SCOPES.concat(additionalScopes);
    this.tokenHandler = new BaseTokenRequestHandler(new FetchRequestor());
    this.notifier = new AuthorizationNotifier();
    this.notifier.setAuthorizationListener(this.didCompleteAuthorizationFlow.bind(this));
  }

  /**
   * Trigger a popup sign in flow (the default)
   */
  public signInPopup(opts?: SignInOptions): Promise<TokenResponse> {
    opts = opts || {};
    const promise = new Promise<AuthorizationResponse>((fulfill, reject) => {
      this.pendingResolver = { fulfill, reject };
    });
    this.authHandler = new PopupRequestHandler();
    this.authHandler.setAuthorizationNotifier(this.notifier);
    const request = this.createAuthRequest(opts);
    this.authHandler.performAuthorizationRequest(this.configuration, request);
    return promise.then((response) => {
      return this.requestAccessToken(response.code);
    });
  }

  /**
   * Trigger a redirect sign in flow. Promise should never fulfill, as you will be redirected.
   */
  public signInRedirect(opts?: SignInOptions): Promise<AuthorizationResponse> {
    opts = opts || {};
    const promise = new Promise<AuthorizationResponse>((fulfill, reject) => {
      this.pendingResolver = { fulfill, reject };
    });
    this.authHandler = new RedirectRequestHandler(undefined, new NoHashQueryStringUtils());
    this.authHandler.setAuthorizationNotifier(this.notifier);
    const request = this.createAuthRequest(opts);
    this.authHandler.performAuthorizationRequest(this.configuration, request);
    // Since this method redirects the whole window, the promise will
    // likely never complete unless we encounter an error.
    return promise;
  }

  /**
   * Attempt to finalize auth request from a redirect flow. Called from your redirect url once you've been
   * redirected back.
   */
  public redirectCallback(): Promise<TokenResponse> {
    const promise = new Promise<AuthorizationResponse>((fulfill, reject) => {
      this.pendingResolver = { fulfill, reject };
    });
    this.authHandler = new RedirectRequestHandler(undefined, new NoHashQueryStringUtils());
    this.authHandler.setAuthorizationNotifier(this.notifier);
    this.authHandler.completeAuthorizationRequestIfPossible();
    return promise.then((response) => {
      return this.requestAccessToken(response.code);
    });
  }

  /**
   * Exchange an authorization code for an access token
   * @param code The authorization code to exchange
   */
  public requestAccessToken(code: string): Promise<TokenResponse> {
    const request = this.createTokenRequest(code);
    return this.tokenHandler.performTokenRequest(this.configuration, request);
  }

  /**
   * Request a new access token from a previous refresh token
   * @param refreshToken The refresh token to use for authorization
   */
  public refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    const request = this.createRefreshTokenRequest(refreshToken);
    return this.tokenHandler.performTokenRequest(this.configuration, request);
  }

  /**
   * Submit a sign out request on the oauth endpoint
   * @param accessToken The access token to sign out with
   */
  public requestSignOut(accessToken: string): Promise<any> {
    return fetch(`${BITSKI_USER_API_HOST}/logout`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).then((response) => {
        return parseResponse<any>(response);
    });
  }

  /**
   * Request a user's profile from the oauth server
   * @param accessToken The access token for the user
   */
  public requestUserInfo(accessToken: string): Promise<UserInfoResponse> {
    const userInfoEndpoint = this.configuration.userInfoEndpoint;
    if (!userInfoEndpoint) {
      return Promise.reject(AuthenticationError.InvalidConfiguration('Could not find user info endpoint'));
    }
    return fetch(userInfoEndpoint, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      return parseResponse<UserInfoResponse>(response);
    });
  }

  /**
   * Internal callback from our Auth Request handler. Passes the response through to a cached promise if it exists.
   * @param request The original auth request
   * @param response The auth response if it was successful
   * @param errorResponse The error response if it failed
   */
  protected didCompleteAuthorizationFlow(request: AuthorizationRequest, response: AuthorizationResponse | null, errorResponse: AuthorizationError | null) {
    if (this.pendingResolver) {
      if (response) {
        this.pendingResolver.fulfill(response);
        this.pendingResolver = undefined;
      } else if (errorResponse) {
        if (errorResponse instanceof PopupClosedError) {
          this.pendingResolver.reject(AuthenticationError.UserCancelled());
        } else if (errorResponse instanceof PopupBlockedError) {
          // Parse domain of the authority, to log better context for error.
          const urlMatch = /^(http?s:\/\/[\w.]*)\/[\w\/]*$/;
          // Check for matches against the authority
          const matches = this.configuration.authorizationEndpoint.match(urlMatch);
          const baseUrl = matches && matches.length > 1 ? matches[1] : '';
          this.pendingResolver.reject(AuthenticationError.PopupBlocked(baseUrl));
        } else {
          this.pendingResolver.reject(AuthenticationError.ServerError(errorResponse.error, errorResponse.errorDescription));
        }
        this.pendingResolver = undefined;
      }
    }
  }

  /**
   * Factory method to create an auth request
   */
  protected createAuthRequest(opts: SignInOptions): AuthorizationRequest {
    // Create base request
    const request = new AuthorizationRequest({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
      scope: this.scopes.join(' '),
    }, undefined, false);

    // Pass options through
    if (opts.login_hint) {
      // Only assign extras if login_hint is included in the options
      request.extras = { login_hint: opts.login_hint };
    }

    return request;
  }

  /**
   * Factory method to create a token request with a refresh token
   * @param refreshToken Refresh token to use
   */
  protected createRefreshTokenRequest(refreshToken: string): TokenRequest {
    return new TokenRequest({
      client_id: this.clientId,
      grant_type: GRANT_TYPE_REFRESH_TOKEN,
      redirect_uri: this.redirectUri,
      refresh_token: refreshToken,
    });
  }

  /**
   * Factory method to create a token request with an auth code
   * @param code The auth code to use
   */
  protected createTokenRequest(code: string): TokenRequest {
    return new TokenRequest({
      client_id: this.clientId,
      code,
      grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
      redirect_uri: this.redirectUri,
    });
  }

}
