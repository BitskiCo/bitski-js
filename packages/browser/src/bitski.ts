import { BitskiEngine } from 'bitski-provider';
import { Log, User } from 'oidc-client';
import { OAuthSignInMethod } from './auth/auth-provider';
import { OpenidAuthProvider } from './auth/openid-auth-provider';
import { ConnectButton, ConnectButtonSize } from './components/connect-button';
import { BitskiBrowserEngine } from './providers/bitski-browser-engine';
import { BitskiDevelopmentEngine } from './providers/bitski-development-engine';

export enum AuthenticationStatus {
  Connected = 'CONNECTED',
  Expired = 'EXPIRED',
  NotConnected = 'NOT_CONNECTED',
}

/**
 * Bitski SDK
 */
export class Bitski {
  private engines = new Map<string, BitskiEngine>();
  private clientId: string;
  private authProvider: OpenidAuthProvider;

  /**
   * @param clientId OAuth Client ID
   * @param redirectUri Redirect uri, defaults to the current url. This should be the location of your callback html file.
   * @param options Other OAuth settings. Don't change these unless you know what you are doing.
   */
  constructor(clientId: string, redirectUri?: string, options?: any) {
    this.clientId = clientId;
    this.authProvider = new OpenidAuthProvider(clientId, redirectUri || window.location.href, options);
  }

  /**
   * Returns a new web3 provider for a given network.
   * @param networkName optional name of the network to use, or host for a local provider. Defaults to mainnet.
   * @param options options for the provider
   * @param options.pollingInterval minimum interval in milliseconds to poll for new blocks. default is 4000.
   */
  public getProvider(networkName?: string, options?: any): BitskiEngine {
    const existingProvider = this.engines.get(networkName || 'mainnet');
    if (existingProvider) {
      existingProvider.start();
      return existingProvider;
    }
    let provider: BitskiEngine;
    switch (networkName) {
      case 'mainnet':
      case 'rinkeby':
      case 'kovan':
      case undefined:
        provider = new BitskiBrowserEngine(this.clientId, this.authProvider, networkName, options);
        provider.start();
        break;
      default:
        provider = new BitskiDevelopmentEngine(options, networkName);
        provider.start();
        break;
    }
    this.engines.set(networkName || 'mainnet', provider);
    return provider;
  }

  /**
   * Creates a sign in with bitski button to add to your app. If an HTML element is passed in as the
   * first parameter, it will automatically add it to the DOM inside that element. Make sure to add
   * a callback to get notified of login events.
   * @param options Optionally provide options for the button
   * @param options.container Existing dom element to embed the Bitski connect button
   * @param options.size ConnectButtonSize of button to generate. Defaults to Medium.
   * @param options.authMethod Login method to use. Defaults to popup.
   * @param callback Post-login callback. Called when sign in is complete. Not applicable for redirect login method.
   */
  public getConnectButton(options?: any, callback?: (error?: Error, user?: User) => void): ConnectButton {
    let settings = {
      authMethod: OAuthSignInMethod.Popup,
      container: undefined,
      size: ConnectButtonSize.Medium,
    };
    settings = Object.assign(settings, options);
    return new ConnectButton(this.authProvider, settings.container, settings.size, settings.authMethod, callback);
  }

  /**
   * Signs in or connects to bitski depending on the user's auth state.
   * Since it may open a popup, this method must be called from user interaction handler,
   * such as a click or tap handler.
   */
  public start(): Promise<User> {
    return this.authProvider.signInOrConnect();
  }

  /**
   * Check the logged in state of the user. Either connected (have an active session), expired (connected but needs new access token), or not connected.
   */
  public getAuthStatus(): Promise<AuthenticationStatus> {
    return this.authProvider.getAuthStatus();
  }

  /**
   * Starts the sign in flow. Will trigger a popup window over your app, so it must be called within a user interaction handler such as a click.
   */
  public signIn(): Promise<User> {
    return this.authProvider.signIn(OAuthSignInMethod.Popup);
  }

  /**
   * Gets the current signed in user. Will return null if we are not signed in.
   */
  public getUser(): Promise<User> {
    return this.authProvider.getUser();
  }

  /**
   * Connects to bitski to get a valid access token if possible.
   */
  public connect(): Promise<User> {
    return this.authProvider.getAuthStatus().then((authStatus) => {
      if (authStatus === AuthenticationStatus.Connected) {
        return this.authProvider.getUser();
      }
      return this.authProvider.signIn(OAuthSignInMethod.Silent);
    });
  }

  /**
   * Starts redirect sign in flow. This is an alternative flow to the popup that all takes place in the same browser window.
   * @param redirectUri Optionally specify the url to be redirected to after login.
   * By default it will redirect to the uri you passed when initializing the sdk, or the current url.
   * Note that the exact uri you enter here must exactly match a redirect uri entered on the Bitski developer portal.
   */
  public signInRedirect(redirectUri?: string): void {
    let opts: any;
    if (redirectUri) {
      opts = {
        redirect_uri: redirectUri,
      };
    }
    this.authProvider.signIn(OAuthSignInMethod.Redirect, opts);
  }

  /**
   * Called from your oauth redirect page.
   * @param url Optionally provide the full callback url including the query params. Should only be needed in cases when window.location.href is not correct.
   */
  public redirectCallback(url?: string): Promise<User> {
    return this.authProvider.signInCallback(OAuthSignInMethod.Redirect, url);
  }

  /**
   * Alternative to using our static callback.html file. Call this from your own redirect page.
   */
  public callback(): void {
    if (window.parent !== window) {
      this.authProvider.signInCallback(OAuthSignInMethod.Silent);
    } else {
      this.authProvider.signInCallback(OAuthSignInMethod.Popup);
    }
  }

  /**
   * Sign the current user out of your application.
   */
  public signOut(): Promise<void> {
    this.engines.forEach((engine) => engine.stop());
    return this.authProvider.signOut();
  }

  /**
   * Set logger and log level for debugging purposes
   * @param logger The logger to use (i.e. console). Must support methods info(), warn(), and error().
   * @param level The desired log level.
   * Use 0 for none (the default), 1 for errors, 2 for warnings, 3 for info, and 4 for debug.
   */
  public setLogger(logger: any, level?: number): void {
    Log.logger = logger;
    if (level) {
      Log.level = level;
    }
  }

}
