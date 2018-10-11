"use strict";
exports.__esModule = true;
var oidc_client_1 = require("oidc-client");
var auth_provider_1 = require("./auth-provider");
var BITSKI_USER_API_HOST = 'https://www.bitski.com/v1';
var OpenidAuthProvider = /** @class */ (function () {
    function OpenidAuthProvider(clientId, redirectUri, postLogoutRedirectUri, otherSettings) {
        this.timeout = 5000;
        var settings = {
            authority: 'https://account.bitski.com',
            client_id: clientId,
            post_logout_redirect_uri: postLogoutRedirectUri,
            redirect_uri: redirectUri,
            response_type: 'id_token token',
            scope: 'openid',
            popup_post_logout_redirect_uri: postLogoutRedirectUri,
            popup_redirect_uri: redirectUri,
            automaticSilentRenew: true,
            silent_redirect_uri: redirectUri,
            filterProtocolClaims: true,
            loadUserInfo: true
        };
        if (otherSettings) {
            Object.assign(settings, otherSettings);
        }
        this.userManager = new oidc_client_1.UserManager(settings);
    }
    OpenidAuthProvider.prototype.getAccessToken = function () {
        return this.getUser().then(function (user) {
            if (user) {
                return user.access_token;
            }
            else {
                throw new Error('Not signed in');
            }
        });
    };
    OpenidAuthProvider.prototype.signIn = function (authenticationIntegrationType) {
        var signInAuthenticationIntegrationType = auth_provider_1.OAuthProviderIntegrationType.REDIRECT;
        if (authenticationIntegrationType !== undefined && authenticationIntegrationType != null) {
            signInAuthenticationIntegrationType = authenticationIntegrationType;
        }
        switch (signInAuthenticationIntegrationType) {
            default:
                return Promise.reject(new Error('iFrame sign-in not allowed with Bitski due to security issues. Please use popup method instead.'));
            case auth_provider_1.OAuthProviderIntegrationType.REDIRECT:
                return this.userManager.signinRedirect({ state: 'someData' });
            case auth_provider_1.OAuthProviderIntegrationType.POPUP:
                return this.userManager.signinPopup({ state: 'someData' });
            case auth_provider_1.OAuthProviderIntegrationType.SILENT:
                return this.userManager.signinSilent({ state: 'someData' });
        }
    };
    OpenidAuthProvider.prototype.getUser = function () {
        return this.userManager.getUser();
    };
    OpenidAuthProvider.prototype.getUserOrSignIn = function (authenticationIntegrationType) {
        var _this = this;
        return this.getUser().then(function (user) {
            if (user && !user.expired) {
                return user;
            }
            return _this.signIn(authenticationIntegrationType);
        })["catch"](function (error) {
            return _this.signIn(authenticationIntegrationType);
        });
    };
    OpenidAuthProvider.prototype.signInCallback = function (authenticationIntegrationType) {
        var signInAuthenticationIntegrationType = auth_provider_1.OAuthProviderIntegrationType.REDIRECT;
        if (authenticationIntegrationType !== undefined && authenticationIntegrationType != null) {
            signInAuthenticationIntegrationType = authenticationIntegrationType;
        }
        switch (signInAuthenticationIntegrationType) {
            default:
                return Promise.reject(new Error('iFrame sign-in not allowed with Bitski due to security issues. Please use popup method instead.'));
            case auth_provider_1.OAuthProviderIntegrationType.REDIRECT:
                return this.userManager.signinRedirectCallback();
            case auth_provider_1.OAuthProviderIntegrationType.POPUP:
                return this.userManager.signinPopupCallback();
            case auth_provider_1.OAuthProviderIntegrationType.SILENT:
                return this.userManager.signinSilentCallback();
        }
    };
    OpenidAuthProvider.prototype.signOut = function () {
        var _this = this;
        return this.userManager.getUser().then(function (user) {
            if (user) {
                return _this.requestSignOut(user.access_token);
            }
            else {
                return Promise.resolve();
            }
        });
    };
    OpenidAuthProvider.prototype.requestSignOut = function (accessToken) {
        var request = new XMLHttpRequest();
        request.open('POST', BITSKI_USER_API_HOST + "/logout", true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Authorization', "Bearer " + accessToken);
        request.timeout = this.timeout;
        return this.sendRequest(request);
    };
    OpenidAuthProvider.prototype.sendRequest = function (request) {
        return new Promise(function (fulfill, reject) {
            request.onload = function () {
                if (request.status >= 200 && request.status <= 299) {
                    return fulfill(request.responseText);
                }
                else {
                    var result = void 0;
                    try {
                        result = JSON.parse(request.responseText);
                    }
                    catch (error) {
                        return reject(new Error('Unknown error. Could not parse error response.'));
                    }
                    if (result && result.error && result.error.message) {
                        return reject(new Error(result.error.message));
                    }
                    else if (result && result.error) {
                        return reject(new Error(result.error));
                    }
                    else {
                        return reject(new Error('Unknown error.'));
                    }
                }
            };
            request.ontimeout = function () {
                return reject(new Error('Connection timed out.'));
            };
            request.send();
        });
    };
    return OpenidAuthProvider;
}());
exports.OpenidAuthProvider = OpenidAuthProvider;
