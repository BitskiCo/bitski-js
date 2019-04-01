export { BitskiEngine } from './bitski-engine';
export { AccessToken } from './auth/access-token';
export { AccessTokenProvider } from './auth/access-token-provider';
export { AuthenticatedFetchSubprovider } from './subproviders/authenticated-fetch';
export { Network, Mainnet, Rinkeby, Kovan } from './network';

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
