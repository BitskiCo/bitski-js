import { User } from 'oidc-client';
import Web3 from 'web3';
import { BitskiProvider } from './bitski-provider';
import { OAuthProviderIntegrationType } from './oauth-http-provider';

/**
 * Initialize [Web3](https://github.com/ethereum/web3) with Bitski.
 * This will be ignored if a web3 object already exists.
 * @param clientId OAuth Client ID
 * @param networkName Web3 network name, defaults to 'kovan'
 * @param redirectUri Redirect URL, defaults to window.URL
 * @param postLogoutRedirectUri Post logout redirect URL, defaults to window.URL
 * @example
 * ```javascript
 * // Set up Web3 via Bitski
 * web3 = bitski.InitializeWeb3('YOUR-CLIENT-ID');
 * ```
 * @returns Web3 object configured for Bitski.
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

export class LoginButton {
    public element: HTMLButtonElement;
    public callback?: (web3: Web3, error?: Error, user?: User) => void;
    private provider: BitskiProvider;
    private web3Client: Web3;

    constructor(clientId: string, networkName: string = 'kovan') {
        this.element = document.createElement('button');

        this.setDefaultStyle();

        this.provider = new BitskiProvider(clientId, networkName);
        this.provider.authenticationIntegrationType = OAuthProviderIntegrationType.POPUP;

        this.web3Client = new Web3(this.provider);

        this.element.addEventListener('click', this.signin.bind(this));

        if (window.opener) {
            this.provider.userManager.signinPopupCallback();
        }
    }

    private signin() {
        this.provider.signIn().then((user: User) => {
            if (this.callback) {
                this.callback(this.web3Client, null, user);
            }
        }).catch((error: Error) => {
            if (this.callback) {
                this.callback(this.web3Client, error, null);
            }
        });
    }

    private setDefaultStyle() {
        this.element.style.width = '256px';
        this.element.style.height = '44px';
        this.element.title = 'Continue with Bitski';
        this.element.innerText = 'Continue with Bitski';
    }
}
