import retry from 'async/retry';
import FetchSubprovider from 'web3-provider-engine/subproviders/fetch';
import createPayload from 'web3-provider-engine/util/create-payload';

import { AccessTokenProvider } from '../auth/access-token-provider';

const RETRIABLE_ERRORS = [
    // ignore server overload errors
    'Gateway timeout',
    'ETIMEDOUT',
    // ignore server sent html error pages
    // or truncated json responses
    'SyntaxError',
    'ECONNRESET',
];

const AUTHENTICATED_METHODS = [
    'eth_accounts',
    'eth_sendTransaction',
    'eth_signTransaction',
    'eth_signTypedData',
    'personal_sign',
    'eth_sign',
];

const UNAUTHORIZED_ERRORS = [
    'Missing auth', // No token sent
    'Invalid client id', // Wrong client id, or invalid access token
    'Not Authorized',
];

function isErrorRetriable(err) {
    const errMsg = err.toString();
    return RETRIABLE_ERRORS.some((phrase) => errMsg.includes(phrase));
}

function isUnauthorizedError(err: Error) {
    return UNAUTHORIZED_ERRORS.some((phrase) => err.message.includes(phrase));
}

/*
 * Subprovider that fetches over HTTP and manages authentication headers
 */
export class AuthenticatedFetchSubprovider extends FetchSubprovider {
    protected authenticatedMethods: string[];
    protected accessTokenProvider: AccessTokenProvider;
    protected defaultHeaders: object;

    constructor(rpcUrl: string, debug: boolean, accessTokenProvider: AccessTokenProvider, defaultHeaders: object = {}) {
        super({ rpcUrl, debug });
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
        const newPayload = createPayload(payload);
        // remove extra parameter from request
        delete newPayload.origin;

        let headers: any = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        headers = Object.assign({}, headers, this.defaultHeaders);

        const originDomain = payload.origin;
        if (super.originHttpHeaderKey && originDomain) {
            headers[super.originHttpHeaderKey] = originDomain;
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
            errorFilter: isErrorRetriable,
            interval: 1000,
            times: 5,
        },
            (cb) => super._submitRequest(parameters, cb),
            (err, result) => {
                // ends on retriable error
                if (err && isErrorRetriable(err)) {
                    const errMsg = `FetchSubprovider - cannot complete request. All retries exhausted.\nOriginal Error:\n${err.toString()}\n\n`;
                    const retriesExhaustedErr = new Error(errMsg);
                    return end(retriesExhaustedErr);
                }
                if (err && isUnauthorizedError(err)) {
                    return this.accessTokenProvider.invalidateToken().then(() => {
                        return end(err);
                    });
                }
                // otherwise continue normally
                return end(err, result);
            });
    }
}
