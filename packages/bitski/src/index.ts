import { processCallback } from './-private/utils/callback';
import { loadScript } from './load';
import { BitskiProviderShim } from './provider-shim';
import { ConnectButton, ConnectButtonOptions } from './-private/components/connect-button';
import hash from 'hash-it';

import type { User } from './-private/auth/user';
import type { BitskiSDK, BitskiSDKOptions, ProviderOptions } from './-private/sdk';
import type { SignInOptions } from './-private/auth/oauth-manager';
import { AuthenticationStatus, OAuthSignInMethod } from './-private/constants';

// Import these directly so we don't load the whole provider bundle
import {
  BinanceSmartChain,
  BinanceSmartChainTestnet,
  Goerli,
  Mainnet,
  Mumbai,
  Network,
  Polygon,
  Sepolia,
} from './-private/network';

export type { ConnectButtonSize, ConnectButtonOptions } from './-private/components/connect-button';
export type { User } from './-private/auth/user';
export type { SignInOptions } from './-private/auth/oauth-manager';
export type { BitskiSDKOptions, ProviderOptions } from './-private/sdk';

export {
  type Network,
  BinanceSmartChain,
  BinanceSmartChainTestnet,
  Mainnet,
  Goerli,
  Polygon,
  Mumbai,
  AuthenticationStatus,
  OAuthSignInMethod,
};

export class Bitski {
  private sdk: Promise<BitskiSDK | null> | undefined;
  private provider?: BitskiProviderShim;
  private providerCache = new Map<number, BitskiProviderShim>();
  /**
   * Alternative to using our static callback.html file. Call this from your own redirect page.
   */
  static callback(): void {
    processCallback();
  }

  /**
   * @param clientId OAuth Client ID
   * @param redirectUri Redirect uri, defaults to the current url. This should be the location of your callback html file.
   * @param additionalScopes To use custom scopes, add them here. The default value is ['offline'].
   * Note: Make sure your app is approved for the scopes you are requesting first.
   * @param options Other OAuth settings. Don't change these unless you know what you are doing.
   */
  constructor(
    private clientId: string,
    private redirectUri?: string,
    private additionalScopes?: string[],
    private options?: BitskiSDKOptions,
  ) {}

  /**
   * Returns a new web3 provider for a given network.
   * @param options options for the provider, or a network name
   */
  public getProvider(options?: ProviderOptions | string): BitskiProviderShim {
    const existingProvider = this.providerCache.get(hash(options));

    if (existingProvider) {
      this.provider = existingProvider;
      return existingProvider;
    }

    const network = networkFromProviderOptions(options);

    this.provider = new BitskiProviderShim(
      () => this.loadSDK(),
      typeof options === 'string' ? undefined : options,
    );

    const provider = this.provider;

    if (network) {
      (provider as any).setNetwork(network);
    }

    this.providerCache.set(hash(options), provider);

    return provider;
  }

  /**
   * Creates a sign in with bitski button to add to your app. If an HTML element is passed in as the
   * first parameter, it will automatically add it to the DOM inside that element. Make sure to add
   * a callback to get notified of login events.
   * @param options {ConnectButtonOptions} Optional configuration for the button
   * @param callback Post-login callback. Called when sign in is complete. Not applicable for redirect login method.
   */
  public getConnectButton(
    options?: ConnectButtonOptions,
    callback?: (error?: Error, user?: any) => void,
  ): ConnectButton {
    return new ConnectButton(
      () => this.loadSDK(),
      options,
      callback,
      () => this.getProvider(),
    );
  }

  /**
   * Reinitalizes the SDK after the page has been reloaded, and bootstraps window.ethereum.
   * This method should be called always, and immediately after the page loads.
   */
  async initialize(): Promise<void> {
    const localStorageKeys = (await this.options?.store?.keys?.()) || Object.keys(localStorage);

    if (!localStorageKeys.find((key) => key.startsWith('bitski'))) {
      return;
    }

    await this.connect();

    // bootstrap provider
    this.bootstrapProvider();
  }

  /**
   * Signs in or connects to bitski depending on the user's auth state.
   * Since it may open a popup, this method must be called from user interaction handler,
   * such as a click or tap handler.
   * @param options Provide SignInOptions for the sign in request. See signIn() for more info.
   */
  public start(options?: SignInOptions): Promise<User> {
    return this.ensureSDK()
      .then((sdk) => sdk.signInOrConnect(undefined, options))
      .then((user) => {
        this.bootstrapProvider();
        return user;
      });
  }

