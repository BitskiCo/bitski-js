export { BitskiEngine, BitskiEngineOptions } from './bitski-engine';
export { AccessToken } from './auth/access-token';
export { AccessTokenProvider } from './auth/access-token-provider';
export { AuthenticatedFetchSubprovider } from './subproviders/authenticated-fetch';
export { Network, Mainnet, Rinkeby, Kovan } from './network';
export { ServerError } from './errors/server-error';
export { ProviderError, ProviderErrorCode } from './errors/provider-error';

export interface JSONRPCRequestPayload {
  params: any[];
  method: string;
  id: number;
  jsonrpc: string;
}

export interface JSONRPCResponsePayload {
  result: any;
  id: number;
  jsonrpc: string;
}
