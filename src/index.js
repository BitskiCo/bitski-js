import OAuthHttpProvider from './oauthhttpprovider';

/**
 * Initialize [Web3](https://github.com/ethereum/web3) with Bitski. This will be ignored if a web3 object already exists.
 * @param {Object} settings
 * @param {string} settings.authority - Authority URL
 * @param {string} settings.client_id - Your unique client ID (sign up at bitski.co)
 * @param {string} settings.redirect_uri - URL to redirect to
 * @param {string} settings.post_logout_redirect_uri - URL to redirect to after log out
 * @param {string} settings.response_type - Response type
 * @param {string} settings.scope - Requested scope
 * @param {string} settings.popup_redirect_uri - URL to redirect to using popup method
 * @param {string} settings.popup_post_logout_redirect_uri - URL to redirect to after log out
 * @param {string} settings.silent_redirect_uri - URL to redirect to using silent method
 * @param {Boolean} settings.automaticSilentRenew - Automatically renew using silent method
 * @param {number} settings.silentRequestTimeout - Timeout for silent request in seconds
 * @param {Boolean} settings.filterProtocolClaims - Filter protocol claims
 * @param {Boolean} settings.loadUserInfo - Whether or not to automatically load the user's info
 * @example
 * // Set up Bitski for exampledapp.co
 * web3 = InitializeWeb3({
 *   authority: 'https://hydra.outtherelabs.com/',
 *   client_id: 'YOUR-CLIENT-ID',
 *   redirect_uri: 'https://exampledapp.co/',
 *   post_logout_redirect_uri: 'https://exampledapp.co',
 *   response_type: 'token id_token',
 *   scope: 'openid',
 *   popup_redirect_uri: 'https://exampledapp.co',
 *   popup_post_logout_redirect_uri: 'https://exampledapp.co',
 *   silent_redirect_uri: 'https://exampledapp.co',
 *   automaticSilentRenew: true,
 *   silentRequestTimeout: 10000,
 *   filterProtocolClaims: true,
 *   loadUserInfo: true
 * });
 * @returns {Web3} Web3 object configured for Bitski.
 */
export function InitializeWeb3(settings) {
    if (typeof web3 !== 'undefined') {
        console.warn("Web3 provider already exists!");
    } else {
        var web3Client = new Web3(new OAuthHttpProvider("https://keep-api.outtherelabs.com/v1/web3/kovan", 0, settings));
        return web3Client;
    }
};
