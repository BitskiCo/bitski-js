import { SignFn } from '../types';
import { fetchJsonRpcWithRetry } from '../utils/fetch';

const signFn: SignFn = async (method, params, { config, chain }): Promise<string> => {
  const headers = { ...config.additionalHeaders };

  if (config.getAccessToken) {
    headers.Authorization = `Bearer ${await config.getAccessToken()}`;
  }

  return (await fetchJsonRpcWithRetry(config.fetch, 5, chain.rpcUrls[0], {
    method: 'POST',
    headers,
    body: {
      id: 1,
      jsonrpc: '2.0',
      method,
      params,
    },
  })) as string;
};

/**
 * This sign function signs by directly calling the method at the RPC endpoint,
 * without any user interaction. It requires the user to provide an access token
 * with `sign` scope, e.g. a client secret issued from the Bitski developer
 * portal.
 */
export default function createRpcSigner(): SignFn {
  return signFn;
}
