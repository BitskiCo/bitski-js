import { Log, User, UserManager } from 'oidc-client';
import Web3 from 'web3';
import { ConnectButton, ConnectButtonSize } from './components/connect-button';
import { BitskiProvider } from './providers/bitski-provider';
import { BitskiProviderSettings } from './providers/bitski-provider-settings';
import { OAuthProviderIntegrationType } from './providers/oauth-http-provider';

const DEFAULT_BITSKI_OAUTH_HOST = 'https://account.bitski.com';

const DEFAULT_BITSKI_METADATA: {[key:string]: any;} = {
    issuer: 'https://account.bitski.com',
    authorization_endpoint: 'https://account.bitski.com/oauth2/auth',
    token_endpoint: 'https://account.bitski.com/oauth2/token',
    jwks_uri: 'https://account.bitski.com/.well-known/jwks.json',
    subject_types_supported: ['pairwise', 'public'],
    response_types_supported: ['code', 'code id_token', 'id_token', 'token id_token', 'token', 'token id_token code'],
    claims_supported: ['sub'],
    userinfo_endpoint: 'https://account.bitski.com/userinfo',
    scopes_supported: ['offline', 'openid'],
    token_endpoint_auth_methods_supported: ['client_secret_post', 'client_secret_basic'],
    id_token_signing_alg_values_supported: ['RS256'],
};

/**
 * Bitski SDK
 */
export class Bitski {
    public userManager: UserManager;
    private providers: Map<string, BitskiProvider>;
    private cachedUser?: User;
    private clientId: string;

    /**
     * @param clientId OAuth Client ID
     * @param redirectUri Redirect URL, defaults to window.URL
     * @param postLogoutRedirectUri Post logout redirect URL, defaults to window.URL
     * @param otherSettings Other OAuth settings. Don't change these unless you know what you are doing.
     */
    constructor(
        clientId: string,
        redirectUri?: string,
        postLogoutRedirectUri?: string,
        otherSettings?: object,
    ) {
        const settings = new BitskiProviderSettings(DEFAULT_BITSKI_OAUTH_HOST, clientId, redirectUri, postLogoutRedirectUri, DEFAULT_BITSKI_METADATA);

        if (otherSettings) {
            Object.assign(settings, otherSettings);
        }

        this.clientId = clientId;
        this.userManager = new UserManager(settings);

        this.userManager.events.addUserLoaded(this.didSetUser.bind(this));
        this.userManager.events.addUserSignedOut(this.didUnsetUser.bind(this));
        this.userManager.events.addAccessTokenExpired(this.didUnsetUser.bind(this));
        this.userManager.events.addSilentRenewError(this.didUnsetUser.bind(this));
        this.userManager.events.addUserUnloaded(this.didUnsetUser.bind(this));

        if (window.opener) {
            this.userManager.signinPopupCallback();
        }

        this.providers = new Map<string, BitskiProvider>();
    }

    /**
     * Returns a new web3 provider for a given network.
     * @param networkName The name of the network to use. Defaults to mainnet.
     */
    public getProvider(networkName?: string): BitskiProvider {
        const existingProvider = this.providers.get(networkName || 'mainnet');
        if (existingProvider) {
            return existingProvider;
        }

        const provider = new BitskiProvider(networkName || 'mainnet', this.userManager, [{name: 'X-Client-Id', value: this.clientId}]);
        if (this.cachedUser) {
            provider.didSignIn(this.cachedUser);
        }
        this.providers.set(networkName || 'mainnet', provider);
        if (this.cachedUser) {
            provider.didSignIn(this.cachedUser);
        }
        return provider;
    }

    /**
     * Returns an initialized web3 API
     * @param networkName optional name of network to use. Defaults to mainnet.
     */
    public getWeb3(networkName?: string): Web3 {
        const provider = this.getProvider(networkName);
        const web3 = new Web3(provider);
        web3.eth.getAccounts((error, accounts) => {
            if (accounts && !web3.eth.defaultAccount) {
                web3.eth.defaultAccount = accounts[0];
            } else if (error) {
                Log.info('Received an error while getting accounts');
                Log.error(error);
            }
        });
        return web3;
    }

