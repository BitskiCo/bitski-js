import { User } from 'oidc-client';
import Web3 from 'web3';
import { BitskiProvider } from './bitski-provider';
import { OAuthProviderIntegrationType } from './oauth-http-provider';

/**
 * A buton used to connect to Bitski
 */
export class ConnectButton {
    public element: HTMLElement;
    public callback?: (error?: Error, user?: User) => void;
    private provider: BitskiProvider;

    /**
     * @param provider The BitskiProvider that will be used to sign in
     * @param existingDiv An existing div to turn into a connect button
     */
    constructor(provider: BitskiProvider, existingDiv?: HTMLElement) {
        if (existingDiv) {
            this.element = existingDiv;
        } else {
            this.element = document.createElement('button');
            this.setDefaultStyle();
        }

        this.provider = provider;

        this.element.addEventListener('click', this.signin.bind(this));
    }

    private signin() {
        this.provider.signIn().then((user: User) => {
            if (this.callback) {
                this.callback(undefined, user);
            }
        }).catch((error: Error) => {
            if (this.callback) {
                this.callback(error, undefined);
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
