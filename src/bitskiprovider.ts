import { OAuthHttpProvider, OAuthProviderIntegrationType } from './oauthhttpprovider';
import { Dialog } from './dialog';
import { JsonRPCRequest, JsonRPCResponse } from 'web3-providers-http'
import { User, UserManagerSettings } from 'oidc-client';
import Web3 from 'web3';

/**
 * Settings for configuring Bitski.
 */
class BitskiProviderSettings implements UserManagerSettings {
    /**
     * OAuth provider URL
     */
    authority: string;
    /**
     * Your client application's identifier as registered with Bitski.
     */
    client_id: string;
    /**
     * The type of response desired from the provider.
     */
    response_type: string = 'token id_token';
    /**
     * The OAuth scope being requested from Bitski.
     */
    scope: string = 'openid';
    /**
     * The redirect URI of your client application to receive the OAuth response
     * from the Bitski.
     */
    redirect_uri: string;
    /**
     * The post-logout redirect URI.
     */
    post_logout_redirect_uri: string;
    /**
     * The URL for the page containing the call to `signinPopupCallback` to
     * handle the callback from Bitski.
     */
    popup_redirect_uri: string = this.redirect_uri;
    /**
     * The post-logout redirect URI for the popup method.
     */
    popup_post_logout_redirect_uri: string = this.popup_post_logout_redirect_uri;
    /**
     * The URL for the page containing the code handling the silent renew.
     */
    silent_redirect_uri: string = this.redirect_uri;
    /**
     * Flag to indicate if there should be an automatic attempt to renew the
     * access token prior to its expiration. The attempt is made as a result
     * of the `accessTokenExpiring` event being raised.
     */
    automaticSilentRenew: boolean =  true;
    /**
     * Number of milliseconds to wait for the silent renew to return before
     * assuming it has failed or timed out.
     */
    silentRequestTimeout: number = 10000;
    /**
     * Should OIDC protocol claims be removed from profile.
     */
    filterProtocolClaims: boolean = true;
    /**
     * Flag to control if additional identity data is loaded from the user
     * info endpoint in order to populate the user's profile.
     */
    loadUserInfo: boolean =  true;

    popupWindowFeatures: string = 'location=no,toolbar=no,width=360,height=340,left=100,top=100;';

    /**
     * Create new instance of BitskiProviderSettings
     * @param authority Bitski OAuth URL
     * @param client_id Your application's Bitski client ID
     * @param redirect_uri URL to redirect to after log in
     * @param post_logout_redirect_uri URL to redirect to after log out
     */
    constructor(authority: string, client_id: string, redirect_uri?: string, post_logout_redirect_uri?: string) {
        this.authority = authority;
        this.client_id = client_id;

        this.redirect_uri = redirect_uri || window.location.href;
        this.popup_redirect_uri = redirect_uri || window.location.href;
        this.silent_redirect_uri = redirect_uri || window.location.href;

        this.post_logout_redirect_uri = post_logout_redirect_uri || window.location.href;
        this.popup_post_logout_redirect_uri = post_logout_redirect_uri || window.location.href;
    }
}

/**
 * A Web3 provider that connects to the Bitski service
 * @example
 * ```javascript
 * var provider = new BitskiProvider('MY_CLIENT_ID');
 * ```
 */
export class BitskiProvider extends OAuthHttpProvider {
    /**
     * Queued requests to be sent upon logging in.
     */
    private queuedSends: { payload: JsonRPCRequest, callback: { (e: Error, val: JsonRPCResponse): void } }[] = [];
    private pendingTransactions: { payload: JsonRPCRequest, callback: { (e: Error, val: JsonRPCResponse): void } }[] = [];
    private currentTransactionDialog?: Dialog = null;
    private currentTransactionWindow?: Window = null;

    /**
     * Determins how the authorization modals show up for eth_call and eth_sendTransaction.
     */
    public authorizationIntegrationType: OAuthProviderIntegrationType = OAuthProviderIntegrationType.IFRAME;

    /**
     * @param client_id OAuth Client ID
     * @param redirect_uri Redirect URL, defaults to window.location.href
     * @param post_logout_redirect_uri Post logout redirect URL, defaults to window.location.href
     */
    constructor(client_id: string, network_name: String, redirect_uri?: string, post_logout_redirect_uri?: string) {
        super('https://api.bitski.com/v1/web3/' + network_name, 0, new BitskiProviderSettings('https://account.bitski.com/', client_id, redirect_uri, post_logout_redirect_uri));
    }

