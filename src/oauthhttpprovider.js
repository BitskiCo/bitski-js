import XHR2 from 'xhr2';

import Oidc from 'oidc-client';

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.DEBUG;

/**
 * A class that extends Web3's HTTPProvider by adding OAuth to JSON-RPC calls
 * @class
 * @param {string} host - JSON-RPC endpoint
 * @param {number} timeout - Timeout in seconds
 * @param {Object} settings - settings object for configuring OAuth, see {@link InitializeWeb3}
 * @example
 * // Set up a new HTTPOAuthProvider
 * var settings = {
 *   authority: 'https://hydra.outtherelabs.com/',
 *   client_id: 'YOUR-CLIENT-ID',
 *   redirect_uri: 'https://exampledapp.co/',
 *   post_logout_redirect_uri: 'https://exampledapp.co',
 *   response_type: 'token id_token',
 *   scope: 'openid',
 *   popup_redirect_uri: 'https://exampledapp.co',
 *   popup_post_logout_redirect_uri: 'https://exampledapp.co',
 *   silent_redirect_uri: 'https://exampledapp.co',
 *   automaticSilentRenew: true,
 *   silentRequestTimeout: 10000,
 *   filterProtocolClaims: true,
 *   loadUserInfo: true
 * };
 * var provider = new OAuthHttpProvider('https://my-rpc-server.com', 1000, settings);
 */
var OAuthHttpProvider = function (host, timeout, settings) {
  this.host = host || 'http://localhost:8545';
  this.timeout = timeout || 0;

  var provider = this;

  var userManager = new Oidc.UserManager(settings);

  userManager.getUser().then(function (user) {
    if (typeof (user) === 'undefined' || user === null) {
      throw Error("Not signed in");
    }

    return user;
  }).catch(function (err) {
    if (err.toString() !== "Error: Not signed in") {
      throw err;
    }

    return new Oidc.UserManager().signinRedirectCallback();
  }).catch(function (err) {
    if (err.toString() !== "Error: No state in response" && err.toString() !== "Error: No matching state found in storage") {
      throw err;
    }
    return userManager.signinRedirect({ state: 'some data' });
  }).catch(function (err) {
    console.log("Error setting up Web3 OAuth", err);
    throw err;
  }).then(function(user){
    provider.headers = [{name: "Authorization", value: "Bearer " + user.access_token }]
  });

  this.userManager = userManager;
};

/**
 * Should be called to prepare new XMLHttpRequest
 *
 * @method prepareRequest
 * @memberof OAuthHttpProvider.prototype
 * @param {Boolean} async - true if request should be async
 * @return {XMLHttpRequest} object
 */
OAuthHttpProvider.prototype.prepareRequest = function (async) {
  var request;

  if (async) {
    request = new XHR2();
    request.timeout = this.timeout;
  } else {
    request = new XMLHttpRequest();
  }

  request.open('POST', this.host, async);
  if (this.user && this.password) {
    var auth = 'Basic ' + new Buffer(this.user + ':' + this.password).toString('base64');
    request.setRequestHeader('Authorization', auth);
  } request.setRequestHeader('Content-Type', 'application/json');
  if(this.headers) {
      this.headers.forEach(function(header) {
          request.setRequestHeader(header.name, header.value);
      });
  }
  return request;
};

/**
 * Should be called to make sync request.
 *
 * @method send
 * @memberof OAuthHttpProvider.prototype
 * @param {Object} payload
 * @return {Object} result
 */
OAuthHttpProvider.prototype.send = function (payload) {
  var request = this.prepareRequest(false);

  try {
    request.send(JSON.stringify(payload));
  } catch (error) {
    throw web3.errors.InvalidConnection(this.host);
  }

  var result = request.responseText;

  try {
    result = JSON.parse(result);
  } catch (e) {
    throw web3.errors.InvalidResponse(request.responseText);
  }

  return result;
};

/**
 * Should be used to make async request.
 *
 * @method sendAsync
 * @memberof OAuthHttpProvider.prototype
 * @param {Object} payload
 * @param {Function} callback - triggered on end with (err, result)
 */
OAuthHttpProvider.prototype.sendAsync = function (payload, callback) {
  var request = this.prepareRequest(true);

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.timeout !== 1) {
      var result = request.responseText;
      var error = null;

      try {
        result = JSON.parse(result);
      } catch (e) {
        error = web3.errors.InvalidResponse(request.responseText);
      }

      callback(error, result);
    }
  };

  request.ontimeout = function () {
    callback(web3.errors.ConnectionTimeout(this.timeout));
  };

  try {
    request.send(JSON.stringify(payload));
  } catch (error) {
    callback(web3.errors.InvalidConnection(this.host));
  }
};

/**
 * Returns connection status of provider.
 *
 * @method isConnected
 * @memberof OAuthHttpProvider.prototype
 * @return {Boolean} returns true if request haven't failed. Otherwise false
 */
OAuthHttpProvider.prototype.isConnected = function () {
  try {
    this.send({
      id: 9999999999,
      jsonrpc: '2.0',
      method: 'net_listening',
      params: []
    });
    return true;
  } catch (e) {
    return false;
  }
};

export default OAuthHttpProvider;
