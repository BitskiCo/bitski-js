import { EthEvent, EthMethod } from 'eth-provider-types';
import { Goerli, Mainnet } from '../../src/constants';
import { toHex } from '../../src/utils/parse-utils';
import { createTestProvider } from '../util/create-provider';

describe('chain-management middleware', () => {
  test('should be able to get current chain id via eth_chainId', async () => {
    const provider = createTestProvider();

    const result = await provider.request({ method: EthMethod.eth_chainId });
    // Defaults to mainnet
    expect(result).toBe(Mainnet.chainId);
  });

  test('should be able to switch chain via wallet_switchEthereumChain', async () => {
    const provider = createTestProvider();

    const result1 = await provider.request({ method: EthMethod.eth_chainId });
    expect(result1).toBe(Mainnet.chainId);

    const result2 = await provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [{ chainId: Goerli.chainId }],
    });
    expect(result2).toBe(null);

    const result3 = await provider.request({ method: EthMethod.eth_chainId });
    expect(result3).toBe(Goerli.chainId);
  });

  test('should emit chainChanged event', (done) => {
    expect.assertions(2);
    const provider = createTestProvider();

    provider.on(EthEvent.chainChanged, async (chainId) => {
      expect(chainId).toBe(Goerli.chainId);
      const result = await provider.request({ method: EthMethod.eth_chainId });
      expect(result).toBe(Goerli.chainId);
      done();
    });

    provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [{ chainId: Goerli.chainId }],
    });
  });

  test('should throw an error if chain does not exist', async () => {
    const provider = createTestProvider();

    const result = await provider.request({ method: EthMethod.eth_chainId });
    expect(result).toBe(Mainnet.chainId);

    try {
      await provider.request({
        method: EthMethod.wallet_switchEthereumChain,
        params: [{ chainId: toHex(77) }],
      });
    } catch (e) {
      expect((e as Error).message).toMatch(/Chain does not exist/);
    }
  });

  test('should be able to add a chain via wallet_addEthereumChain', async () => {
    const provider = createTestProvider();

    const result1 = await provider.request({ method: EthMethod.eth_chainId });
    expect(result1).toBe(Mainnet.chainId);

    const result2 = await provider.request({
      method: EthMethod.wallet_addEthereumChain,
      params: [{ chainId: toHex(77), rpcUrls: ['http://localhost:3000'] }],
    });
    expect(result2).toBe(null);

    const result3 = await provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [{ chainId: toHex(77) }],
    });
    expect(result3).toBe(null);

    const result4 = await provider.request({ method: EthMethod.eth_chainId });
    expect(result4).toBe(toHex(77));
  });

  test('should do nothing when adding a chain that already exists', async () => {
    const provider = createTestProvider();

    const result1 = await provider.request({ method: EthMethod.eth_chainId });
    expect(result1).toBe(Mainnet.chainId);

    const result2 = await provider.request({
      method: EthMethod.wallet_addEthereumChain,
      params: [{ chainId: Mainnet.chainId }],
    });

    expect(result2).toBe(null);
  });
});
