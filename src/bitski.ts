import { Log, User } from 'oidc-client';
import ProviderEngine from 'web3-provider-engine';
import CacheSubprovider from 'web3-provider-engine/subproviders/cache';
import DefaultFixtures from 'web3-provider-engine/subproviders/default-fixture';
import RpcSource from 'web3-provider-engine/subproviders/fetch';
import InflightCacheSubprovider from 'web3-provider-engine/subproviders/inflight-cache';
import NonceTrackerSubprovider from 'web3-provider-engine/subproviders/nonce-tracker';
import SanitizingSubprovider from 'web3-provider-engine/subproviders/sanitizer';
import Subprovider from 'web3-provider-engine/subproviders/subprovider';
import SubscriptionSubprovider from 'web3-provider-engine/subproviders/subscriptions';
import VmSubprovider from 'web3-provider-engine/subproviders/vm';
import { AuthProvider, OAuthProviderIntegrationType } from './auth/auth-provider';
import { OpenidAuthProvider } from './auth/openid-auth-provider';
import { ConnectButton, ConnectButtonSize } from './components/connect-button';
import { AuthenticatedFetchSubprovider } from './subproviders/authenticated-fetch';
import { IFrameSubprovider } from './subproviders/iframe';

const ENABLE_CACHE = true;

/**
 * Bitski SDK
 */
export class Bitski {
  private engines = new Map<string, ProviderEngine>();
  private clientId: string;
  private authProvider: AuthProvider;

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
   */
  public getProvider(networkName?: string): ProviderEngine {
    const existingProvider = this.engines.get(networkName || 'mainnet');
    if (existingProvider) {
      existingProvider.start();
      return existingProvider;
    }
    let provider: ProviderEngine;
    switch (networkName) {
      case 'mainnet':
      case 'rinkeby':
      case 'kovan':
      case undefined:
        provider = this.createBitskiEngine(networkName);
        break;

      default:
        provider = this.createThirdPartyEngine(networkName);
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
   */
  public getConnectButton(existingDiv?: HTMLElement, size: ConnectButtonSize = ConnectButtonSize.MEDIUM): ConnectButton {
    return new ConnectButton(this.authProvider, existingDiv, size);
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
   * @param authenticationIntegrationType Should match the method called when signing in.
   */
  public signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType, url?: string): Promise<User> {
    const assumedCallbackType = authenticationIntegrationType || OAuthProviderIntegrationType.POPUP;
    return this.authProvider.signInCallback(assumedCallbackType, url);
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

  public isInFrame(): boolean {
    return window.parent !== window;
  }

  private createEngine(fetchSubprovider: Subprovider, networkName: string): ProviderEngine {
    const engine = new ProviderEngine();

    this.addDefaultSubproviders(engine);

    const iframeSubprovider = new IFrameSubprovider('https://www.bitski.com', networkName || 'mainnet', this.authProvider);

    engine.addProvider(iframeSubprovider);

    engine.addProvider(fetchSubprovider);

    engine.on('error', error => {
      if (error.message === 'Not signed in') {
        engine.stop();
      }
    });

    engine.start();

    return engine;
  }

  private addDefaultSubproviders(engine: ProviderEngine, enableCache = ENABLE_CACHE) {
    engine.addProvider(new DefaultFixtures());

    engine.addProvider(new NonceTrackerSubprovider());

    const sanitizer = new SanitizingSubprovider();
    engine.addProvider(sanitizer);

    if (enableCache) {
      const cacheSubprovider = new CacheSubprovider();
      engine.addProvider(cacheSubprovider);
    }

    const filterAndSubsSubprovider = new SubscriptionSubprovider();
    filterAndSubsSubprovider.on('data', (err, notification) => {
      engine.emit('data', err, notification);
    });
    engine.addProvider(filterAndSubsSubprovider);

    if (enableCache) {
      const inflightCache = new InflightCacheSubprovider();
      engine.addProvider(inflightCache);
    }
  }

  private createBitskiEngine(networkName?: string): ProviderEngine {
    const network = networkName || 'mainnet';
    const fetchSubprovider = new AuthenticatedFetchSubprovider(
      `https://api.bitski.com/v1/web3/${network}`,
      false,
      this.authProvider,
      {'X-API-KEY': this.clientId, 'X-CLIENT-ID': this.clientId},
    );
    return this.createEngine(fetchSubprovider, networkName || 'mainnet');
  }

  private createThirdPartyEngine(networkName: string): ProviderEngine {
    const debug = false;
    const fetchSubprovider = new RpcSource({ networkName, debug });

    return this.createEngine(fetchSubprovider, networkName || 'mainnet');
  }
}
