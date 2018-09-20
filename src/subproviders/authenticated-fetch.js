"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var retry = require("async/retry");
var FetchSubprovider = require("web3-provider-engine/subproviders/fetch");
var createPayload = require("web3-provider-engine/util/create-payload");
var RETRIABLE_ERRORS = [
    // ignore server overload errors
    'Gateway timeout',
    'ETIMEDOUT',
    // ignore server sent html error pages
    // or truncated json responses
    'SyntaxError',
];
var AUTHENTICATED_METHODS = [
    "eth_accounts",
    "eth_sendTransaction",
    "eth_sign",
];
function isErrorRetriable(err) {
    var errMsg = err.toString();
    return RETRIABLE_ERRORS.some(function (phrase) { return errMsg.includes(phrase); });
}
var AuthenticatedFetchSubprovider = /** @class */ (function (_super) {
    __extends(AuthenticatedFetchSubprovider, _super);
    function AuthenticatedFetchSubprovider(rpcUrl, debug, authProvider, defaultHeaders) {
        if (defaultHeaders === void 0) { defaultHeaders = {}; }
        var _this = _super.call(this, { rpcUrl: rpcUrl, debug: debug }) || this;
        _this.authProvider = authProvider;
        _this.defaultHeaders = defaultHeaders;
        return _this;
    }
    AuthenticatedFetchSubprovider.prototype.handleRequest = function (payload, next, end) {
        if (this.requiresAuthentication(payload)) {
            return this.handleAthenticatedRequest(payload, next, end);
        }
        else {
            return this.handleUnauthenticatedRequest(payload, next, end);
        }
    };
    AuthenticatedFetchSubprovider.prototype.handleAthenticatedRequest = function (payload, next, end) {
        var _this = this;
        this.authProvider.getAccessToken().then(function (accessToken) {
            var parameters = _this.generateParameters(payload, accessToken);
            return _this.sendRequest(parameters, next, end);
        })["catch"](function (error) {
            end(error);
        });
    };
    AuthenticatedFetchSubprovider.prototype.handleUnauthenticatedRequest = function (payload, next, end) {
        var parameters = this.generateParameters(payload);
        return this.sendRequest(parameters, next, end);
    };
    AuthenticatedFetchSubprovider.prototype.requiresAuthentication = function (payload) {
        return AUTHENTICATED_METHODS.some(function (method) { return (payload['method'] === method); });
    };
    AuthenticatedFetchSubprovider.prototype.generateParameters = function (payload, accessToken) {
        var self = this;
        // overwrite id to not conflict with other concurrent users
        var newPayload = createPayload(payload);
        // remove extra parameter from request
        delete newPayload.origin;
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        Object.assign(headers, this.defaultHeaders);
        var originDomain = payload['origin'];
        if (_super.prototype.originHttpHeaderKey && originDomain) {
            headers[_super.prototype.originHttpHeaderKey] = originDomain;
        }
        if (accessToken) {
            headers['Authorization'] = "Bearer " + accessToken;
        }
        var requestParameters = {
            body: JSON.stringify(newPayload),
            headers: headers,
            method: 'POST'
        };
        return requestParameters;
    };
    AuthenticatedFetchSubprovider.prototype.sendRequest = function (parameters, next, end) {
        var _this = this;
        retry({
            errorFilter: isErrorRetriable,
            interval: 1000,
            times: 5
        }, function (cb) { return _super.prototype._submitRequest.call(_this, parameters, cb); }, function (err, result) {
            // ends on retriable error
            if (err && isErrorRetriable(err)) {
                var errMsg = "FetchSubprovider - cannot complete request. All retries exhausted.\nOriginal Error:\n" + err.toString() + "\n\n";
                var retriesExhaustedErr = new Error(errMsg);
                return end(retriesExhaustedErr);
            }
            // otherwise continue normally
            return end(err, result);
        });
    };
    return AuthenticatedFetchSubprovider;
}(FetchSubprovider));
exports.AuthenticatedFetchSubprovider = AuthenticatedFetchSubprovider;
