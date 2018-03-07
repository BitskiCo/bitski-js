import Web3 from 'web3';
import { BitskiProvider } from './bitskiprovider';
import { OAuthProviderIntegrationType } from './oauthhttpprovider';
import { User } from 'oidc-client';

/**
 * Initialize [Web3](https://github.com/ethereum/web3) with Bitski. This will be ignored if a web3 object already exists.
 * @param client_id OAuth Client ID
 * @param redirect_uri Redirect URL, defaults to window.URL
 * @param post_logout_redirect_uri Post logout redirect URL, defaults to window.URL
 * @example
 * ```javascript
 * // Set up Bitski for exampledapp.co
 * web3 = bitski.InitializeWeb3('YOUR-CLIENT-ID');
 * ```
 * @returns Web3 object configured for Bitski.
 */

export function InitializeWeb3(client_id: string, redirect_uri?: string, post_logout_redirect_uri?: string) {
    var provider = new BitskiProvider(client_id, redirect_uri, post_logout_redirect_uri);
    var web3Client = new Web3(provider);
    return web3Client;
};

export class LoginButton {
    provider: BitskiProvider;
    public element: HTMLButtonElement;

    public completion?: (web3: Web3, error?: Error, user?: User) => void;
    
    constructor(client_id: string) {
        this.element = document.createElement("button");

        this.setDefaultStyle();

        var provider = new BitskiProvider(client_id);
        provider.authenticationIntegrationType = OAuthProviderIntegrationType.POPUP;
        this.provider = provider;

        var web3Client = new Web3(provider);

        var loginButton = this;
        this.element.addEventListener("click", () => {
            provider.signIn().then(function (user: User){
                if (loginButton.completion) {
                    loginButton.completion(web3Client, null, user);
                }
            }).catch(function(error: Error){
                if (loginButton.completion) {
                    loginButton.completion(web3Client, error, null);
                }
            });
        });

        if (window.opener) {
            provider.userManager.signinPopupCallback();
        }
    }

    setDefaultStyle() {
        this.element.style.width = "256px";
        this.element.style.height = "44px";
        this.element.title = "Continue with Bitski";
        this.element.innerText = "Continue with Bitski";
    }
}
