import { EthMethod } from 'eth-provider-types';
import { createAsyncMiddleware, JsonRpcMiddleware, JsonRpcRequest } from 'json-rpc-engine';
import { getRequestContext } from '../utils/request-context';
import { InternalBitskiProviderConfig } from '../types';
import { fetchJsonRpcWithRetry } from '../utils/fetch';

const REFRESH = Symbol();
const ANON_USER = 'anonymous';

// We fetch accounts directly in this middleware so that we ensure we're always
// hitting Bitski direcly and not another RPC url (e.g. for custom RPCs/chains).
const fetchAccounts = async (
  req: JsonRpcRequest<unknown[]>,
  config: InternalBitskiProviderConfig,
): Promise<string[]> => {
  const headers = { ...config.additionalHeaders };

  if (config.getAccessToken) {
    headers['Authorization'] = `Bearer ${await config.getAccessToken()}`;
  }

  return (await fetchJsonRpcWithRetry(config.fetch, 5, `${config.apiBaseUrl}/web3/mainnet`, {
    method: 'POST',
    headers,
    body: {
      id: req.id,
      jsonrpc: req.jsonrpc,
      method: EthMethod.eth_accounts,
      params: req.params,
    },
  })) as string[];
};

export const createEthAccountsMiddleware = (): JsonRpcMiddleware<unknown[], string[]> => {
  const cache = new Map<string, string[] | typeof REFRESH>();

  return createAsyncMiddleware(async (req, res, next) => {
    if (req.method !== EthMethod.eth_accounts && req.method !== EthMethod.eth_requestAccounts) {
      return next();
    }

    const { config } = getRequestContext(req);
    const user = await config.getUser?.();

    const userId = user?.id ?? ANON_USER;

    let accounts = cache.get(userId);

    if (!accounts || accounts === REFRESH) {
      if (!accounts && user?.accounts) {
        accounts = user.accounts;
      } else {
        accounts = await fetchAccounts(req, config);
      }

      cache.set(userId, accounts);
      setTimeout(() => cache.set(userId, REFRESH), 5 * 60 * 1000);
    }

    res.result = accounts;
  });
};
