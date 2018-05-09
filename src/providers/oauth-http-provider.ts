import Web3 from 'web3';
import HttpProvider from 'web3-providers-http';
import { JsonRPCCallback, JsonRPCRequest, JsonRPCResponse } from 'web3-providers-http';
import 'xhr2';
import { AccessToken } from '../access-token';

export enum OAuthProviderIntegrationType {
  IFRAME,
  REDIRECT,
  POPUP,
  SILENT,
}

/**
 * A class that extends Web3's HTTPProvider by adding OAuth to JSON-RPC calls.
 */
export class OAuthHttpProvider extends HttpProvider {
  /**
   * The access token for the current logged in user
   */
  public accessToken?: AccessToken = undefined;

  /**
   * The JSON-RPC endpoint
   */
  private host: string;

  /**
   * @param host JSON-RPC endpoint
   * @param timeout Timeout in seconds
   * @param additionalHeaders Optional headers to include with every request
   */
  constructor(host: string, timeout: number, additionalHeaders?: [any]) {
    super(host, timeout, additionalHeaders);
    this.host = host;
  }

  public setAccessToken(accessToken?: AccessToken): void {
    this.accessToken = accessToken;
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
   * Does not require an access token for every request, but adds one if available.
   * @returns Request object that is ready for a payload.
   */
  public _prepareRequest(): XMLHttpRequest {
    const request = new XMLHttpRequest();
    request.open('POST', this.host, true);
    request.setRequestHeader('Content-Type', 'application/json');

    const headers = this.headers;
    if (headers) {
      headers.forEach((header) => {
        request.setRequestHeader(header.name, header.value);
      });
    }

    if (this.accessToken && !this.accessToken.expired) {
      request.setRequestHeader('Authorization', `Bearer ${this.accessToken.token}`);
    }

    return request;
  }
}
