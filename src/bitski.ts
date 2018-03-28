import { User } from 'oidc-client';
import Web3 from 'web3';
import { ConnectButton } from './components/connect-button';
import { LoginButton } from './components/login-button';
import { BitskiProvider } from './providers/bitski-provider';
import { OAuthProviderIntegrationType } from './providers/oauth-http-provider';

/**
 * Deprecated, use new Bitski(...) instead
 */

export function InitializeWeb3(
    clientId: string,
    networkName: string = 'kovan',
    redirectUri?: string,
    postLogoutRedirectUri?: string,
) {
    const provider = new BitskiProvider(clientId, networkName, redirectUri, postLogoutRedirectUri);
    const web3Client = new Web3(provider);
    return web3Client;
}

/**
 * Bitski SDK
 */
export class Bitski {
    public provider: BitskiProvider;

    /**
     * @param clientId OAuth Client ID
     * @param networkName Web3 network name, defaults to 'kovan'
     * @param redirectUri Redirect URL, defaults to window.URL
     * @param postLogoutRedirectUri Post logout redirect URL, defaults to window.URL
     */
    constructor(
        clientId: string,
        networkName: string = 'kovan',
        redirectUri?: string,
        postLogoutRedirectUri?: string,
    ) {
        this.provider = new BitskiProvider(clientId, networkName, redirectUri, postLogoutRedirectUri);

        if (window.opener) {
            this.provider.userManager.signinPopupCallback();
        }
    }

    /**
     * Returns an initialized web3 API
     */
    public getWeb3(): Web3 {
        return new Web3(this.provider);
    }

    /**
     * @param existingDiv Existing element to turn into a Bitski connect button
     */
    public getConnectButton(existingDiv?: HTMLElement): ConnectButton {
        this.provider.authenticationIntegrationType = OAuthProviderIntegrationType.POPUP;
        return new ConnectButton(this.provider, existingDiv);
    }

    /**
     * Starts sign in flow.
     * @param type Optionally specify an integration type. Defaults to REDIRECT.
     */
    public signIn(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User> {
        this.provider.authenticationIntegrationType = authenticationIntegrationType || OAuthProviderIntegrationType.REDIRECT;
        return this.provider.signIn();
    }

    /**
     * Called from your oauth redirect page.
     * @param type Should match the method called when signing in.
     */
    public signInCallback(authenticationIntegrationType?: OAuthProviderIntegrationType): Promise<User> {
        return this.provider.signInCallback(authenticationIntegrationType);
    }
}
