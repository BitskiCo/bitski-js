import { Log, UserManager, User } from 'oidc-client';

import 'xhr2';

Log.logger = console;
Log.level = Log.DEBUG;

import HttpProvider from 'web3-providers-http'
import {JsonRPCRequest, JsonRPCResponse} from 'web3-providers-http'

/**
 * A class that extends Web3's HTTPProvider by adding OAuth to JSON-RPC calls
 */
export class OAuthHttpProvider extends HttpProvider {
  userManager: UserManager;
  currentUser: User = null;
  host: string;
  /**
   * @param host JSON-RPC endpoint
   * @param timeout Timeout in seconds
   * @param settings settings object for configuring OAuth, see {@link InitializeWeb3}
   */
  constructor(host: string, timeout: number, settings: any) {
    super(host, timeout, []);

    var userManager = new UserManager(settings);
    var provider = this;

    userManager.getUser().then(function (user: User) {
      if (typeof (user) === 'undefined' || user === null) {
        throw Error("Not signed in");
      }

      return user;
    }).catch(function (err: any) {
      if (err.toString() !== "Error: Not signed in") {
        throw err;
      }

      return new UserManager(settings).signinRedirectCallback();
    }).catch(function (err: any) {
      if (err.toString() !== "Error: No state in response" && err.toString() !== "Error: No matching state found in storage") {
        throw err;
      }
      return userManager.signinRedirect({ state: 'some data' });
    }).catch(function (err: any) {
      console.log("Error setting up Web3 OAuth", err);
      throw err;
    }).then(function(user: User){
      provider.currentUser = user;
    });

    this.userManager = userManager;
    this.host = host;
  }

  private _prepareRequest(): XMLHttpRequest {
    var request = new XMLHttpRequest();
    request.open('POST', this.host, true);
    request.setRequestHeader('Content-Type','application/json');
    if (typeof (this.currentUser) !== 'undefined' && this.currentUser !== null) {
      request.setRequestHeader('Authorization', "Bearer " + this.currentUser.access_token);
    }
    return request
  }

  sendAsync(payload: JsonRPCRequest, callback: (e: Error, val: JsonRPCResponse) => void): void {
    return super.send(payload, callback)
  }
};
