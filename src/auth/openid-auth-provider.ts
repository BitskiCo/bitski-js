import { User, UserManager } from 'oidc-client';
import { AuthProvider, OAuthProviderIntegrationType } from './auth-provider';

const BITSKI_USER_API_HOST = 'https://www.bitski.com/v1';

export class OpenidAuthProvider implements AuthProvider {
    public timeout: number = 5000;

    public userManager: UserManager;

    constructor(clientId: string, redirectUri?: string, postLogoutRedirectUri?: string, otherSettings?: object) {
        const settings = {
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
            loadUserInfo: true,
        };

        if (otherSettings) {
            Object.assign(settings, otherSettings);
        }

        this.userManager = new UserManager(settings);
    }

    public getAccessToken(): Promise<string> {
        return this.getUser().then((user) => {
            if (user) {
                return user.access_token;
            } else {
                throw new Error('Not signed in');
            }
        });
    }

    public signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User> {
        let signInAuthenticationIntegrationType = OAuthProviderIntegrationType.REDIRECT;
        if (authenticationIntegrationType !== undefined && authenticationIntegrationType != null) {
            signInAuthenticationIntegrationType = authenticationIntegrationType;
        }

        switch (signInAuthenticationIntegrationType) {
            default:
                return Promise.reject(new Error('iFrame sign-in not allowed with Bitski due to security issues. Please use popup method instead.'));
            case OAuthProviderIntegrationType.REDIRECT:
                return this.userManager.signinRedirect({ state: 'someData' });
            case OAuthProviderIntegrationType.POPUP:
                return this.userManager.signinPopup({ state: 'someData' });
            case OAuthProviderIntegrationType.SILENT:
                return this.userManager.signinSilent({ state: 'someData' });
        }
    }

    public getUser(): Promise<User> {
        return this.userManager.getUser();
    }

    public getUserOrSignIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User> {
        return this.getUser().then((user) => {
            if (user && !user.expired) {
              return user;
            }
            return this.signIn(authenticationIntegrationType);
          }).catch((error) => {
            return this.signIn(authenticationIntegrationType);
          });
    }

    public signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User> {
        let signInAuthenticationIntegrationType = OAuthProviderIntegrationType.REDIRECT;
        if (window.opener) {
            signInAuthenticationIntegrationType = OAuthProviderIntegrationType.POPUP;
        }

        if (authenticationIntegrationType !== undefined && authenticationIntegrationType != null) {
            signInAuthenticationIntegrationType = authenticationIntegrationType;
        }

        switch (signInAuthenticationIntegrationType) {
            default:
                return Promise.reject(new Error('iFrame sign-in not allowed with Bitski due to security issues. Please use popup method instead.'));
            case OAuthProviderIntegrationType.REDIRECT:
                return this.userManager.signinRedirectCallback();
            case OAuthProviderIntegrationType.POPUP:
                return this.userManager.signinPopupCallback();
            case OAuthProviderIntegrationType.SILENT:
                return this.userManager.signinSilentCallback();
        }
    }

    public signOut(): Promise<any> {
        return this.userManager.getUser().then((user) => {
            if (user) {
                return this.requestSignOut(user.access_token);
            } else {
                return Promise.resolve();
            }
        });
    }

    private requestSignOut(accessToken: string): Promise<any> {
        const request = new XMLHttpRequest();
        request.open('POST', `${BITSKI_USER_API_HOST}/logout`, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
        request.timeout = this.timeout;
        return this.sendRequest(request);
    }

    private sendRequest(request): Promise<any> {
        return new Promise((fulfill, reject) => {
            request.onload = () => {
                if (request.status >= 200 && request.status <= 299) {
                    return fulfill(request.responseText);
                } else {
                    let result;
                    try {
                        result = JSON.parse(request.responseText);
                    } catch (error) {
                        return reject(new Error('Unknown error. Could not parse error response.'));
                    }
                    if (result && result.error && result.error.message) {
                        return reject(new Error(result.error.message));
                    } else if (result && result.error) {
                        return reject(new Error(result.error));
                    } else {
                        return reject(new Error('Unknown error.'));
                    }
                }
            };
            request.ontimeout = () => {
                return reject(new Error('Connection timed out.'));
            };
            request.send();
        });
    }
}
