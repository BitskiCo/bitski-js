import { Log, UserManager, User, UserManagerSettings } from 'oidc-client';
import { Dialog } from './dialog';

import 'xhr2';

Log.logger = console;
Log.level = Log.DEBUG;

import HttpProvider from 'web3-providers-http'
import { JsonRPCRequest, JsonRPCResponse } from 'web3-providers-http'

export enum OAuthProviderIntegrationType {
  IFRAME,
  REDIRECT,
}

/**
 * A class that extends Web3's HTTPProvider by adding OAuth to JSON-RPC calls
 */
export class OAuthHttpProvider extends HttpProvider {
  /**
   * Instance user manager object.
   */
  userManager: UserManager;
  /**
   * The current logged in `User`
   */
  currentUser: User = null;
  /**
   * The JSON-RPC endpoint
   */
  host: string;

  public integrationType: OAuthProviderIntegrationType = OAuthProviderIntegrationType.IFRAME;
  private authenticationDialog?: Dialog;

  /**
   * Object containing the OAuth settings. see {@link BitskiProviderSettings}
   * Cached sign in promise.
   */
  settings: UserManagerSettings;

  /**
   * Cached sign in promise.
   */
  private currentSignInPromise: Promise<User> = null;

  /**
   * @param host JSON-RPC endpoint
   * @param timeout Timeout in seconds
   * @param settings settings object for configuring OAuth, see {@link BitskiProviderSettings}
   */
  constructor(host: string, timeout: number, settings: UserManagerSettings) {
    super(host, timeout, []);

    var userManager = new UserManager(settings);

    this.userManager = userManager;
    this.host = host;
    this.settings = settings;

    var provider = this;
    window.addEventListener("message", function (event: MessageEvent) {
      provider.receiveMessage(event);
    }, false);
  }

  receiveMessage(event: MessageEvent): void {
    console.log("Received message: " + JSON.stringify(event));

    var originURL = new URL(event.origin);
    var redirectURL = new URL(this.settings.redirect_uri);

    if (originURL.hostname === redirectURL.hostname && this.currentUser == null) {
      this.didSignIn(event.data);
    }
  }

  /**
   * Sign in using the current settings.
   * @returns A promise for a user.
   */
  signIn(): Promise<User> {
    if (this.currentSignInPromise) {
      return this.currentSignInPromise;
    }

    var provider = this;

    this.currentSignInPromise = this.userManager.getUser().then(function (user: User) {
      if (typeof (user) === 'undefined' || user === null) {
        throw Error("Not signed in");
      }

      if (user.expired) {
        // TODO: We should attempt to refresh the token here.
        throw Error("Not signed in");
      }

      return user;
    }).catch(function (err: any) {
      if (err.toString() !== "Error: Not signed in") {
        throw err;
      }

      return provider.userManager.signinRedirectCallback();
    }).catch(function (err: any) {
      if (err.toString() !== "Error: No state in response" && err.toString() !== "Error: No matching state found in storage") {
        throw err;
      }
      switch (provider.integrationType) {
        case OAuthProviderIntegrationType.REDIRECT:
          return provider.userManager.signinRedirect({ state: 'some data' });
        case OAuthProviderIntegrationType.IFRAME:
          return provider.userManager.createSigninRequest().then(function (signInRequest) {
            var iframe = document.createElement("iframe");
            iframe.width = "360px";
            iframe.height = "340px";
            iframe.src = signInRequest.url;
            iframe.frameBorder = "0";

            provider.authenticationDialog = new Dialog(iframe);
          });
      }
    }).catch(function (err: any) {
      console.log("Error setting up Web3 OAuth", err);
      throw err;
    }).then(function (user: User) {
      if (user) {
        provider.didSignIn(user);
      }

      return user;
    });

    return this.currentSignInPromise;
  }

  didSignIn(user: User): void {
    this.currentUser = user;

    parent.postMessage(user, "*");

    if (this.authenticationDialog) {
      this.authenticationDialog.dismiss();
    }
  }
  /**
   * Prepares a new XMLHttpRequest with the proper headers
   * @returns Request object that is ready for a payload.
   */
  private _prepareRequest(): XMLHttpRequest {
    var request = new XMLHttpRequest();
    request.open('POST', this.host, true);
    request.setRequestHeader('Content-Type', 'application/json');
    if (typeof (this.currentUser) !== 'undefined' && this.currentUser !== null) {
      request.setRequestHeader('Authorization', "Bearer " + this.currentUser.access_token);
    }
    return request
  }
  /**
   * Send a web3 / JSON-RPC request asynchronously.
   * @param payload The JSON-RPC request object to send
   * @param callback Handler function invoked when the request has completed.
   */
  sendAsync(payload: JsonRPCRequest, callback: (e: Error, val: JsonRPCResponse) => void): void {
    return this.send(payload, callback)
  }
};
