import Subprovider from 'web3-provider-engine/subproviders/subprovider';
import { DEFAULT_AUTHORIZED_METHODS } from '../constants';
/*
 * Base Subprovider that requests authorization for specific methods. Meant to be extended.
 */
export abstract class AuthorizationHandler extends Subprovider {

  protected authorizedMethods: string[];

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

  public abstract handleAuthorization(payload, next, end): void;

  protected requiresAuthorization(method: string): boolean {
    return this.authorizedMethods.includes(method);
  }

}
