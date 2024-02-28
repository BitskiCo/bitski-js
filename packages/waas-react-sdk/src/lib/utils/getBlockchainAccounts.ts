export async function getBlockchainAccounts(
  fetch: typeof window.fetch,
  token: string,
): Promise<BlockchainAccount[]> {
  const response = await fetch('https://api.bitski.com/v2/blockchain/accounts', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { accounts } = (await response.json()) as AccountsResponse;
  return accounts;
}

export const LOCAL_STORAGE_LABEL = 'wallet.bitski.com/local-storage';

export interface BlockchainAccount {
  id: string;
  address: string;
  kind: string;
  labels: Record<string, string>;
  annotations: Record<string, string>;
}

export interface AccountsResponse {
  accounts: BlockchainAccount[];
}
