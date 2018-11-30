import { Log, User } from 'oidc-client';
import { BitskiEngine } from 'bitski-provider';
import { BitskiBrowserEngine } from './providers/bitski-browser-engine';
import { BitskiDevelopmentEngine } from './providers/bitski-development-engine';
import { OAuthProviderIntegrationType } from './auth/auth-provider';
import { OpenidAuthProvider } from './auth/openid-auth-provider';
import { ConnectButton, ConnectButtonSize } from './components/connect-button';

/**
 * Bitski SDK
 */
export class Bitski {
  private engines = new Map<string, BitskiEngine>();
  private clientId: string;
  private authProvider: OpenidAuthProvider;

  /**
   * @param clientId OAuth Client ID
   * @param redirectUri Redirect URL, defaults to window.URL
   * @param postLogoutRedirectUri Post logout redirect URL, defaults to window.URL
   * @param otherSettings Other OAuth settings. Don't change these unless you know what you are doing.
   */
  constructor(clientId: string, redirectUri?: string, postLogoutRedirectUri?: string, otherSettings?: object) {
    this.clientId = clientId;
    this.authProvider = new OpenidAuthProvider(clientId, redirectUri || window.location.href, postLogoutRedirectUri || window.location.href, otherSettings);
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
   * Gets the current signed in user. Will return an error if we are not signed in.
   */
  public getUser(): Promise<User> {
    return this.authProvider.getUser();
  }

  /**
   * Creates a sign in with bitski button to add to your app. If an HTML element is passed in as the
   * first parameter, it will automatically add it to the DOM inside that element. Make sure to add
   * a callback to get notified of login events.
   * @param existingDiv Existing element to turn into a Bitski connect button
   * @param size Size of button to generate. Defaults to medium.
   * @param authMethod Login method to use. Defaults to popup.
   * @param callback Post-login callback. Called when sign in is complete. Not applicable for redirect login method.
   */
  public getConnectButton(existingDiv?: HTMLElement, size: ConnectButtonSize = ConnectButtonSize.MEDIUM, authMethod: OAuthProviderIntegrationType = OAuthProviderIntegrationType.POPUP, callback?: (error?: Error, user?: User) => void): ConnectButton {
    return new ConnectButton(this.authProvider, existingDiv, size, authMethod, callback);
  }

  /**
   * Starts sign in flow.
   * @param type Optionally specify an integration type. Defaults to REDIRECT.
   */
  public signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User> {
    return this.authProvider.signIn(authenticationIntegrationType);
  }

  /**
   * Gets the current user if it exists. If not, signs in. Unlike `getUser` this will never return
   * an expired user or null.
   * @param authenticationIntegrationType Optionally specify an integration type. Defaults to REDIRECT.
   */
  public getUserOrSignIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User> {
    return this.authProvider.getUserOrSignIn(authenticationIntegrationType);
  }

  /**
   * Called from your oauth redirect page.
   * @param authenticationIntegrationType Log in method used. Must match the method actually used when logging in.
   * @param url Optionally provide the full callback url including the query params in cases when it cannot be automatically detected
   */
  public signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType, url?: string): Promise<User> {
    return this.authProvider.signInCallback(authenticationIntegrationType || this.assumedCallbackType(window), url);
  }

  /**
   * Sign the current user out of your application.
   */
  public signOut(): Promise<void> {
    this.engines.forEach(engine => engine.stop());
    return this.authProvider.signOut();
  }

  /**
   * Set logger and log level for debugging purposes
   * @param logger The logger to use (i.e. console). Must support methods info(), warn(), and error().
   * @param level The desired log level.
   * Use 0 for none (the default), 1 for errors, 2 for warnings, 3 for info, and 4 for debug.
   */
  public setLogger(logger: any, level?: number) {
    Log.logger = logger;
    if (level) {
      Log.level = level;
    }
  }

  private assumedCallbackType(w: Window): OAuthProviderIntegrationType {
    if (w.parent !== w) {
      return OAuthProviderIntegrationType.SILENT;
    } else if (w.opener) {
      return OAuthProviderIntegrationType.POPUP;
    }
    return OAuthProviderIntegrationType.REDIRECT;
  }

}
