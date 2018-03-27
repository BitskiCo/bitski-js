import { User } from 'oidc-client';
import Web3 from 'web3';
/**
 * Deprecated, use ConnectButton
 */
export declare class LoginButton {
    element: HTMLButtonElement;
    callback?: (web3: Web3, error?: Error, user?: User) => void;
    private provider;
    private web3Client;
    constructor(clientId: string, networkName?: string);
    private signin();
    private setDefaultStyle();
}
