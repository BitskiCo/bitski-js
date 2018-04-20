import { User } from 'oidc-client';
import Web3 from 'web3';
import logoLg from '../assets/logo-lg.svg';
import logoMd from '../assets/logo-md.svg';
import logoSm from '../assets/logo-sm.svg';
import { BitskiProvider } from '../providers/bitski-provider';
import { OAuthProviderIntegrationType } from '../providers/oauth-http-provider';

/**
 * Sizing options for the Bitski connect button.
 */
export enum ConnectButtonSize {
    SMALL,
    MEDIUM,
    LARGE,
}

/**
 * A button used to connect to Bitski.
 */
export class ConnectButton {
    public element: HTMLElement;
    public size: ConnectButtonSize;
    public callback?: (error?: Error, user?: User) => void;
    private provider: BitskiProvider;

    private defaultColor: string = '#298FFF';
    private activeColor: string = '#1A7CE6';

    /**
     * @param provider The BitskiProvider that will be used to sign in
     * @param existingDiv An existing div to turn into a connect button
     */
    constructor(
        provider: BitskiProvider,
        existingDiv?: HTMLElement,
        size: ConnectButtonSize = ConnectButtonSize.MEDIUM,
    ) {
        this.size = size;
        this.element = document.createElement('button');
        this.provider = provider;
        this.setDefaultStyle();

        this.element.addEventListener('click', this.signin.bind(this));
        this.element.addEventListener('mousedown', this.focus.bind(this));
        this.element.addEventListener('mouseup', this.blur.bind(this));
        this.element.addEventListener('mouseout', this.blur.bind(this));
        this.element.addEventListener('focus', this.focus.bind(this));
        this.element.addEventListener('blur', this.blur.bind(this));

        if (existingDiv) {
            existingDiv.appendChild(this.element);
        }
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

    private focus() {
        this.element.style.backgroundColor = this.activeColor;
    }

    private blur() {
        this.element.style.backgroundColor = this.defaultColor;
    }

    private setDefaultStyle() {
        this.element.title = 'Continue with Bitski';
        this.element.innerText = 'Continue with Bitski';

        this.element.style.fontFamily = '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, \'Helvetica Neue\', sans-serif';
        this.element.style.fontWeight = 'bold';
        this.element.style.backgroundColor = '#298FFF';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.backgroundPositionY = '50%';
        this.element.style.color = '#fff';
        this.element.style.border = 'none';
        this.element.style.margin = '0';
        this.element.style.padding = '0';
        this.element.style.cursor = 'pointer';

        switch (this.size) {
        case ConnectButtonSize.SMALL:
            this.configureForSmall();
            break;
        case ConnectButtonSize.MEDIUM:
            this.configureForMedium();
            break;
        case ConnectButtonSize.LARGE:
            this.configureForLarge();
            break;
        }
    }

    private configureForSmall() {
        const attributes = {
            backgroundImage: `url('${logoSm}')`,
            backgroundPositionX: '6px',
            borderRadius: '4px',
            fontSize: '10px',
            height: '20px',
            lineHeight: '20px',
            paddingLeft: '27px',
            paddingRight: '11px',
        };

        for (const key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                this.element.style[key] = attributes[key];
            }
        }
    }

    private configureForMedium() {
        const attributes = {
            backgroundImage: `url('${logoMd}')`,
            backgroundPositionX: '6px',
            borderRadius: '6px',
            fontSize: '12px',
            height: '28px',
            lineHeight: '28px',
            paddingLeft: '35px',
            paddingRight: '14px',
        };

        for (const key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                this.element.style[key] = attributes[key];
            }
        }
    }

    private configureForLarge() {
        const attributes = {
            backgroundImage: `url('${logoLg}')`,
            backgroundPositionX: '12px',
            borderRadius: '8px',
            fontSize: '15px',
            height: '40px',
            lineHeight: '40px',
            paddingLeft: '48px',
            paddingRight: '18px',
        };

        for (const key in attributes) {
            if (attributes.hasOwnProperty(key)) {
                this.element.style[key] = attributes[key];
            }
        }
    }
}
