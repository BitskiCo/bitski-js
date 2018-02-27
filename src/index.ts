/**
 * Provides a way to add Bitski to your app.
 */

import Web3 from 'web3';
import { OAuthHttpProvider } from './oauthhttpprovider';
import { HttpProvider } from 'web3/types';

/**
 * Initialize [Web3](https://github.com/ethereum/web3) with Bitski. This will be ignored if a web3 object already exists.
 * @param settings
 * @param settings.authority - Authority URL
 * @param settings.client_id - Your unique client ID (sign up at bitski.co)
 * @param settings.redirect_uri - URL to redirect to
 * @param settings.post_logout_redirect_uri - URL to redirect to after log out
 * @param settings.response_type - Response type
 * @param settings.scope - Requested scope
 * @param settings.popup_redirect_uri - URL to redirect to using popup method
 * @param settings.popup_post_logout_redirect_uri - URL to redirect to after log out
 * @param settings.silent_redirect_uri - URL to redirect to using silent method
 * @param settings.automaticSilentRenew - Automatically renew using silent method
 * @param settings.silentRequestTimeout - Timeout for silent request in seconds
 * @param settings.filterProtocolClaims - Filter protocol claims
 * @param settings.loadUserInfo - Whether or not to automatically load the user's info
 * @returns {Web3} Web3 object configured for Bitski.
 */
export function InitializeWeb3(settings: any) {
    var provider: HttpProvider = new OAuthHttpProvider("https://keep-api.outtherelabs.com/v1/web3/kovan", 0, settings);
    var web3Client = new Web3(provider);
    return web3Client;
};
