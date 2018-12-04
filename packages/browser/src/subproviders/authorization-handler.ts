import JsonRpcError from 'json-rpc-error';
import Subprovider from 'web3-provider-engine/subproviders/subprovider';

const DEFAULT_AUTHORIZED_METHODS = ['eth_sendTransaction', 'eth_sign', 'eth_signTypedData', 'personal_sign'];

/*
 * Base Subprovider that requests authorization for specific methods. Meant to be extended.
 */
export class AuthorizationHandler extends Subprovider {

  private authorizedMethods: [string];

  constructor(opts?: any) {
    super();
    this.authorizedMethods = (opts && opts.authorizedMethods) || DEFAULT_AUTHORIZED_METHODS;
  }

  public handleRequest(payload, next, end): void {
    if (this.requiresAuthorization(payload.method)) {
      this.handleAuthorization(payload, next, end);
      return;
    }
    next();
  }

  public handleAuthorization(payload, next, end): void {
    // Default implementation
    end(new JsonRpcError.InternalError());
  }

  private requiresAuthorization(method: string): boolean {
    return this.authorizedMethods.includes(method);
  }

}
