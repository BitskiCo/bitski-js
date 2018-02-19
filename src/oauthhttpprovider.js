var XHR2 = require('xhr2');

import Oidc from 'oidc-client';

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.DEBUG;

/**
 * OAuthHttpProvider should be used to send rpc calls over http
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
 * @param {Boolean} true if request should be async
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
 * Should be called to make sync request
 *
 * @method send
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
 * Should be used to make async request
 *
 * @method sendAsync
 * @param {Object} payload
 * @param {Function} callback triggered on end with (err, result)
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
 * Synchronously tries to make Http request
 *
 * @method isConnected
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