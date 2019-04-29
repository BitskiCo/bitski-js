import { AccessTokenProvider, AuthenticatedFetchSubprovider, BitskiEngine, Network } from 'bitski-provider';
import { AuthProvider } from '../auth/auth-provider';
import { ProviderOptions } from '../bitski';
import { BITSKI_TRANSACTION_API_BASE_URL, BITSKI_WEB_BASE_URL } from '../constants';
import { AuthenticatedCacheSubprovider } from '../subproviders/authenticated-cache';
import { IFrameSubprovider } from '../subproviders/iframe';

// Predicate to determine if the token provider is an AuthProvider
function isAuthProvider(object: any): object is AuthProvider {
  return (object as AuthProvider).getUser !== undefined;
}

export class BitskiBrowserEngine extends BitskiEngine {

  private network: Network;
  private webBaseUrl: string;
  private apiBaseUrl: string;
  private tokenProvider: AccessTokenProvider;
  private clientId: string;
  private sdkVersion: string;
  private headers: object;

  constructor(
    clientId: string,
    tokenProvider: AccessTokenProvider,
    sdkVersion: string,
    network: Network,
    webBaseUrl?: string,
    apiBaseUrl?: string,
    options?: ProviderOptions) {
    super(options);
    this.network = network;
    this.apiBaseUrl = apiBaseUrl || BITSKI_TRANSACTION_API_BASE_URL;
    this.tokenProvider = tokenProvider;
    this.clientId = clientId;
    this.webBaseUrl = webBaseUrl || BITSKI_WEB_BASE_URL;
    this.sdkVersion = sdkVersion;

    const defaultHeaders = {
      'X-API-KEY': this.clientId,
      'X-CLIENT-ID': this.clientId,
      'X-CLIENT-VERSION': this.sdkVersion,
    };
    this.headers = defaultHeaders;
    if (options && options.additionalHeaders) {
      this.headers = Object.assign({}, options.additionalHeaders, this.headers);
    }

    this.on('error', (error) => {
      if (error.message === 'Not signed in') {
        this.stop();
      }
    });

    this.addSubproviders(options);
  }

  protected addSubproviders(options?: ProviderOptions) {
    const fetchSubprovider = new AuthenticatedFetchSubprovider(
      this.network.rpcUrl,
      false,
      this.tokenProvider,
      this.headers,
    );

    // Respond to some requests via userinfo object if available
    if (isAuthProvider(this.tokenProvider)) {
      const cacheSubprovider = new AuthenticatedCacheSubprovider(this.tokenProvider);
      this.addProvider(cacheSubprovider);
    }

    // Respond to requests that need approval with an iframe
    const iframeSubprovider = new IFrameSubprovider(this.webBaseUrl, this.apiBaseUrl, this.network.chainId, this.tokenProvider, this.headers);
    this.addProvider(iframeSubprovider);

    // Finally, add our basic fetch provider
    this.addProvider(fetchSubprovider);
  }

}
