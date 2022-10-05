import { processCallback } from './-private/utils/callback';
import { loadScript } from './load';
import { BitskiProvider } from './provider';
import { ConnectButton, ConnectButtonOptions } from './-private/components/connect-button';

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
} from 'bitski-provider/lib/network';
import { ProviderError, ProviderErrorCode } from 'bitski-provider';
import { toHex } from './-private/utils/numbers';

export type { Store } from './-private/utils/store';

export type { ConnectButtonSize, ConnectButtonOptions } from './-private/components/connect-button';

export type { User } from './-private/auth/user';

export {
  AuthenticationError,
  AuthenticationErrorCode,
} from './-private/errors/authentication-error';
export { ParseError, ParseErrorCode } from './-private/errors/parse-error';
export { SignerError, SignerErrorCode } from './-private/errors/signer-error';

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
  private sdk: Promise<BitskiSDK | null>;
  private provider?: BitskiProvider;

  /**
   * Alternative to using our static callback.html file. Call this from your own redirect page.
   */
  public static callback(): void {
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
    clientId: string,
    redirectUri?: string,
    additionalScopes?: string[],
    options?: BitskiSDKOptions,
  ) {
    this.sdk = loadScript().then((BitskiSDK) => {
      return BitskiSDK ? new BitskiSDK(clientId, redirectUri, additionalScopes, options) : null;
    });
  }

  /**
   * Returns a new web3 provider for a given network.
   * @param options options for the provider, or a network name
   */
  public getProvider(options?: ProviderOptions | string): BitskiProvider {
    if (typeof window !== 'undefined' && window.Bitski?.getProvider) {
      return window.Bitski.getProvider(options);
    }

    const network = networkFromProviderOptions(options);

    if (!this.provider) {
      this.provider = new BitskiProvider(
        this.sdk,
        network ?? Mainnet,
        typeof options === 'string' ? undefined : options,
      );
    } else if (network) {
      this.provider
        .request({
          method: 'wallet_switchChain',
          params: [{ chainId: toHex(network.chainId) }],
        })
        .catch(async (error: ProviderError) => {
          if (error.code === ProviderErrorCode.ChainDoesNotExist) {
            await this.provider?.request({
              method: 'wallet_addChain',
              params: [
                {
                  chainId: toHex(network.chainId),
                  rpcUrls: [network.rpcUrl],
                },
              ],
            });
            await this.provider?.request({
              method: 'wallet_switchChain',
              params: [{ chainId: toHex(network.chainId) }],
            });
          }
        });
      this.provider.start();
    }

    return this.provider;
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
    return new ConnectButton(this.sdk, options, callback);
  }

  /**
   * Signs in or connects to bitski depending on the user's auth state.
   * Since it may open a popup, this method must be called from user interaction handler,
   * such as a click or tap handler.
   * @param options Provide SignInOptions for the sign in request. See signIn() for more info.
   */
  public async start(options?: SignInOptions): Promise<User> {
    return this.getSDK().then((sdk) => sdk.signInOrConnect(undefined, options));
  }

  /**
   * Check the logged in state of the user
   */
  public async getAuthStatus(): Promise<AuthenticationStatus> {
    return this.getSDK().then((sdk) => sdk.getAuthStatus());
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
  public async signIn(options?: SignInOptions): Promise<User> {
    return this.getSDK().then((sdk) => sdk.signIn(options));
  }

  /**
   * Gets the current signed in user. Will reject if we are not signed in.
   */
  public async getUser(): Promise<User> {
    return this.getSDK().then((sdk) => sdk.getUser());
  }

  /**
   * Connects to bitski to get a valid access token if possible.
   */
  public async connect(): Promise<User> {
    return this.getSDK().then((sdk) => sdk.connect());
  }

  /**
   * Starts redirect sign in flow. This is an alternative flow to the popup that all takes place in the same browser window.
   * @param options Optionally provide additional options for the sign in request. See signIn() for more info.
   */
  public signInRedirect(options?: SignInOptions): void {
    this.getSDK().then((sdk) => sdk.signInRedirect(options));
  }

  /**
   * Call from your oauth redirect page.
   */
  public async redirectCallback(): Promise<User> {
    return this.getSDK().then((sdk) => sdk.redirectCallback());
  }

  /**
   * Retrieves the current access token for the user, if logged in.
   */
  public async getCurrentAccessToken(): Promise<string> {
    return this.getSDK().then((sdk) => sdk.getCurrentAccessToken());
  }

  /**
   * Retrieves the current ID token for the user, if logged in.
   */
  public getCurrentIdToken(): Promise<string | undefined> {
    return this.getSDK().then((sdk) => sdk.getCurrentIdToken());
  }

  /**
   * Retrieves the current refresh token for the user, if logged in.
   * Requires that the user has approved your application for offline access.
   */
  public getCurrentRefreshToken(): Promise<string> {
    return this.getSDK().then((sdk) => sdk.getCurrentRefreshToken());
  }

  /**
   * Register a callback to be called on sign out. This is a good practice,
   * since there may be situations where you are signed out unexpectedly.
   * @param fn Your callback function
   */
  public addSignOutHandler(fn: () => void): Promise<void> {
    return this.getSDK().then((sdk) => sdk.addSignOutHandler(fn));
  }

  /**
   * Remove a registered signout callback
   * @param fn Your callback function
   */
  public removeSignOutHandler(fn: () => void): Promise<void> {
    return this.getSDK().then((sdk) => sdk.removeSignOutHandler(fn));
  }

  /**
   * Sign the current user out of your application.
   */
  public signOut(): Promise<void> {
    return this.getSDK().then((sdk) => sdk.signOut());
  }

  private async getSDK(): Promise<BitskiSDK> {
    const sdk = await this.sdk;

    if (!sdk) {
      throw new Error('Bitski SDK not available');
    }

    return sdk;
  }
}

// Note: duplicated so we don't include the whole module
export const LOGIN_HINT_SIGNUP = 'signup';

function networkFromName(networkName: string): Network {
  switch (networkName) {
    case '':
    case 'mainnet':
      return Mainnet;
    case 'goerli':
      return Goerli;
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
