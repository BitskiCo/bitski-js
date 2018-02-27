import { OAuthHttpProvider } from './oauthhttpprovider';
import {JsonRPCRequest, JsonRPCResponse} from 'web3-providers-http'
import { User, UserManagerSettings } from 'oidc-client';

class BitskiProviderSettings implements UserManagerSettings {
    authority: string;
    client_id: string;

    response_type: string = 'token id_token';
    scope: string = 'openid';

    redirect_uri: string;
    post_logout_redirect_uri: string;
    
    popup_redirect_uri: string = this.redirect_uri;
    popup_post_logout_redirect_uri: string = this.popup_post_logout_redirect_uri;

    silent_redirect_uri: string = this.redirect_uri;
    automaticSilentRenew: boolean =  true;
    silentRequestTimeout: number = 10000;
    filterProtocolClaims: boolean = true;
    loadUserInfo: boolean =  true;

    constructor(authority: string, client_id: string, redirect_uri?: string, post_logout_redirect_uri?: string) {
        this.authority = authority;
        this.client_id = client_id;
        this.redirect_uri = redirect_uri || window.location.href;
        this.post_logout_redirect_uri = post_logout_redirect_uri || window.location.href;
    }
}

/**
 * A Web3 provider that connects to the Bitski service
 * @example
 * var provider = new BitskiProvider('MY_CLIENT_ID');
 */
export class BitskiProvider extends OAuthHttpProvider {
    private currentSignInPromise: Promise<User> = null;
    private queuedSends: {payload: JsonRPCRequest, callback: { (e: Error, val: JsonRPCResponse): void }}[] = [];

    /**
     * @param cliend_id OAuth Client ID
     * @param redirect_uri Redirect URL, defaults to window.location.href
     * @param post_logout_redirect_uri Post logout redirect URL, defaults to window.location.href
     */
    constructor(client_id: string, redirect_uri?: string, post_logout_redirect_uri?: string) {
        super('https://keep-api.outtherelabs.com/v1/web3/kovan', 0, new BitskiProviderSettings('https://hydra.outtherelabs.com/', client_id, redirect_uri, post_logout_redirect_uri));
    }

    private requiresSignIn(method: string): boolean {
        return true; // TODO: Non authenticated calls
    }

    signIn(): Promise<User> {
        if (this.currentSignInPromise) {
            return this.currentSignInPromise;
        }

        var currentSignInPromise = super.signIn();
        this.currentSignInPromise = currentSignInPromise;

        var provider = this;

        currentSignInPromise.then(function(user){
            provider.flushQueuedSends(user);
        }).catch(function(error){
            provider.currentSignInPromise = null;
        });

        return currentSignInPromise;
    }

    private flushQueuedSends(user: User): void {
        while(this.queuedSends.length > 0) {
            let queuedSend = this.queuedSends.pop();
            this.sendAuthenticated(queuedSend.payload, user, queuedSend.callback);
        }
    }

    send(payload: JsonRPCRequest, callback: (e: Error, val: JsonRPCResponse) => void): void {
        var provider = this;

        if (this.currentUser) {
            this.sendAuthenticated(payload, this.currentUser, callback);
        } else if (this.requiresSignIn(payload.method)) {
            this.queuedSends.push({payload: payload, callback: callback});
            this.signIn();
        } else {
            super.send(payload, callback);
        }
    }

    sendAuthenticated(payload: JsonRPCRequest, user: User, callback: (e: Error, val: JsonRPCResponse) => void): void {
        super.send(payload, callback);
    }
}