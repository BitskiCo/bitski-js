import { User, UserManager, UserManagerSettings } from 'oidc-client';
import Web3 from 'web3';
import HttpProvider from 'web3-providers-http';
import 'xhr2';
export declare enum OAuthProviderIntegrationType {
    IFRAME = 0,
    REDIRECT = 1,
    POPUP = 2,
    SILENT = 3,
}
/**
 * Force window.web3
 * We can delete this one we have defaultAccount set up better
 */
declare global  {
    interface Window {
        web3?: Web3;
    }
}
/**
 * A class that extends Web3's HTTPProvider by adding OAuth to JSON-RPC calls
 */
export declare class OAuthHttpProvider extends HttpProvider {
    /**
     * Instance user manager object.
     */
    userManager: UserManager;
    /**
     * The current logged in `User`
     */
    currentUser?: User;
    /**
     * Determines how the authentication modals show up.
     */
    authenticationIntegrationType: OAuthProviderIntegrationType;
    /**
     * The JSON-RPC endpoint
     */
    private host;
    /**
     * The configured authentication dialog
     */
    private authenticationDialog?;
    /**
     * Object containing the OAuth settings. see {@link BitskiProviderSettings}
     * Cached sign in promise.
     */
    private settings;
    /**
     * Cached sign in promise.
     */
    private currentSignInPromise?;
    /**
     * @param host JSON-RPC endpoint
     * @param timeout Timeout in seconds
     * @param settings settings object for configuring OAuth, see {@link BitskiProviderSettings}
     */
    constructor(host: string, timeout: number, settings: UserManagerSettings);
    receiveMessage(event: MessageEvent): void;
    /**
     * Sign in using the current settings.
     * @returns A promise for a user.
     */
    signIn(): Promise<User>;
    didSignIn(user: User): void;
    /**
     * Prepares a new XMLHttpRequest with the proper headers
     * @returns Request object that is ready for a payload.
     */
    private _prepareRequest();
    /**
     * Send a web3 / JSON-RPC request asynchronously.
     * @param payload The JSON-RPC request object to send
     * @param callback Handler function invoked when the request has completed.
     */
    private sendAsync(payload, callback);
}
