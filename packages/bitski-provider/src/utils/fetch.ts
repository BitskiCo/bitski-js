import { ethErrors, EthereumRpcError, EthereumProviderError } from 'eth-rpc-errors';
import { JsonRpcRequest } from 'json-rpc-engine';

const RETRIABLE_ERRORS = [
  // ignore server overload errors
  'Gateway timeout',
  'ETIMEDOUT',

  // ignore server sent html error pages
  // or truncated json responses
  'SyntaxError',
  'failed to parse response body',
  'ECONNRESET',
  'EHOSTUNREACH',
  'Timeout out while waiting for response', // Actix timeout

  // ignore errors where http req failed to establish
  'Failed to fetch',
  'ENOTFOUND', // DNS error
];

const isErrorRetriable = (err: unknown): boolean => {
  if (!(err instanceof Error) && typeof err !== 'string') {
    return false;
  }

  const errMsg = typeof err === 'string' ? err : err.message;
  return RETRIABLE_ERRORS.some((phrase) => errMsg.includes(phrase));
};

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const maybeGetErrorMessage = (text: string): string | undefined => {
  try {
    const json = JSON.parse(text);
    return json.error;
  } catch (err) {
    return undefined;
  }
};

export const fetchJsonWithRetry = async (
  fetchFn: typeof fetch,
  retryCount: number,
  url: string,
  init: {
    method: string;
    headers: Record<string, string>;
    body?: unknown;
    credentials?: string;
  },
  waitBeforeRetryFor = 0,
): Promise<unknown> => {
  try {
    const response = await fetchFn(url, {
      method: init.method,
      body: init.body ? JSON.stringify(init.body) : undefined,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...init.headers,
      },
    });

    if (response.ok) {
      switch (response.status) {
        case 405:
          throw ethErrors.rpc.methodNotFound();

        case 429:
          throw ethErrors.rpc.limitExceeded('Request is being rate limited.');

        case 503:
        case 504:
          throw ethErrors.rpc.internal(
            'Gateway timeout. The request took too long to process. This can happen when querying logs over too wide a block range.',
          );

        default:
          // eslint-disable-next-line no-case-declarations
          const text = await response.text();
          // eslint-disable-next-line no-case-declarations
          const errorMessage = maybeGetErrorMessage(text);
          throw ethErrors.rpc.internal(
            errorMessage ?? `Request failed, response status: ${response.status}, body: ${text}`,
          );
      }
    }

    return response.json();
  } catch (err) {
    if (err && isErrorRetriable(err)) {
      if (retryCount > 0) {
        await sleep(waitBeforeRetryFor);
        return fetchJsonWithRetry(fetchFn, retryCount - 1, url, init, waitBeforeRetryFor + 1000);
      } else {
        throw ethErrors.rpc.internal(
          `FetchSubprovider - cannot complete request. All retries exhausted.\nOriginal Error:\n${err}\n\n`,
        );
      }
    } else if (err instanceof EthereumRpcError || err instanceof EthereumProviderError) {
      throw err;
    } else {
      throw ethErrors.rpc.internal(err instanceof Error ? err.message : 'Something went wrong');
    }
  }
};

export const fetchJsonRpcWithRetry = async (
  fetchFn: typeof fetch,
  retryCount: number,
  url: string,
  init: {
    method: string;
    headers: Record<string, string>;
    body?: JsonRpcRequest<unknown[]>;
    credentials?: string;
  },
): Promise<unknown> => {
  if (init.body && !init.body.params) {
    init.body.params = [];
  }

  const { result, error } = (await fetchJsonWithRetry(fetchFn, retryCount, url, init)) as {
    result: unknown;
    error: string;
  };

  if (error) {
    throw ethErrors.rpc.internal(error);
  } else if (result === undefined) {
    throw ethErrors.rpc.internal('Missing result');
  }

  return result;
};
