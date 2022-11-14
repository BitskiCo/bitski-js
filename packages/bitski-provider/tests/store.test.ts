import { EthMethod } from 'eth-provider-types';
import { CHAINS_STORAGE_KEY, CURRENT_CHAIN_STORAGE_KEY } from '../src/store';
import { DEFAULT_CHAINS, Goerli } from '../src/constants';
import { toHex } from '../src/utils/parse-utils';
import { createTestProvider } from './util/create-provider';
import MemStore from './util/mem-store';

describe('store', () => {
  test('stores chains and current chain id', async () => {
    const store = new MemStore();
    const provider = createTestProvider({ store });

    const customChain = { chainId: toHex(77), rpcUrls: ['http://localhost:3000'] };

    await provider.request({
      method: EthMethod.wallet_addEthereumChain,
      params: [customChain],
    });

    await provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [{ chainId: toHex(77) }],
    });

    const chains = await store.getItem(CHAINS_STORAGE_KEY);
    const currentChainId = await store.getItem(CURRENT_CHAIN_STORAGE_KEY);

    expect(chains).toEqual([...DEFAULT_CHAINS, customChain]);
    expect(currentChainId).toBe(toHex(77));
  });

  test('restores state from store', async () => {
    const store = new MemStore();

    const customChain = { chainId: toHex(77), rpcUrls: ['http://localhost:3000'] };

    store.setItem(CHAINS_STORAGE_KEY, [...DEFAULT_CHAINS, customChain]);
    store.setItem(CURRENT_CHAIN_STORAGE_KEY, Goerli.chainId);

    const provider = createTestProvider({ store });

    // defaults to persisted chain id
    const result1 = await provider.request({ method: EthMethod.eth_chainId });
    expect(result1).toBe(Goerli.chainId);

    // switch to persisted custom chain
    const result2 = await provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [{ chainId: toHex(77) }],
    });
    expect(result2).toBe(null);
  });
});
