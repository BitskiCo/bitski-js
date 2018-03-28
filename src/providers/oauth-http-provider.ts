import { Log, User, UserManager, UserManagerSettings } from 'oidc-client';
import Web3 from 'web3';
import HttpProvider from 'web3-providers-http';
import { JsonRPCCallback, JsonRPCRequest, JsonRPCResponse } from 'web3-providers-http';
import 'xhr2';
import { Dialog } from '../components/dialog';

export enum OAuthProviderIntegrationType {
  IFRAME, // Not recommended for security reasons.
  REDIRECT,
  POPUP,
  SILENT,
}

/**
 * Force window.web3
 * We can delete this one we have defaultAccount set up better
 */
declare global {
  interface Window { web3?: Web3; }
}
window.web3 = window.web3 || undefined;

/**
 * A class that extends Web3's HTTPProvider by adding OAuth to JSON-RPC calls
 */
export class OAuthHttpProvider extends HttpProvider {
  /**
   * Instance user manager object.
   */
  public userManager: UserManager;

  /**
   * The current logged in `User`
   */
  public currentUser?: User = undefined;

  /**
   * Determines how the authentication modals show up.
   */
  public authenticationIntegrationType: OAuthProviderIntegrationType = OAuthProviderIntegrationType.REDIRECT;

  /**
   * The JSON-RPC endpoint
   */
  private host: string;

  /**
   * The configured authentication dialog
   */
  private authenticationDialog?: Dialog;

  /**
   * Object containing the OAuth settings. see {@link BitskiProviderSettings}
   * Cached sign in promise.
   */
  private settings: UserManagerSettings;

  /**
   * Cached sign in promise.
   */
  private currentSignInPromise?: Promise<User> = undefined;

  /**
   * @param host JSON-RPC endpoint
   * @param timeout Timeout in seconds
   * @param settings settings object for configuring OAuth, see {@link BitskiProviderSettings}
   */
  constructor(host: string, timeout: number, settings: UserManagerSettings) {
    super(host, timeout, []);

    this.userManager = new UserManager(settings);
    this.host = host;
    this.settings = settings;

    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  public receiveMessage(event: MessageEvent): void {
    const originURL = new URL(event.origin);
    const redirectURL = new URL(this.settings.redirect_uri || event.origin);

    if (originURL.hostname === redirectURL.hostname && this.currentUser === null) {
      this.didSignIn(event.data);
    }
  }

  /**
   * Sign in using the current settings.
   * @returns A promise for a user.
   */
  public signIn(): Promise<User> {
    if (this.currentSignInPromise) {
      return this.currentSignInPromise;
    }

    this.currentSignInPromise = this.userManager.getUser().then((user: User) => {
      if (typeof (user) === 'undefined' || user === null) {
        throw Error('Not signed in');
      }

      if (user.expired) {
        return this.userManager.signinSilent();
      }

      return user;
    }).catch((err: any) => {
      if (err.toString() === 'Error: Not signed in' && this.authenticationIntegrationType === OAuthProviderIntegrationType.REDIRECT) {
        return this.userManager.signinRedirect();
      }

      throw err;
    }).catch((err: any) => {
      const noResponseState = 'Error: No state in response';
      const noStorageState = 'Error: No matching state found in storage';
      const notSignedIn = 'Error: Not signed in';
      if (err.toString() !== noResponseState && err.toString() !== noStorageState && err.toString() !== notSignedIn) {
        throw err;
      }
      switch (this.authenticationIntegrationType) {
        case OAuthProviderIntegrationType.REDIRECT:
          return this.userManager.signinRedirect({ state: 'some data' });
        case OAuthProviderIntegrationType.IFRAME:
          return this.userManager.createSigninRequest().then((signInRequest) => {
            const iframe = document.createElement('iframe');
            iframe.width = '400px';
            iframe.height = '380px';
            iframe.src = signInRequest.url;
            iframe.frameBorder = '0';

            this.authenticationDialog = new Dialog(iframe);
          });
        case OAuthProviderIntegrationType.POPUP:
          return this.userManager.signinPopup({ state: 'some data' });
        case OAuthProviderIntegrationType.SILENT:
          return this.userManager.signinSilent();
      }
    }).then((user: User) => {
      const web3 = window.web3;
      if (web3) {
        web3.eth.getAccounts().then((accounts) => {
          if (!web3.eth.defaultAccount) {
            web3.eth.defaultAccount = accounts[0];
          }
          return user;
        });
      }

      return user;
    }).then((user: User) => {
      if (user) {
        this.didSignIn(user);
      }

      return user;
    });

    return this.currentSignInPromise;
  }

  public signInCallback(type?: OAuthProviderIntegrationType): Promise<User> {
    const resolvedType = type || this.authenticationIntegrationType;

    if (resolvedType === OAuthProviderIntegrationType.POPUP) {
      return this.userManager.signinPopupCallback();
    }

    return this.userManager.signinRedirectCallback();
  }

  public didSignIn(user: User): void {
    this.currentUser = user;

    if (window.parent !== window) {
      // We are in an IFRAME
      parent.postMessage(user, '*');
    }

    if (this.authenticationDialog) {
      this.authenticationDialog.dismiss();
    }

    this.currentSignInPromise = undefined;
  }

  /**
   * Prepares a new XMLHttpRequest with the proper headers
   * @returns Request object that is ready for a payload.
   */
  private _prepareRequest(): XMLHttpRequest {
    const request = new XMLHttpRequest();
    request.open('POST', this.host, true);
    request.setRequestHeader('Content-Type', 'application/json');
    if (typeof (this.currentUser) !== 'undefined' && this.currentUser !== null) {
      request.setRequestHeader('Authorization', `Bearer ${this.currentUser.access_token}`);
    }
    return request;
  }

  /**
   * Send a web3 / JSON-RPC request asynchronously.
   * @param payload The JSON-RPC request object to send
   * @param callback Handler function invoked when the request has completed.
   */
  private sendAsync(payload: JsonRPCRequest, callback: JsonRPCCallback): void {
    return this.send(payload, callback);
  }

}
