import { OAuthHttpProvider } from './oauthhttpprovider';
import {JsonRPCRequest, JsonRPCResponse} from 'web3-providers-http'
import { User } from 'oidc-client';

/**
 * A Web3 provider that connects to the Bitski service
 * @example
 * var provider = new BitskiProvider('MY_CLIENT_ID');
 */
export class BitskiProvider extends OAuthHttpProvider {
    /**
     * @param cliend_id OAuth Client ID
     * @param redirect_uri Redirect URL, defaults to window.URL
     * @param post_logout_redirect_uri Post logout redirect URL, defaults to window.URL
     */
    constructor(client_id: string, redirect_uri?: string, post_logout_redirect_uri?: string) {
        var settings = {
          authority: 'https://hydra.outtherelabs.com/',
          client_id: client_id,
          redirect_uri: redirect_uri || window.URL,
          post_logout_redirect_uri: post_logout_redirect_uri || window.URL,
          response_type: 'token id_token',
          scope: 'openid',
          popup_redirect_uri: redirect_uri || window.URL,
          popup_post_logout_redirect_uri: post_logout_redirect_uri || window.URL,
          silent_redirect_uri: redirect_uri || window.URL,
          automaticSilentRenew: true,
          silentRequestTimeout: 10000,
          filterProtocolClaims: true,
          loadUserInfo: true
        };

        super('https://keep-api.outtherelabs.com/v1/web3/kovan', 0, settings)
    }

    private requiresSignIn(method: string): boolean {
        return true; // TODO: Non authenticated calls
    }

    send(payload: JsonRPCRequest, callback: (e: Error, val: JsonRPCResponse) => void): void {
        if (this.requiresSignIn(payload.method)) {
            this.signIn().then(function(user){
                this.sendAuthenticated(payload, user, callback);
            }).catch(function(error){
                callback(error, null);
            });
        } else {
            super.send(payload, callback);
        }
    }

    sendAuthenticated(payload: JsonRPCRequest, user: User, callback: (e: Error, val: JsonRPCResponse) => void): void {
        super.send(payload, callback);
    }
}