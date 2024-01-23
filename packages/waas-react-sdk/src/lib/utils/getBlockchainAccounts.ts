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

interface BlockchainAccount {
  id: string;
  address: string;
  kind: string;
}

interface AccountsResponse {
  accounts: BlockchainAccount[];
}
