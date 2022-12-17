// This test requires the production build to have been run, it ensures that the
// shim is working correctly and a basic request can be made.

// import the bitski min, which will set the global Bitski object
import { EthMethod } from 'eth-provider-types';
import Bundle from '../dist/bundled/bitski.min.js';

globalThis.Bitski = Bundle;

// import the shim
import { Bitski } from '../src/index';

describe('built shim', () => {
  test('should be able to make a request', async () => {
    const bitski = new Bitski('test-client-id', 'http://localhost:3000');
    const provider = bitski.getProvider();

    fetchMock.mockResponse(async (req) => {
      if (req.method === 'GET') {
        // loading block number
        return JSON.stringify({ result: '0x123' });
      }

      expect(req.url).toBe('https://api.bitski.com/v1/web3/chains/1');
      expect(req.method).toBe('POST');

      expect(req.headers.get('X-API-KEY')).toBe('test-client-id');
      expect(req.headers.get('X-CLIENT-ID')).toBe('test-client-id');
      expect(req.headers.get('X-CLIENT-VERSION')).toMatch(/bitski-sdk-v\d+\.\d+\.\d+/);

      const body = await req.json();

      expect(body).toMatchObject({
        method: 'eth_getBlockByHash',
        params: ['0x123', false],
      });

      // Make sure we aren't including any extra parameters
      expect(Object.keys(body)).toEqual(['id', 'jsonrpc', 'method', 'params']);

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
  });
});
