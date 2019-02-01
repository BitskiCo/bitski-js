import { BitskiEngine } from 'bitski-provider';
import { OpenidAuthProvider } from './auth/openid-auth-provider';
import { User } from './auth/user';
import { ConnectButton, ConnectButtonSize } from './components/connect-button';
import { BitskiBrowserEngine } from './providers/bitski-browser-engine';
import { BitskiDevelopmentEngine } from './providers/bitski-development-engine';
import css from './styles/index';
import { processCallback } from './utils/callback';

export enum OAuthSignInMethod {
  Redirect = 'REDIRECT',
  Popup = 'POPUP',
  Silent = 'SILENT', // Deprecated
}

export enum AuthenticationStatus {
  Connected = 'CONNECTED',
  Expired = 'EXPIRED',
  NotConnected = 'NOT_CONNECTED',
}

export { ConnectButtonSize };

export interface ProviderOptions {
  networkName?: string;
  rpcUrl?: string;
  webBaseUrl?: string;
  pollingInterval?: number;
}

/**
 * Bitski SDK
 */
export class Bitski {
  /**
   * Alternative to using our static callback.html file. Call this from your own redirect page.
   */
  public static callback(): void {
    processCallback();
  }

  private engines = new Map<string, BitskiEngine>();
  private clientId: string;
  private authProvider: OpenidAuthProvider;
  private signoutHandlers: Array<() => void> = [];

  /**
   * @param clientId OAuth Client ID
   * @param redirectUri Redirect uri, defaults to the current url. This should be the location of your callback html file.
   * @param additionalScopes To use custom scopes, add them here. The default value is ['offline'].
   * Note: Make sure your app is approved for the scopes you are requesting first.
   * @param options Other OAuth settings. Don't change these unless you know what you are doing.
   */
  constructor(clientId: string, redirectUri?: string, additionalScopes?: string[], options?: any) {
    this.clientId = clientId;
    this.authProvider = new OpenidAuthProvider(clientId, redirectUri || window.location.href, additionalScopes, options);
    if (document && document.body) {
      this.injectStyles();
    } else {
      window.addEventListener('load', () => {
        this.injectStyles();
      });
    }
    this.authProvider.signOutCallback = this.onSignOut.bind(this);
  }

  /**
   * Returns a new web3 provider for a given network.
   * @param options options for the provider
   * @param options.networkName The network name to use (defaults to mainnet)
   * @param options.rpcUrl Use this instead of networkName to use the SDK in a dev environment
   * @param options.pollingInterval minimum interval in milliseconds to poll for new blocks. default is 4000.
   */
  public getProvider(options?: ProviderOptions | string): BitskiEngine {
    const normalizedOptions = this.normalizeProviderOptions(options);
    const providerId = normalizedOptions.rpcUrl || normalizedOptions.networkName || 'mainnet';
    const existingProvider = this.engines.get(providerId);
    if (existingProvider) {
      existingProvider.start();
      return existingProvider;
    }
    const newProvider = this.createProvider(normalizedOptions);
    newProvider.start();
    this.engines.set(providerId, newProvider);
    return newProvider;
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
  public getConnectButton(options?: any, callback?: (error?: Error, user?: any) => void): ConnectButton {
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
   * Check the logged in state of the user
   */
  public get authStatus(): AuthenticationStatus {
    return this.authProvider.authStatus;
  }

  /**
   * DEPRECATED - use bitski.authStatus instead.
   * Check the logged in state of the user. Either connected (have an active session), expired (connected but needs new access token), or not connected.
   */
  public getAuthStatus(): Promise<AuthenticationStatus> {
    return Promise.resolve(this.authProvider.authStatus);
  }

  /**
   * Starts the sign in flow. Will trigger a popup window over your app, so it must be called within a user interaction handler such as a click.
   */
  public signIn(): Promise<User> {
    return this.authProvider.signIn(OAuthSignInMethod.Popup);
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
   */
  public signInRedirect(): void {
    this.authProvider.signIn(OAuthSignInMethod.Redirect);
  }

  /**
   * Call from your oauth redirect page.
   */
  public redirectCallback(): Promise<User> {
    return this.authProvider.redirectCallback();
  }

  /**
   * Register a callback to be called on sign out. This is a good practice,
   * since there may be situations where you are signed out unexpectedly.
   * @param fn Your callback function
   */
  public addSignOutHandler(fn: () => void) {
    this.signoutHandlers.push(fn);
  }

  /**
   * Remove a registered signout callback
   * @param fn Your callback function
   */
  public removeSignOutHandler(fn: () => void) {
    const index = this.signoutHandlers.findIndex((item) => item === fn);
    if (index >= 0) {
      this.signoutHandlers.splice(index, 1);
    }
  }

  /**
   * Sign the current user out of your application.
   */
  public signOut(): Promise<void> {
    this.engines.forEach((engine) => engine.stop());
    return this.authProvider.signOut();
  }

  private createProvider(options: ProviderOptions): BitskiEngine {
    if (options.rpcUrl && !options.networkName) {
      return this.createRPCEngine(options.rpcUrl, options);
    } else {
      return this.createBitskiEngine(options.networkName || 'mainnet', options);
    }
  }

  private normalizeProviderOptions(options: ProviderOptions | string | undefined): ProviderOptions {
    if (typeof options === 'string') {
      if (options.includes('http')) {
        // Passed in a url string
        return {
          rpcUrl: options,
        };
      } else {
        // Passed in a network name
        return {
          networkName: options,
        };
      }
    } else if (options) {
      // Options is good to go already
      if (options.networkName || options.rpcUrl) {
        return options;
      }
    }
    // Return the default value
    return {
      networkName: 'mainnet',
    };
  }

  private createBitskiEngine(networkName: string, options: ProviderOptions): BitskiEngine {
    return new BitskiBrowserEngine(this.clientId, this.authProvider, networkName, options.webBaseUrl, options.rpcUrl, options);
  }

  private createRPCEngine(rpcUrl: string, options: ProviderOptions): BitskiEngine {
    return new BitskiDevelopmentEngine(options, rpcUrl);
  }

  private onSignOut() {
    this.signoutHandlers.forEach((cb) => {
      cb();
    });
  }

  /**
   * Embeds Bitski's UI styles
   */
  private injectStyles(): void {
    if (document.getElementById('BitskiEmbeddedStyles')) {
      return;
    }
    const style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.setAttribute('id', 'BitskiEmbeddedStyles');
    style.appendChild(document.createTextNode(css));
    const head = document.head || document.getElementsByTagName('head')[0];
    head.append(style);
  }

}