    /**
     * Returns a boolean value that indicates whether the Web3 method
     * can be executed without being logged in.
     * @param method A web3 method name (ex: "eth_sign")
     * @returns boolean for if the method can be executed without being logged in.
     */
    receiveMessage(event: MessageEvent): void {
        super.receiveMessage(event);

        if (event.origin !== "https://www.bitski.com") {
            return;
        }

        console.log("Got an event from the account service: " + event);

        var response: JsonRPCResponse = event.data;

        var matchingTransactions = this.pendingTransactions.filter(function (pendingTransaction) {
            return (pendingTransaction.payload.id === response.id);
        });

        var provider = this;
        if (matchingTransactions.length > 0) {
            matchingTransactions.forEach(function (transaction, index) {
                provider.pendingTransactions.splice(index,1);
                transaction.callback(null, response);
                if (provider.currentTransactionDialog) {
                    provider.currentTransactionDialog.dismiss();
                    provider.currentTransactionDialog = null;
                }
            });
        }
    }

    private requiresAuthentication(method: string): boolean {
        switch (method) {
            case "eth_coinbase":
            case "eth_accounts":
            case "eth_accounts":
            case "eth_sign":
            case "eth_sendTransaction":
                return true;
            default:
                return true; // Temp, should eventually be false
        }
    }

    /**
     * Returns a boolean value that indicates whether the Web3 method
     * can be executed without the user's explicit authorization.
     * @param method a web3 method name (ex: "eth_sign")
     */
    private requiresAuthorization(method: string): boolean {
        switch (method) {
            case "eth_sign":
            case "eth_sendTransaction":
                return true;
            default:
                return false;
        }
    }

    didSignIn(user: User) {
        super.didSignIn(user);
        this.flushQueuedSends(user);
    }

    /**
     * Flush all queued requests
     * @param user User authentication object to send the requests through.
     */
    private flushQueuedSends(user: User): void {
        while (this.queuedSends.length > 0) {
            let queuedSend = this.queuedSends.pop();
            this.sendAuthenticated(queuedSend.payload, user, queuedSend.callback);
        }
    }

    /**
     * Sends a Web3 request.
     * @param payload JSON-RPC request object to send.
     * @param callback Handler for send request. `function (e: Error, val: JSONRPCResponse) => void`
     */
    send(payload: JsonRPCRequest, callback: (e: Error, val: JsonRPCResponse) => void): void {
        var provider = this;

        if (this.currentUser) {
            this.sendAuthenticated(payload, this.currentUser, callback);
        } else if (this.requiresAuthentication(payload.method)) {
            this.queuedSends.push({ payload: payload, callback: callback });
            this.signIn();
        } else {
            super.send(payload, callback);
        }
    }

    /**
     * Sends a request with authentication headers.
     * @param payload JSON-RPC request object to send.
     * @param user User authentication object to send the requests through.
     * @param callback Handler for send request. `function (e: Error, val: JSONRPCResponse) => void`
     */
    sendAuthenticated(payload: JsonRPCRequest, user: User, callback: (e: Error, val: JsonRPCResponse) => void): void {
        if (this.requiresAuthorization(payload.method)) {
            this.showAuthorization(payload, user, callback)
        } else {
            super.send(payload, callback);
        }
    }

    /**
     * Presents an authorization request to the user.
     * @param payload JSON-RPC request object to send.
     * @param callback Handler for send request. `function (e: Error, val: JSONRPCResponse) => void`
     */
    showAuthorization(payload: JsonRPCRequest, user: User, callback: (e: Error, val: JsonRPCResponse) => void): void {
        if (this.currentTransactionDialog) {
            this.currentTransactionDialog.dismiss();
        }

        if (this.currentTransactionWindow) {
            this.currentTransactionWindow.close();
        }

        switch (this.authorizationIntegrationType) {
            case OAuthProviderIntegrationType.IFRAME:
                this.pendingTransactions.push({ payload: payload, callback: callback });

                var iframe = document.createElement("iframe");
                iframe.width = "360px";
                iframe.height = "340px";
                iframe.frameBorder = "0";
                iframe.src = "https://www.bitski.com/eth-send-transaction?network=kovan&payload=" + btoa(JSON.stringify(payload)) + "&accessToken=" + user.access_token;

                this.currentTransactionDialog = new Dialog(iframe);
                break;
            case OAuthProviderIntegrationType.REDIRECT:
                window.location.href = "https://www.bitski.com/eth-send-transaction?network=kovan&callback=" + window.location.href + "&payload=" + btoa(JSON.stringify(payload)) + "&accessToken=" + user.access_token;
                break;
            case OAuthProviderIntegrationType.POPUP:
                var url = "https://www.bitski.com/eth-send-transaction?network=kovan&payload=" + btoa(JSON.stringify(payload)) + "&accessToken=" + user.access_token;
                var newwindow = window.open(url ,"Bitski Authorization", 'width=360,height=340,toolbar=0,menubar=0,location=0');  
                if (window.focus) {newwindow.focus()};
                
                this.currentTransactionWindow = newwindow;
                break;
        }
    }

    /**
     * Check whether we are connected to the server.
     * @returns boolean if we are connected.
     */
    isConnected(): boolean {
        return true
    }
}
