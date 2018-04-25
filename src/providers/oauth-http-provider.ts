import { Log, User, UserManager, UserManagerSettings } from 'oidc-client';
import Web3 from 'web3';
import HttpProvider from 'web3-providers-http';
import { JsonRPCCallback, JsonRPCRequest, JsonRPCResponse } from 'web3-providers-http';
import 'xhr2';
import { Dialog } from '../components/dialog';

export enum OAuthProviderIntegrationType {
  IFRAME,
  REDIRECT,
  POPUP,
  SILENT,
}

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
   * The JSON-RPC endpoint
   */
  private host: string;

  /**
   * @param host JSON-RPC endpoint
   * @param timeout Timeout in seconds
   */
  constructor(host: string, timeout: number, userManager: UserManager) {
    super(host, timeout, []);

    this.userManager = userManager;
    this.host = host;
  }

  public didSignIn(user: User): void {
    this.currentUser = user;

    if (user) {
      if (this.isInFrame() === true) {
        // We are in an IFRAME
        parent.postMessage(user, '*');
      }
    }
  }

  public isInFrame(): boolean {
    return window.parent !== window;
  }

  /**
   * Send a web3 / JSON-RPC request asynchronously.
   * @param payload The JSON-RPC request object to send
   * @param callback Handler function invoked when the request has completed.
   */
  public sendAsync(payload: JsonRPCRequest, callback: JsonRPCCallback): void {
    return this.send(payload, callback);
  }

  /**
   * Check whether we are connected to the server.
   * @returns boolean if we are connected.
   */
  public isConnected(): boolean {
    return true;
  }

  /**
   * Prepares a new XMLHttpRequest with the proper headers
   * @returns Request object that is ready for a payload.
   */
  public _prepareRequest(): XMLHttpRequest {
    const request = new XMLHttpRequest();
    request.open('POST', this.host, true);
    request.setRequestHeader('Content-Type', 'application/json');
    if (typeof (this.currentUser) !== 'undefined' && this.currentUser !== null) {
      request.setRequestHeader('Authorization', `Bearer ${this.currentUser.access_token}`);
    }
    return request;
  }
}
