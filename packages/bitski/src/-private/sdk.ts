import { AuthorizationServiceConfiguration } from '@openid/appauth';
import {
  BitskiProvider,
  BitskiProviderConfig,
  BitskiProviderStore,
  createBitskiProvider,
  LocalStorageStore,
} from 'bitski-provider';

import { SignInOptions } from './auth/oauth-manager';
import { OpenidAuthProvider } from './auth/openid-auth-provider';
import { User } from './auth/user';
import { AuthenticationStatus, OAuthSignInMethod, SDK_VERSION } from './constants';
import { Network } from './network';
import css from './styles/connect-button';

// global value provided by scripts/insert-package-version.mjs
declare const BITSKI_SDK_VERSION: string;

export interface BitskiSDKOptions {
  // Customize oauth configuration
  configuration?: AuthorizationServiceConfiguration;
  // Customize how tokens and user data are stored.
  store?: BitskiProviderStore;
}

export interface PaymasterDefinition {
  paymasterUrl: string;
  policyId?: string;
  rpcMethod?: string;
}

export interface WaasDefinition {
  enabled: boolean;
  userId?: string;
  transactionProxyUrl?: string;
}

export interface ProviderOptions extends Omit<Partial<BitskiProviderConfig>, 'prependMiddleware'> {
  networkName?: string;
  network?: Network;
  paymaster?: PaymasterDefinition | PaymasterDefinition[];
  waas?: WaasDefinition;
  additionalSigningContext?: Record<string, unknown>;
  // @deprecated
  webBaseUrl?: string;
  // @deprecated
  callbackURL?: string;
  // @deprecated
  disableBlockTracking?: boolean;
  // @deprecated
  minGasPrice?: number;
}

/**
 * Bitski SDK
 */
export class BitskiSDK {
  protected clientId: string;
  protected authProvider: OpenidAuthProvider;
  protected signoutHandlers: Array<() => void> = [];
  protected sdkVersion: string;
  protected store: BitskiProviderStore;

  /**
   * @param clientId OAuth Client ID
   * @param redirectUri Redirect uri, defaults to the current url. This should be the location of your callback html file.
   * @param additionalScopes To use custom scopes, add them here. The default value is ['offline'].
   * Note: Make sure your app is approved for the scopes you are requesting first.
   * @param options Other OAuth settings. Don't change these unless you know what you are doing.
   */
  constructor(
    clientId: string,
    redirectUri?: string,
    additionalScopes?: string[],
    options?: BitskiSDKOptions,
  ) {
    this.clientId = clientId;
    this.sdkVersion = SDK_VERSION;
    this.store = options?.store || new LocalStorageStore();
    this.authProvider = new OpenidAuthProvider(
      clientId,
      redirectUri || window.location.href,
      this.store,
      additionalScopes,
      options?.configuration,
    );

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      if (document && document.body) {
        this.injectStyles();
      } else {
        window.addEventListener('load', () => {
          this.injectStyles();
        });
      }
    }

    this.authProvider.signOutCallback = this.onSignOut.bind(this);
  }

  /**
   * Signs in or connects to bitski depending on the user's auth state.
   * Since it may open a popup, this method must be called from user interaction handler,
   * such as a click or tap handler.
   * @param options Provide SignInOptions for the sign in request. See signIn() for more info.
   */
  public signInOrConnect(method?: OAuthSignInMethod, options?: SignInOptions): Promise<User> {
    return this.authProvider.signInOrConnect(method, options);
  }

  /**
   * Check the logged in state of the user
   */
  public getAuthStatus(): Promise<AuthenticationStatus> {
    return this.authProvider.getAuthStatus();
  }

  /**
   * Starts the sign in flow. Will trigger a popup window over your app, so it must be called within a user interaction handler such as a click.
   * @param options Optionally provide additional options for the sign in request.
   *
   * You can use the options parameter to request that we show the sign up form instead of the sign in form:
   * ```javascript
   * import { LOGIN_HINT_SIGNUP } from 'bitski';
   *
   * await bitski.signIn({ login_hint: LOGIN_HINT_SIGNUP });
   * ```
   */
  public signIn(options?: SignInOptions): Promise<User> {
    return this.authProvider.signIn(OAuthSignInMethod.Popup, options);
  }

  /**
   * Gets the current signed in user. Will reject if we are not signed in.
   */
  public getUser(): Promise<User> {
    return this.authProvider.getUser();
  }

  /**
   * Connects to bitski to get a valid access token if possible.
   */
  public connect(): Promise<User> {
    return this.authProvider.connect();
  }

  /**
   * Starts redirect sign in flow. This is an alternative flow to the popup that all takes place in the same browser window.
   * @param options Optionally provide additional options for the sign in request. See signIn() for more info.
   */
  public signInRedirect(options?: SignInOptions): void {
    this.authProvider.signIn(OAuthSignInMethod.Redirect, options);
  }

  /**
   * Call from your oauth redirect page.
   */
  public redirectCallback(): Promise<User> {
    return this.authProvider.redirectCallback();
  }

  /**
   * Retrieves the current access token for the user, if logged in.
   */
  public getCurrentAccessToken(): Promise<string> {
    return this.authProvider.getAccessToken();
  }

  /**
   * Retrieves the current ID token for the user, if logged in.
   */
  public getCurrentIdToken(): Promise<string | undefined> {
    return this.authProvider.getIdToken();
  }

  /**
   * Retrieves the current refresh token for the user, if logged in.
   * Requires that the user has approved your application for offline access.
   */
  public getCurrentRefreshToken(): Promise<string> {
    return this.authProvider.getRefreshToken();
  }

  /**
   * Register a callback to be called on sign out. This is a good practice,
   * since there may be situations where you are signed out unexpectedly.
   * @param fn Your callback function
   */
  public addSignOutHandler(fn: () => void): void {
    this.signoutHandlers.push(fn);
  }

  /**
   * Remove a registered signout callback
   * @param fn Your callback function
   */
  public removeSignOutHandler(fn: () => void): void {
    const index = this.signoutHandlers.findIndex((item) => item === fn);
    if (index >= 0) {
      this.signoutHandlers.splice(index, 1);
    }
  }

  /**
   * Sign the current user out of your application.
   */
  public signOut(): Promise<void> {
    return this.authProvider.signOut();
  }

  /**
   * Used to refresh the auth provider's state if the user is logged in/out in a
   * different process
   */
  public reloadAuthState(): void {
    this.authProvider.loadFromCache();
  }

  public createProvider(options: ProviderOptions = {}): BitskiProvider {
    return createBitskiProvider({
      clientId: this.clientId,
      getAccessToken: this.getCurrentAccessToken.bind(this),
      clearAccessToken: this.signOut.bind(this),
      getUser: async () => this.authProvider.getUserFromCache(),
      signerBaseUrl: options.webBaseUrl,
      transactionCallbackUrl: options.callbackURL,
      ...options,
      additionalHeaders: {
        'X-CLIENT-VERSION': BITSKI_SDK_VERSION,
        ...options.additionalHeaders,
      },
      additionalSigningContext: options.additionalSigningContext,
      prependMiddleware: undefined,
      signerMethod: 'iframe',
    });
  }

  protected onSignOut(): void {
    this.signoutHandlers.forEach((cb) => {
      cb();
    });
  }

  /**
   * Embeds Bitski's UI styles
   */
  protected injectStyles(): void {
    if (document.getElementById('BitskiSDKButtonEmbeddedStyles')) {
      return;
    }
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.setAttribute('id', 'BitskiSDKButtonEmbeddedStyles');
    style.appendChild(document.createTextNode(css));
    const head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }
}
