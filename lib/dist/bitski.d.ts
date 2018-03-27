import Web3 from 'web3';
import { BitskiProvider } from './bitski-provider';
import { ConnectButton } from './connect-button';
/**
 * Deprecated, use new Bitski(...) instead
 */
export declare function InitializeWeb3(clientId: string, networkName?: string, redirectUri?: string, postLogoutRedirectUri?: string): Web3;
/**
 * Bitski SDK
 */
export declare class Bitski {
    provider: BitskiProvider;
    /**
     * @param clientId OAuth Client ID
     * @param networkName Web3 network name, defaults to 'kovan'
     * @param redirectUri Redirect URL, defaults to window.URL
     * @param postLogoutRedirectUri Post logout redirect URL, defaults to window.URL
     */
    constructor(clientId: string, networkName?: string, redirectUri?: string, postLogoutRedirectUri?: string);
    /**
     * Returns an initialized web3 API
     */
    getWeb3(): Web3;
    /**
     * @param existingDiv Existing element to turn into a Bitski connect button
     */
    getConnectButton(existingDiv?: HTMLElement): ConnectButton;
}
