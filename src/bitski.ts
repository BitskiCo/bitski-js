import { Log, User, UserManager } from 'oidc-client';
import Web3 from 'web3';
import { ConnectButton } from './components/connect-button';
import { BitskiProvider } from './providers/bitski-provider';
import { BitskiProviderSettings } from './providers/bitski-provider-settings';
import { OAuthProviderIntegrationType } from './providers/oauth-http-provider';

const BITSKI_OAUTH_HOST = 'https://account.bitski.com';

/**
 * Bitski SDK
 */
export class Bitski {
    public userManager: UserManager;
    private providers: Map<string, BitskiProvider>;

    /**
     * @param clientId OAuth Client ID
     * @param networkName Web3 network name, defaults to 'kovan'
     * @param redirectUri Redirect URL, defaults to window.URL
     * @param postLogoutRedirectUri Post logout redirect URL, defaults to window.URL
     */
    constructor(
        clientId: string,
        redirectUri?: string,
        postLogoutRedirectUri?: string,
    ) {
        const settings = new BitskiProviderSettings(BITSKI_OAUTH_HOST, clientId, redirectUri, postLogoutRedirectUri);
        this.userManager = new UserManager(settings);

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

        const provider = new BitskiProvider(networkName || 'mainnet', this.userManager);
        this.providers.set(networkName || 'mainnet', provider);
        return provider;
    }

    /**
     * Returns an initialized web3 API
     */
    public getWeb3(networkName?: string): Web3 {
        const provider = this.getProvider(networkName);
        return new Web3(provider);
    }

    /**
     * Gets the current signed in user. Will return an error if we are not sigend in.
     */
    public getUser(): Promise<User> {
        return this.userManager.getUser().then((user) => {
            if (user) {
                this.providers.forEach((provider, _) => {
                    provider.didSignIn(user);
                });
            }
            return user;
        });
    }

    /**
     * @param existingDiv Existing element to turn into a Bitski connect button
     */
    public getConnectButton(existingDiv?: HTMLElement, networkName?: string): ConnectButton {
        const provider = this.getProvider(networkName);
        return new ConnectButton(provider, existingDiv);
    }

    /**
     * Starts sign in flow.
     * @param type Optionally specify an integration type. Defaults to REDIRECT.
     */
    public signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User> {
        let signInPromise: Promise<User>;
        const type: OAuthProviderIntegrationType = authenticationIntegrationType || OAuthProviderIntegrationType.REDIRECT;
        switch (type) {
            case 0:
                const invalidRequestPromise: Promise<User> = Promise.reject("Can'd do this, not secure...");
                signInPromise = invalidRequestPromise;
            case OAuthProviderIntegrationType.REDIRECT:
                signInPromise = this.userManager.signinRedirect({ state: 'someData' });
            case OAuthProviderIntegrationType.POPUP:
                signInPromise = this.userManager.signinPopup({ state: 'someData' });
            default:
                signInPromise = this.userManager.signinSilent();
        }

        return signInPromise.then((user) => {
            this.providers.forEach((provider, _) => {
                provider.didSignIn(user);
            });

            return user;
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

            return this.signIn();
        }).catch((error) => {
            return this.signIn();
        });
    }

    /**
     * Called from your oauth redirect page.
     * @param type Should match the method called when signing in.
     */
    public signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User> {
        return this.signInCallback(authenticationIntegrationType);
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
}