    /**
     * Gets the current signed in user. Will return an error if we are not signed in.
     */
    public getUser(): Promise<User> {
        return this.userManager.getUser().then((user) => {
            if (user) {
                this.setUser(user);
            }
            return user;
        });
    }

    /**
     * Creates a sign in with bitski button to add to your app. If an HTML element is passed in as the
     * first parameter, it will automatically add it to the DOM inside that element. Make sure to add
     * a callback to get notified of login events.
     * @param existingDiv Existing element to turn into a Bitski connect button
     * @param size Size of button to generate. Defaults to medium.
     */
    public getConnectButton(existingDiv?: HTMLElement, size: ConnectButtonSize = ConnectButtonSize.MEDIUM): ConnectButton {
        return new ConnectButton(this, existingDiv, size);
    }

    /**
     * Starts sign in flow.
     * @param type Optionally specify an integration type. Defaults to REDIRECT.
     */
    public signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User> {
        let signInPromise: Promise<User>;
        let type: OAuthProviderIntegrationType;
        if (typeof authenticationIntegrationType !== 'undefined') {
            type = authenticationIntegrationType;
        } else {
            type = OAuthProviderIntegrationType.REDIRECT;
        }
        switch (type) {
        case 0:
            const invalidRequestPromise: Promise<User> = Promise.reject('iFrame sign-in not allowed with Bitski due to security issues. Please use popup method instead.');
            signInPromise = invalidRequestPromise;
            break;
        case OAuthProviderIntegrationType.REDIRECT:
            signInPromise = this.userManager.signinRedirect({ state: 'someData' });
            break;
        case OAuthProviderIntegrationType.POPUP:
            signInPromise = this.userManager.signinPopup({ state: 'someData' });
            break;
        default:
            signInPromise = this.userManager.signinSilent();
            break;
        }

        return signInPromise.then((user) => {
            this.setUser(user);
            return user;
        }).catch((error) => {
            this.providers.forEach((provider, _) => {
               provider.locked = true;
            });
            throw error;
        });
    }

    /**
     * Gets the current user if it exists. If not, signs in. Unlike `getUser` this will never return
     * an expired user or null.
     * @param authenticationIntegrationType Optionally specify an integration type. Defaults to REDIRECT.
     */
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

    /**
     * Called from your oauth redirect page.
     * @param authenticationIntegrationType Should match the method called when signing in.
     */
    public signInCallback(authenticationIntegrationType: OAuthProviderIntegrationType): Promise<User> {
        switch (authenticationIntegrationType) {
        case OAuthProviderIntegrationType.SILENT:
            return this.userManager.signinSilentCallback();
        default:
            return this.userManager.signinRedirectCallback();
        }
    }

    /**
     * Set logger and log level for debugging purposes
     * @param logger The logger to use (i.e. console). Must support methods info(), warn(), and error().
     * @param level The desired log level.
     * Use 0 for none (the default), 1 for errors, 2 for warnings, 3 for info, and 4 for debug.
     */
    public setLogger(logger: any, level?: number) {
        Log.logger = logger;
        if (level) {
            Log.level = level;
        }
    }

    /**
     * Pass logged in user to all providers
     * @param user User to send to cached providers
     */
    private setUser(user: User) {
        this.cachedUser = user;
        this.providers.forEach((provider, _) => {
            provider.didSignIn(user);
        });
    }

    /**
     * Callback received from UserManager when the user has been set.
     * Called in situations like access token refresh.
     * @param user the User object that was loaded
     */
    private didSetUser(user: User) {
        this.setUser(user);
    }

    /**
     * Callback received from UserManager when the user has been revoked.
     * Called in situations like access token expiration.
     */
    private didUnsetUser() {
        this.cachedUser = undefined;
        this.providers.forEach((provider, _) => {
            provider.locked = true;
        });
    }
}
