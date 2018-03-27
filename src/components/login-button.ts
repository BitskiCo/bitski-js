import { User } from 'oidc-client';
import Web3 from 'web3';
import { BitskiProvider } from '../providers/bitski-provider';
import { OAuthProviderIntegrationType } from '../providers/oauth-http-provider';

/**
 * Deprecated, use ConnectButton
 */
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
                this.callback(this.web3Client, undefined, user);
            }
        }).catch((error: Error) => {
            if (this.callback) {
                this.callback(this.web3Client, error, undefined);
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
