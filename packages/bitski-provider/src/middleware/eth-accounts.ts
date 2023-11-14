import { EthMethod } from 'eth-provider-types';
import { createAsyncMiddleware, JsonRpcMiddleware, JsonRpcRequest } from 'json-rpc-engine';
import { getRequestContext } from '../utils/request-context';
import { InternalBitskiProviderConfig } from '../types';
import { fetchJsonWithRetry } from '../utils/fetch';
import { ethErrors } from 'eth-rpc-errors';

const REFRESH = Symbol();
const ANON_USER = 'anonymous';

interface BlockchainAccount {
  id: string;
  profileId: string;
  displayName: string;
  kind: string;
  coinType: number;
  address: string;
  createdAt: string;
  updatedAt: string;
}

// We fetch accounts directly in this middleware so that we ensure we're always
// hitting Bitski direcly and not another RPC url (e.g. for custom RPCs/chains).
const fetchAccounts = async (config: InternalBitskiProviderConfig): Promise<string[]> => {
  const headers = { ...config.additionalHeaders };

  if (config.getAccessToken) {
    headers['Authorization'] = `Bearer ${await config.getAccessToken()}`;
  }

  const { accounts } = (await fetchJsonWithRetry(
    config.fetch,
    5,
    `${config.apiBaseUrl}/v2/blockchain/accounts`,
    {
      method: 'GET',
      headers,
    },
  )) as { accounts: BlockchainAccount[] };

  const mainAccount =
    accounts.find((a) => a.kind === 'contract-wallet') ?? accounts.find((a) => a.kind === 'bitski');

  if (!mainAccount) {
    throw ethErrors.rpc.internal('Could not find blockchain accounts');
  }

  return [mainAccount.address];
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
      accounts = await fetchAccounts(config);

      cache.set(userId, accounts);
      setTimeout(() => cache.set(userId, REFRESH), 5 * 60 * 1000);
    }

    res.result = accounts;
  });
};
