import { createAsyncMiddleware, JsonRpcMiddleware } from 'json-rpc-engine';
import { getRequestContext } from '../utils/request-context';
import { fetchJsonRpcWithRetry } from '../utils/fetch';

export const createFetchRpcMiddleware = (): JsonRpcMiddleware<unknown[], unknown> => {
  return createAsyncMiddleware(async (req, res) => {
    const { config, chain } = getRequestContext(req);

    const headers = { ...config.additionalHeaders };

    res.result = await fetchJsonRpcWithRetry(config.fetch, 5, chain.rpcUrls[0], {
      method: 'POST',
      headers,
      body: {
        id: req.id,
        jsonrpc: req.jsonrpc,
        method: req.method,
        params: req.params,
      },
    });
  });
};
