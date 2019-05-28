import { AccessTokenProvider } from 'bitski-provider';
import { AuthenticationStatus, BitskiSDKOptions, OAuthSignInMethod } from '../bitski';
import { AuthProvider } from './auth-provider';
import { OAuthManager, OAuthManagerOptions } from './oauth-manager';
import { TokenStore } from './token-store';
import { User } from './user';
import { UserStore } from './user-store';

export class OpenidAuthProvider implements AccessTokenProvider, AuthProvider {

    public oauthManager: OAuthManager;
    public tokenStore: TokenStore;
    public userStore: UserStore;
    public signOutCallback?: () => void;

    constructor(clientId: string, redirectUri: string, additionalScopes?: string[], opts?: BitskiSDKOptions) {
        let settings: OAuthManagerOptions = {
            additionalScopes,
            clientId,
            redirectUri,
        };

        if (opts) {
            settings = Object.assign(settings, opts);
        }

        this.oauthManager = new OAuthManager(settings);
        this.tokenStore = new TokenStore(clientId);
        this.userStore = new UserStore(clientId);
    }

    public get authStatus(): AuthenticationStatus {
        if (this.tokenStore.currentToken) {
            return AuthenticationStatus.Connected;
        } else if (this.tokenStore.refreshToken) {
            return AuthenticationStatus.Expired;
        } else {
            return AuthenticationStatus.NotConnected;
        }
    }

    public getAccessToken(): Promise<string> {
        if (this.tokenStore.currentToken) {
            return Promise.resolve(this.tokenStore.currentToken);
        }
        if (this.tokenStore.refreshToken) {
            return this.refreshAccessToken();
        }
        return Promise.reject(new Error('Not signed in. Please sign in and try your request again.'));
    }

    public invalidateToken(): Promise<void> {
        if (this.tokenStore.currentToken) {
            this.tokenStore.invalidateCurrentToken();
        }
        if (this.signOutCallback) {
            this.signOutCallback();
        }
        return Promise.resolve();
    }

    public refreshAccessToken(): Promise<string> {
        if (this.tokenStore.refreshToken) {
            return this.oauthManager.refreshAccessToken(this.tokenStore.refreshToken).then((tokenResponse) => {
                this.tokenStore.persistTokenResponse(tokenResponse);
                return tokenResponse.accessToken;
            }).catch((error) => {
                // If we can't renew, we likely have bad data
                this.tokenStore.clear();
                this.userStore.clear();
                throw error;
            });
        }
        return Promise.reject(new Error('No refresh token available'));
    }

    public signIn(method: OAuthSignInMethod): Promise<User> {
        let promise: Promise<any>;
        switch (method) {
            case OAuthSignInMethod.Redirect:
                promise = this.oauthManager.signInRedirect();
                break;
            case OAuthSignInMethod.Silent:
                return Promise.reject(new Error('Silent is no longer supported'));
            default:
                promise = this.oauthManager.signInPopup();
                break;
        }

        return promise.then((tokenResponse) => {
            this.tokenStore.persistTokenResponse(tokenResponse);
            return this.loadUser();
        });
    }

    public connect(): Promise<User> {
        return this.refreshAccessToken().then(() => {
            return this.loadUser();
        });
    }

    public getUser(): Promise<User> {
        return this.getOrFetchUser();
    }

    public signInOrConnect(signInMethod: OAuthSignInMethod = OAuthSignInMethod.Popup): Promise<User> {
        switch (this.authStatus) {
        case AuthenticationStatus.Connected:
            return this.loadUser();
        case AuthenticationStatus.Expired:
            return this.connect().catch((err) => {
                // If refreshing fails, attempt to sign in
                return this.signIn(signInMethod);
            });
        case AuthenticationStatus.NotConnected:
            return this.signIn(signInMethod);
        }
    }

    public redirectCallback(): Promise<User> {
        return this.oauthManager.redirectCallback().then((tokenResponse) => {
            this.tokenStore.persistTokenResponse(tokenResponse);
            return this.loadUser();
        });
    }

    public signOut(): Promise<any> {
        this.tokenStore.clear();
        this.userStore.clear();
        // Call the sign out callback if one has been provided
        if (this.signOutCallback) {
            this.signOutCallback();
        }
        // We don't currently have the ability to invalidate access tokens, so for now simply resolve.
        // Down the road this may perform a network request to invalidate.
        return Promise.resolve();
    }

    private getOrFetchUser(): Promise<User> {
        const currentUser = this.userStore.currentUser;
        if (currentUser) {
            return Promise.resolve(currentUser);
        }
        return this.loadUser();
    }

    private loadUser(): Promise<User> {
        return this.getAccessToken().then((accessToken) => {
            return this.oauthManager.requestUserInfo(accessToken);
        }).then((json) => {
            return User.fromJson(json);
        }).then((user) => {
            this.userStore.set(user);
            return user;
        });
    }
}
