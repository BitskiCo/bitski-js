import { AuthenticatedFetchSubprovider } from 'bitski-provider';

// A subprovider that loads accounts from a custom rpc endpoint.
// This is necessary because to guarantee that account related calls go through Bitski
export class RemoteAccountSubprovider extends AuthenticatedFetchSubprovider {

  public handleRequest(payload, next, end) {
    if (payload.method === 'eth_accounts') {
      this.handleAuthenticatedRequest(payload, next, end);
    } else {
      next();
    }
  }

}
