import { AuthenticatedFetchSubprovider, BitskiEngine } from 'bitski-provider';
import { OpenidAuthProvider } from '../auth/openid-auth-provider';
import { AuthenticatedCacheSubprovider } from '../subproviders/authenticated-cache';
import { IFrameSubprovider } from '../subproviders/iframe';

export class BitskiBrowserEngine extends BitskiEngine {

  private networkName: string;
  private rpcUrl: string;
  private authProvider: OpenidAuthProvider;
  private clientId: string;

  constructor(clientId: string, authProvider: OpenidAuthProvider, networkName?: string, options?: any) {
    super(options);
    this.networkName = networkName || 'mainnet';
    this.rpcUrl = `https://api.bitski.com/v1/web3/${this.networkName}`;
    this.authProvider = authProvider;
    this.clientId = clientId;

    this.on('error', (error) => {
      if (error.message === 'Not signed in') {
        this.stop();
      }
    });

    this.addSubproviders();
  }

  protected addSubproviders() {
    const fetchSubprovider = new AuthenticatedFetchSubprovider(
      this.rpcUrl,
      false,
      this.authProvider,
      {'X-API-KEY': this.clientId, 'X-CLIENT-ID': this.clientId},
    );
    const iframeSubprovider = new IFrameSubprovider('https://www.bitski.com', this.networkName, this.authProvider);
    const cacheSubprovider = new AuthenticatedCacheSubprovider(this.authProvider);

    this.addProvider(cacheSubprovider);
    this.addProvider(iframeSubprovider);
    this.addProvider(fetchSubprovider);
  }

}
