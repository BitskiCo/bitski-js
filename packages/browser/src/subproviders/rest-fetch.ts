import { CompletionHandler, JSONRPCRequest, NextHandler, Subprovider } from '@bitski/provider-engine';
import asyncify from 'async/asyncify';
import retry from 'async/retry';
import waterfall from 'async/waterfall';
import fetch from 'cross-fetch';
import JsonRpcError from 'json-rpc-error';
import promiseToCallback from 'promise-to-callback';

const RETRIABLE_ERRORS = [
  // ignore server overload errors
  'Gateway timeout',
  'ETIMEDOUT',
  // ignore server sent html error pages
  // or truncated json responses
  'SyntaxError',
];

const MATCHING_METHODS = ['eth_getBlockByNumber', 'eth_blockNumber', 'net_Version', 'eth_getLogs'];

export interface RestFetchSubproviderOptions {
  rpcUrl: string;
  defaultHeaders?: object;
  originHttpHeaderKey?: string;
}

export class RestFetchSubprovider extends Subprovider {

  protected rpcUrl: string;
  protected defaultHeaders?: object;
  protected originHttpHeaderKey?: string;

  constructor(opts: RestFetchSubproviderOptions) {
    super();
    this.rpcUrl = opts.rpcUrl;
    this.defaultHeaders = opts.defaultHeaders;
    this.originHttpHeaderKey = opts.originHttpHeaderKey;
  }

  public handleRequest(payload: JSONRPCRequest, next: NextHandler, end: CompletionHandler): void {
    if (MATCHING_METHODS.includes(payload.method)) {
      this.handleRestRequest(payload, end);
    } else {
      next();
    }
  }

  protected handleRestRequest(payload: JSONRPCRequest, end: CompletionHandler): void {
    const originDomain = payload.origin;

    const query = payload.params.length > 0 ? `?params=${encodeURIComponent(JSON.stringify(payload.params))}` : '';

    const url = `${this.rpcUrl}/${payload.method}${query}`;

    const reqParams = {
      method: 'GET',
      headers: Object.assign({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, this.defaultHeaders),
      credentials: 'omit',
    };

    if (this.originHttpHeaderKey && originDomain) {
      reqParams.headers[this.originHttpHeaderKey] = originDomain;
    }

    retry({
      times: 5,
      interval: 1000,
      errorFilter: isErrorRetriable,
    },
    (cb) => this._submitRequest(url, reqParams, cb),
    (err, result) => {
      // ends on retriable error
      if (err && isErrorRetriable(err)) {
        const errMsg =
          `FetchSubprovider - cannot complete request. All retries exhausted.\nOriginal Error:\n${err.toString()}\n\n`;
        const retriesExhaustedErr = new Error(errMsg);
        return end(retriesExhaustedErr);
      }
      // otherwise continue normally
      return end(err, result);
    });
  }

  protected _submitRequest(targetUrl, reqParams, done) {
    promiseToCallback(fetch(targetUrl, reqParams))((err, res) => {
      if (err) { return done(err); }

      // continue parsing result
      waterfall([
        checkForHttpErrors,
        // buffer body
        (cb) => promiseToCallback(res.text())(cb),
        // parse body
        asyncify((rawBody) => JSON.parse(rawBody)),
        parseResponse,
      ], done);

      function checkForHttpErrors(cb) {
        // check for errors
        switch (res.status) {
          case 405:
            return cb(new JsonRpcError.MethodNotFound());

          case 418:
            return cb(createRatelimitError());

          case 503:
          case 504:
            return cb(createTimeoutError());

          default:
            return cb();
        }
      }

      function parseResponse(body, cb) {
        // check for error code
        if (res.status !== 200) {
          return cb(new JsonRpcError.InternalError(body));
        }
        cb(null, body);
      }
    });
  }

}

function isErrorRetriable(err) {
  const errMsg = err.toString();
  return RETRIABLE_ERRORS.some((phrase) => errMsg.includes(phrase));
}

function createRatelimitError() {
  const msg = 'Request is being rate limited.';
  const err = new Error(msg);
  return new JsonRpcError.InternalError(err);
}

function createTimeoutError() {
  let msg = 'Gateway timeout. The request took too long to process. ';
  msg += 'This can happen when querying logs over too wide a block range.';
  const err = new Error(msg);
  return new JsonRpcError.InternalError(err);
}
