import { EthMethod } from 'eth-provider-types';
import { createAsyncMiddleware, JsonRpcMiddleware } from 'json-rpc-engine';
import { getRequestContext } from '../utils/request-context';
import { fetchJsonRpcWithRetry } from '../utils/fetch';

const MATCHING_METHODS: string[] = [
  EthMethod.eth_getBlockByNumber,
  EthMethod.eth_blockNumber,
  EthMethod.net_version,
  EthMethod.eth_getLogs,
];

export const createFetchRestMiddleware = (): JsonRpcMiddleware<unknown[], unknown> => {
  return createAsyncMiddleware(async (req, res, next) => {
    if (!MATCHING_METHODS.includes(req.method)) {
      return next();
    }

    const { config, chain } = getRequestContext(req);

    const query =
      (req.params?.length ?? 0) > 0
        ? `?params=${encodeURIComponent(JSON.stringify(req.params))}`
        : '';

    const url = `${chain.rpcUrls[0]}/${req.method}${query}`;

    const headers = { ...config.additionalHeaders };

    res.result = fetchJsonRpcWithRetry(config.fetch, 5, url, {
      method: 'GET',
      headers,
      credentials: 'omit',
    });
  });
};
