import { User, UserManager } from 'oidc-client';
import Web3 from 'web3';
import { ConnectButton } from './components/connect-button';
import { BitskiProvider } from './providers/bitski-provider';
import { OAuthProviderIntegrationType } from './providers/oauth-http-provider';
import { BitskiProviderSettings } from './providers/bitski-provider-settings';

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
        let existingProvider = this.providers.get(networkName || 'mainnet');
        if (existingProvider) {
            return existingProvider;
        }

        let provider = new BitskiProvider(networkName || 'mainnet', this.userManager);
        this.providers.set(networkName || 'mainnet', provider);
        return provider;
    }

    /**
     * Returns an initialized web3 API
     */
    public getWeb3(networkName?: string): Web3 {
        let provider = this.getProvider(networkName);
        return new Web3(provider);
    }

    /**
     * Gets the current signed in user. Will return an error if we are not sigend in.
     */
    public getUser(): Promise<User> {
        return this.userManager.getUser();
    }

    /**
     * @param existingDiv Existing element to turn into a Bitski connect button
     */
    public getConnectButton(existingDiv?: HTMLElement, networkName?: string): ConnectButton {
        let provider = this.getProvider(networkName);
        return new ConnectButton(provider, existingDiv);
    }

    /**
     * Starts sign in flow.
     * @param type Optionally specify an integration type. Defaults to REDIRECT.
     */
    public signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User> {
        var signInPromise: Promise<User>;
        var type: OAuthProviderIntegrationType = authenticationIntegrationType || OAuthProviderIntegrationType.REDIRECT;
        switch (type) {
            case 0:
                const invalidRequestPromise: Promise<User> = Promise.reject("Can'd do this, not secure...");
                signInPromise = invalidRequestPromise;
            case OAuthProviderIntegrationType.REDIRECT:
                signInPromise = this.userManager.signinRedirect({'state': 'someData'});
            case OAuthProviderIntegrationType.POPUP:
                signInPromise = this.userManager.signinPopup({'state': 'someData'});
            default:
                signInPromise = this.userManager.signinSilent();
        }
        
        return signInPromise.then((user) => {
            this.providers.forEach((provider, _) => {
                provider.currentUser = user;
            });

            return user;
        });
    }

    /**
     * Called from your oauth redirect page.
     * @param type Should match the method called when signing in.
     */
    public signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User> {
        return this.signInCallback(authenticationIntegrationType);
    }
}
