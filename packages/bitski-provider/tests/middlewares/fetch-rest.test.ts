import { EthMethod } from 'eth-provider-types';
import { createTestProvider } from '../util/create-provider';

describe('fetch-rest middleware', () => {
  test('sends GET requests for specific methods', async () => {
    expect.assertions(11);
    const provider = createTestProvider();

    fetchMock.mockResponse(async (req) => {
      expect(req.url).toBe('https://api.bitski.com/v1/web3/chains/1/eth_blockNumber');
      expect(req.method).toBe('GET');

      expect(req.headers.get('X-API-KEY')).toBe('test-client-id');
      expect(req.headers.get('X-CLIENT-ID')).toBe('test-client-id');
      expect(req.headers.get('X-CLIENT-VERSION')).toBe('test-version');

      return JSON.stringify({
        id: 0,
        jsonrpc: '2.0',
        result: '0x123',
      });
    });

    const result = await provider.request({
      method: EthMethod.eth_blockNumber,
    });

    expect(result).toEqual('0x123');
  });

  test('encodes parameters as query params', async () => {
    expect.assertions(3);
    const provider = createTestProvider();

    fetchMock.mockResponse(async (req) => {
      if (req.url.includes('eth_blockNumber')) {
        return JSON.stringify({
          id: 0,
          jsonrpc: '2.0',
          result: '0x123',
        });
      }

      expect(req.url).toBe(
        'https://api.bitski.com/v1/web3/chains/1/eth_getBlockByNumber?params=%5B%220x123%22%2Cfalse%5D',
      );
      expect(req.method).toBe('GET');

      return JSON.stringify({
        id: 0,
        jsonrpc: '2.0',
        result: {
          number: '0x123',
        },
      });
    });

    const result = await provider.request({
      method: EthMethod.eth_getBlockByNumber,
      params: ['0x123', false],
    });

    expect(result).toEqual({ number: '0x123' });
  });
});
