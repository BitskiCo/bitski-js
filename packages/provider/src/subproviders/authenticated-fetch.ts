import { FetchSubprovider } from '@bitski/provider-engine';
import retry from 'async/retry';
import { AccessTokenProvider } from '../auth/access-token-provider';
import { AUTHENTICATED_METHODS, RETRIABLE_ERRORS, UNAUTHORIZED_ERRORS } from '../constants';
import { ServerError } from '../errors/server-error';

/*
 * Subprovider that fetches over HTTP and manages authentication headers
 */
export class AuthenticatedFetchSubprovider extends FetchSubprovider {
  protected authenticatedMethods: string[];
  protected accessTokenProvider: AccessTokenProvider;
  protected defaultHeaders: object;

  constructor(rpcUrl: string, debug: boolean, accessTokenProvider: AccessTokenProvider, defaultHeaders: object = {}) {
    super({ rpcUrl });
    this.authenticatedMethods = AUTHENTICATED_METHODS;
    this.accessTokenProvider = accessTokenProvider;
    this.defaultHeaders = defaultHeaders;
  }

  public handleRequest(payload, next, end) {
    if (this.requiresAuthentication(payload)) {
      return this.handleAuthenticatedRequest(payload, next, end);
    } else {
      return this.handleUnauthenticatedRequest(payload, next, end);
    }
  }

  public handleAuthenticatedRequest(payload, next, end) {
    this.accessTokenProvider.getAccessToken().then((accessToken) => {
      const parameters = this.generateParameters(payload, accessToken);
      return this.sendRequest(parameters, next, end);
    }).catch((error) => {
      end(error);
    });
  }

  public handleUnauthenticatedRequest(payload, next, end) {
    const parameters = this.generateParameters(payload);
    return this.sendRequest(parameters, next, end);
  }

  protected requiresAuthentication(payload) {
    return this.authenticatedMethods.some((method) => method === payload.method);
  }

  protected generateParameters(payload, accessToken?: string): object {
    // overwrite id to not conflict with other concurrent users
    const newPayload = this.createPayload(payload);
    // remove extra parameter from request
    delete newPayload.origin;

    let headers: any = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    headers = Object.assign({}, headers, this.defaultHeaders);

    const originDomain = payload.origin;
    if (this.originHttpHeaderKey && originDomain) {
      headers[this.originHttpHeaderKey] = originDomain;
    }

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const requestParameters = {
      body: JSON.stringify(newPayload),
      headers,
      method: 'POST',
    };

    return requestParameters;
  }

  protected sendRequest(parameters: object, next, end) {
    retry({
      errorFilter: this.isErrorRetriable,
      interval: 1000,
      times: 5,
    },
    (cb) => this._submitRequest(parameters, cb),
    (err, result) => {
      // ends on retriable error
      if (err && this.isErrorRetriable(err)) {
        const retriesExhaustedErr = new ServerError(err.message, 200, this.rpcUrl, true);
        return end(retriesExhaustedErr);
      }
      if (err && this.isUnauthorizedError(err)) {
        return this.accessTokenProvider.invalidateToken().then(() => {
          return end(err);
        });
      }
      // otherwise continue normally
      return end(err, result);
    });
  }

  private isErrorRetriable(err) {
    const errMsg = err.toString();
    return RETRIABLE_ERRORS.some((phrase) => errMsg.includes(phrase));
  }

  private isUnauthorizedError(err: Error) {
    return UNAUTHORIZED_ERRORS.some((phrase) => err.message.includes(phrase));
  }
}
