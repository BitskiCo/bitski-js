import { EthMethod } from 'eth-provider-types';
import { Goerli, Mainnet } from '../../src/constants';
import { createTestProvider } from '../util/create-provider';

describe('block-cache middleware', () => {
  test('caches requests', async () => {
    expect.assertions(5);
    const provider = createTestProvider();

    fetchMock.mockResponse(async (req) => {
      if (req.method === 'GET') {
        // loading block number
        return JSON.stringify({ result: '0x123' });
      }

      expect(req.url).toBe('https://api.bitski.com/v1/web3/chains/1');
      expect(req.method).toBe('POST');

      const body = await req.json();

      expect(body).toMatchObject({
        method: 'eth_getBlockByHash',
        params: ['0x123', false],
      });

      return JSON.stringify({
        id: 0,
        jsonrpc: '2.0',
        result: {
          number: '0x123',
        },
      });
    });

    const result = await provider.request({
      method: EthMethod.eth_getBlockByHash,
      params: ['0x123', false],
    });

    expect(result).toEqual({ number: '0x123' });

    const result2 = await provider.request({
      method: EthMethod.eth_getBlockByHash,
      params: ['0x123', false],
    });

    expect(result2).toEqual({ number: '0x123' });
  });

  test('can cache requests on multiple chains', async () => {
    expect.assertions(2);
    const provider = createTestProvider();

    fetchMock.mockResponse(async (req) => {
      if (req.method === 'GET') {
        // loading block number
        return JSON.stringify({ result: '0x123' });
      }

      const body = await req.json();

      expect(body).toMatchObject({
        method: 'eth_getBlockByHash',
        params: ['0x123', false],
      });

      return JSON.stringify({
        id: 0,
        jsonrpc: '2.0',
        result: {
          number: '0x123',
        },
      });
    });

    await provider.request({
      method: EthMethod.eth_getBlockByHash,
      params: ['0x123', false],
    });

    // switch back and forth a few times
    await provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [{ chainId: Goerli.chainId }],
    });

    await provider.request({
      method: EthMethod.eth_getBlockByHash,
      params: ['0x123', false],
    });

    // 2
    await provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [{ chainId: Mainnet.chainId }],
    });

    await provider.request({
      method: EthMethod.eth_getBlockByHash,
      params: ['0x123', false],
    });

    // 3
    await provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [{ chainId: Goerli.chainId }],
    });

    await provider.request({
      method: EthMethod.eth_getBlockByHash,
      params: ['0x123', false],
    });
  });
});