  /**
   * Check the logged in state of the user
   */
  public getAuthStatus(): Promise<AuthenticationStatus> {
    return this.ensureSDK().then((sdk) => sdk.getAuthStatus());
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
    return this.ensureSDK()
      .then((sdk) => sdk.signIn(options))
      .then((user) => {
        this.bootstrapProvider();
        return user;
      });
  }

  /**
   * Gets the current signed in user. Will reject if we are not signed in.
   */
  public async getUser(): Promise<User> {
    return this.ensureSDK().then((sdk) => sdk.getUser());
  }

  /**
   * Connects to bitski to get a valid access token if possible.
   */
  public async connect(): Promise<User> {
    return this.ensureSDK().then((sdk) => sdk.connect());
  }

  /**
   * Starts redirect sign in flow. This is an alternative flow to the popup that all takes place in the same browser window.
   * @param options Optionally provide additional options for the sign in request. See signIn() for more info.
   */
  public signInRedirect(options?: SignInOptions): void {
    this.ensureSDK().then((sdk) => sdk.signInRedirect(options));
  }

  /**
   * Call from your oauth redirect page.
   */
  public async redirectCallback(): Promise<User> {
    return this.ensureSDK()
      .then((sdk) => sdk.redirectCallback())
      .then((user) => {
        this.bootstrapProvider();
        return user;
      });
  }

  /**
   * Retrieves the current access token for the user, if logged in.
   */
  public async getCurrentAccessToken(): Promise<string> {
    return this.ensureSDK().then((sdk) => sdk.getCurrentAccessToken());
  }

  /**
   * Retrieves the current ID token for the user, if logged in.
   */
  public getCurrentIdToken(): Promise<string | undefined> {
    return this.ensureSDK().then((sdk) => sdk.getCurrentIdToken());
  }

  /**
   * Retrieves the current refresh token for the user, if logged in.
   * Requires that the user has approved your application for offline access.
   */
  public getCurrentRefreshToken(): Promise<string> {
    return this.ensureSDK().then((sdk) => sdk.getCurrentRefreshToken());
  }

  /**
   * Register a callback to be called on sign out. This is a good practice,
   * since there may be situations where you are signed out unexpectedly.
   * @param fn Your callback function
   */
  public addSignOutHandler(fn: () => void): Promise<void> {
    return this.ensureSDK().then((sdk) => sdk.addSignOutHandler(fn));
  }

  /**
   * Remove a registered signout callback
   * @param fn Your callback function
   */
  public removeSignOutHandler(fn: () => void): Promise<void> {
    return this.ensureSDK().then((sdk) => sdk.removeSignOutHandler(fn));
  }

  /**
   * Sign the current user out of your application.
   */
  public signOut(): Promise<void> {
    return this.ensureSDK().then((sdk) => sdk.signOut());
  }

  private bootstrapProvider(): void {
    if (typeof window !== undefined) {
      // bootstrap provider
      (window as any).ethereum = this.getProvider();
    }
  }

  private loadSDK(): Promise<BitskiSDK | null> {
    if (!this.sdk) {
      this.sdk = loadScript().then((BitskiSDK) => {
        return BitskiSDK
          ? new BitskiSDK(this.clientId, this.redirectUri, this.additionalScopes, this.options)
          : null;
      });
    }

    return this.sdk;
  }

  private async ensureSDK(): Promise<BitskiSDK> {
    const sdk = await this.loadSDK();

    if (!sdk) {
      throw new Error('Bitski SDK not available');
    }

    return sdk;
  }
}

// Note: duplicated so we don't include the whole module
export const LOGIN_HINT_SIGNUP = 'signup';
export const LOGIN_PROMPT = 'login';

function networkFromName(networkName: string): Network {
  switch (networkName) {
    case '':
    case 'mainnet':
      return Mainnet;
    case 'goerli':
      return Goerli;
    case 'sepolia':
      return Sepolia;
    case 'polygon':
      return Polygon;
    case 'mumbai':
      return Mumbai;
    case 'bnb':
      return BinanceSmartChain;
    case 'bnbt':
      return BinanceSmartChainTestnet;
    default:
      throw new Error(
        `Unsupported network name ${networkName}. Try passing a \`network\` in the options instead.`,
      );
  }
}

function networkFromProviderOptions(
  options: ProviderOptions | string | undefined,
): Network | undefined {
  if (typeof options === 'string') {
    return networkFromName(options);
  }
  if (options?.network) {
    return options.network;
  }
  if (options?.networkName) {
    return networkFromName(options.networkName);
  }
}
