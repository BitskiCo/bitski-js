import OAuthHttpProvider from './oauthhttpprovider';

/**
 * A settings object for initializing Bitski
 * @typedef {Object} Settings
 * @property {string} authority - Authority URL
 * @property {string} client_id - Your unique client ID (sign up at bitski.co)
 * @property {string} redirect_uri - URL to redirect to
 * @property {string} post_logout_redirect_uri - URL to redirect to after log out
 * @property {string} response_type - Response type
 * @property {string} scope - Requested scope
 * @property {string} popup_redirect_uri - URL to redirect to using popup method
 * @property {string} popup_post_logout_redirect_uri - URL to redirect to after log out
 * @property {string} silent_redirect_uri - URL to redirect to using silent method
 * @property {Boolean} automaticSilentRenew - Automatically renew using silent method
 * @property {number} silentRequestTimeout - Timeout for silent request in seconds
 * @property {Boolean} filterProtocolClaims - Filter protocol claims
 * @property {Boolean} loadUserInfo - Whether or not to automatically load the user's info
 */

/**
 * Initialize Web3 with Bitski. This will be ignored if a web3 object already exists.
 * @param {Settings} settings - a {@link Settings} object to configure the SDK with
 * @example
 * // Set up Bitski for exampledapp.co
 * var settings = {
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
 * };
 * web3 = bitski.InitializeWeb3(settings);
 * @returns {Object} Returns a Web3 object configured for Bitski.
 */
export function InitializeWeb3(settings) {
    if (typeof web3 !== 'undefined') {
        console.warn("Web3 provider already exists!");
    } else {
        var web3Client = new Web3(new OAuthHttpProvider("https://keep-api.outtherelabs.com/v1/web3/kovan", 0, settings));
        return web3Client;
    }
};
