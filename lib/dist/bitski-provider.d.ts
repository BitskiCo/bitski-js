import { User } from 'oidc-client';
import { JsonRPCCallback, JsonRPCRequest } from 'web3-providers-http';
import { OAuthHttpProvider, OAuthProviderIntegrationType } from './oauth-http-provider';
/**
 * A Web3 provider that connects to the Bitski service
 * @example
 * ```javascript
 * var provider = new BitskiProvider('MY_CLIENT_ID');
 * ```
 */
export declare class BitskiProvider extends OAuthHttpProvider {
    /**
     * Determines how the authorization modals show up for eth_call and eth_sendTransaction.
     */
    authorizationIntegrationType: OAuthProviderIntegrationType;
    /**
     * Acts like metamask, won't try to auto sign in.
     */
    locked: boolean;
    /**
     * Queued requests to be sent upon logging in.
     */
    private queuedSends;
    private pendingTransactions;
    private networkName;
    private currentTransactionDialog?;
    private currentTransactionWindow?;
    /**
     * @param clientId OAuth Client ID
     * @param networkName Network name
     * @param redirectUri Redirect URL, defaults to window.location.href
     * @param postLogoutRedirectUri Post logout redirect URL, defaults to window.location.href
     */
    constructor(clientId: string, networkName?: string, redirectUri?: string, postLogoutRedirectUri?: string);
    /**
     * After sign in functionality
     * @param user User authentication object to flush send queue.
     */
    didSignIn(user: User): void;
    /**
     * Returns a boolean value that indicates whether the Web3 method
     * can be executed without being logged in.
     * @param method A web3 method name (ex: 'eth_sign')
     * @returns boolean for if the method can be executed without being logged in.
     */
    receiveMessage(event: MessageEvent): void;
    /**
     * Sends a Web3 request.
     * @param payload JSON-RPC request object to send.
     * @param callback Handler for send request. `function (e: Error, val: JSONRPCResponse) => void`
     */
    send(payload: JsonRPCRequest, callback: JsonRPCCallback): void;
    /**
     * Flush all queued requests
     * @param user User authentication object to send the requests through.
     */
    private flushQueuedSends(user);
    /**
     * Determines if web3 method requires authentication
     * @param method a web3 method name (ex: 'eth_sign')
     */
    private requiresAuthentication(method);
    /**
     * Returns a boolean value that indicates whether the Web3 method
     * can be executed without the user's explicit authorization.
     * @param method a web3 method name (ex: 'eth_sign')
     */
    private requiresAuthorization(method);
    /**
     * Sends a request with authentication headers.
     * @param payload JSON-RPC request object to send.
     * @param user User authentication object to send the requests through.
     * @param callback Handler for send request. `function (e: Error, val: JSONRPCResponse) => void`
     */
    private sendAuthenticated(payload, user, callback);
    /**
     * Presents an authorization request to the user.
     * @param payload JSON-RPC request object to send.
     * @param callback Handler for send request. `function (e: Error, val: JSONRPCResponse) => void`
     */
    private showAuthorization(payload, user, callback);
    /**
     * Check whether we are connected to the server.
     * @returns boolean if we are connected.
     */
    private isConnected();
}
