import OAuthHttpProvider from './oauthhttpprovider';

export function InitializeWeb3(settings) {
    if (typeof web3 !== 'undefined') {
        console.warn("Web3 provider already exists!");
    } else {
        var web3Client = new Web3(new OAuthHttpProvider("https://keep-api.outtherelabs.com/v1/web3/kovan", 0, settings));
        return web3Client;
    }
};
