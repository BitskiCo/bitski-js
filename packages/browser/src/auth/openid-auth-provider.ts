import { AccessTokenProvider } from 'bitski-provider';
import { User, UserManager, WebStorageStateStore } from 'oidc-client';
import { AuthenticationStatus } from '../bitski';
import { AuthProvider, OAuthSignInMethod } from './auth-provider';

const BITSKI_USER_API_HOST = 'https://www.bitski.com/v1';
const BITSKI_IS_SIGNED_IN_KEY = 'bitski.isSignedIn';

const DEFAULT_SETTINGS = {
    authority: 'https://account.bitski.com',
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    includeIdTokenInSilentRenew: false,
    loadUserInfo: true,
    response_type: 'id_token token',
    scope: 'openid',
    userStore: new WebStorageStateStore({ store: localStorage }),
};

export class OpenidAuthProvider implements AccessTokenProvider, AuthProvider {

    public timeout: number = 5000;
    public userManager: UserManager;

    private get hasSignedIn(): boolean {
        if (localStorage) {
            return localStorage.getItem(BITSKI_IS_SIGNED_IN_KEY) === 'true';
        }
        return false;
    }

    private set hasSignedIn(newValue: boolean) {
        if (localStorage) {
            if (newValue) {
                localStorage.setItem(BITSKI_IS_SIGNED_IN_KEY, 'true');
            } else {
                localStorage.removeItem(BITSKI_IS_SIGNED_IN_KEY);
            }
        }
    }

    private get canUseSilentLogin(): boolean {
        // best we can do for now is see if the browser exposes the storage access API
        if ('hasStorageAccess' in document) {
            return false;
        }
        return true;
    }

    constructor(clientId: string, redirectUri: string, opts?: any) {
        let settings: any = {
            client_id: clientId,
            popup_redirect_uri: redirectUri,
            redirect_uri: redirectUri,
            silent_redirect_uri: redirectUri,
        };

        settings = Object.assign(settings, DEFAULT_SETTINGS);

        // disable automatic renew for newer versions of Safari
        settings.automaticSilentRenew = this.canUseSilentLogin;

        if (opts) {
            settings = Object.assign(settings, opts);
        }

        this.userManager = new UserManager(settings);
    }

    public getAccessToken(): Promise<string> {
        return this.getUser().then((user) => {
            if (user && !user.expired) {
                return user.access_token;
            } else {
                throw new Error('Not signed in');
            }
        });
    }

    public getAuthStatus(): Promise<AuthenticationStatus> {
        return this.userManager.getUser().then((user) => {
            if (user && !user.expired) {
                return AuthenticationStatus.Connected;
            } else if (this.hasSignedIn) {
                return AuthenticationStatus.Expired;
            } else {
                return AuthenticationStatus.NotConnected;
            }
        });
    }

    public signIn(method: OAuthSignInMethod, opts?: any): Promise<User> {
        let options = {
            state: 'someData',
        };
        options = Object.assign({}, options, opts);
        let promise: Promise<User>;
        switch (method) {
            case OAuthSignInMethod.Redirect:
                promise = this.userManager.signinRedirect(options);
                break;
            case OAuthSignInMethod.Silent:
                promise = this.userManager.signinSilent(options);
                break;
            default:
                promise = this.userManager.signinPopup(options);
                break;
        }

        return promise.then((user) => {
            if (user) {
                this.hasSignedIn = true;
            }
            return user;
        });
    }

    public getUser(): Promise<User> {
        return this.userManager.getUser();
    }

    public signInOrConnect(signInMethod?: OAuthSignInMethod): Promise<User> {
        return this.getAuthStatus().then((authStatus) => {
            const method = signInMethod || OAuthSignInMethod.Popup;
            switch (authStatus) {
            case AuthenticationStatus.Connected:
                return this.userManager.getUser();
            case AuthenticationStatus.Expired:
                if (this.canUseSilentLogin) {
                    return this.signIn(OAuthSignInMethod.Silent).catch(() => {
                        return this.signIn(method);
                    }).catch((err) => {
                        this.hasSignedIn = false;
                        throw err;
                    });
                } else {
                    return this.signIn(method);
                }
            case AuthenticationStatus.NotConnected:
                return this.signIn(method);
           }
        });
    }

    public signInCallback(method: OAuthSignInMethod, url?: string): Promise<User> {
        switch (method) {
        case OAuthSignInMethod.Redirect:
            return this.userManager.signinRedirectCallback(url || window.location.href).then((user) => {
                // the redirect flow does not complete the sign in promise
                this.hasSignedIn = true;
                return user;
            });
        case OAuthSignInMethod.Popup:
            return this.userManager.signinPopupCallback(url || window.location.href);
        case OAuthSignInMethod.Silent:
            return this.userManager.signinSilentCallback(url || window.location.href);
        }
    }

    public signOut(): Promise<any> {
        this.hasSignedIn = false;

        return this.userManager.getUser().then((user) => {
            if (user) {
                this.userManager.removeUser();
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
