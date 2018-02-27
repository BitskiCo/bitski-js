import Web3 from 'web3';
import { BitskiProvider } from './bitskiprovider';

/**
 * Initialize [Web3](https://github.com/ethereum/web3) with Bitski. This will be ignored if a web3 object already exists.
 * @param cliend_id OAuth Client ID
 * @param redirect_uri Redirect URL, defaults to window.URL
 * @param post_logout_redirect_uri Post logout redirect URL, defaults to window.URL
 * @example
 * // Set up Bitski for exampledapp.co
 * web3 = bitski.InitializeWeb3('YOUR-CLIENT-ID');
 * @returns Web3 object configured for Bitski.
 */

export function InitializeWeb3(client_id: string, redirect_uri?: string, post_logout_redirect_uri?: string) {
    var provider = new BitskiProvider(client_id, redirect_uri, post_logout_redirect_uri);    
    var web3Client = new Web3(provider);
    return web3Client;
};
