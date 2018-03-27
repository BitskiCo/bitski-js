import { User } from 'oidc-client';
import { BitskiProvider } from './bitski-provider';
/**
 * A buton used to connect to Bitski
 */
export declare class ConnectButton {
    element: HTMLElement;
    callback?: (error?: Error, user?: User) => void;
    private provider;
    /**
     * @param provider The BitskiProvider that will be used to sign in
     * @param existingDiv An existing div to turn into a connect button
     */
    constructor(provider: BitskiProvider, existingDiv?: HTMLElement);
    private signin();
    private setDefaultStyle();
}
