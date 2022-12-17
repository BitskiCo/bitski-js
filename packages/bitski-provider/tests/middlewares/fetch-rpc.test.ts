import { EthMethod } from 'eth-provider-types';
import { sleep } from '../util/async';
import { createTestProvider } from '../util/create-provider';

describe('fetch-rpc middleware', () => {
  test('sends POST request with RPC details', async () => {
    const provider = createTestProvider();

    fetchMock.mockResponse(async (req) => {
      if (req.method === 'GET') {
        // loading block number
        return JSON.stringify({ result: '0x123' });
      }

      expect(req.url).toBe('https://api.bitski.com/v1/web3/chains/1');
      expect(req.method).toBe('POST');

      expect(req.headers.get('X-API-KEY')).toBe('test-client-id');
      expect(req.headers.get('X-CLIENT-ID')).toBe('test-client-id');
      expect(req.headers.get('X-CLIENT-VERSION')).toBe('test-version');

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

  test('retries requests when receiving errors that match the criteria', async () => {
    const provider = createTestProvider();

    let count = 0;

    fetchMock.mockResponse(async (req) => {
      if (req.method === 'GET') {
        // loading block number
        return JSON.stringify({ result: '0x123' });
      }

      if (count < 2) {
        count++;
        return { body: 'ETIMEDOUT', status: 500 };
      } else {
        expect(await req.json()).toMatchObject({
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
      }
    });

    const result = await provider.request({
      method: EthMethod.eth_getBlockByHash,
      params: ['0x123', false],
    });

    expect(result).toEqual({ number: '0x123' });
  });

  test('does not retry for non-retryable errors', async () => {
    const provider = createTestProvider();

    fetchMock.mockResponse(async (req) => {
      if (req.method === 'GET') {
        // loading block number
        return JSON.stringify({ result: '0x123' });
      }

      return { body: 'SOMETHING WENT HORRIBLY WRONG', status: 500 };
    });

    try {
      await provider.request({
        method: EthMethod.eth_getBlockByHash,
        params: ['0x123', false],
      });
    } catch (error) {
      expect((error as Error).message).toMatch('SOMETHING WENT HORRIBLY WRONG');
    }
  });

  test('retries only 5 times', async () => {
    jest.useFakeTimers();
    const provider = createTestProvider();

    fetchMock.mockResponse(async (req) => {
      if (req.method === 'GET') {
        // loading block number
        return JSON.stringify({ result: '0x123' });
      }

      return { body: 'ETIMEDOUT', status: 500 };
    });

    expect(
      provider.request({
        method: EthMethod.eth_getBlockByHash,
        params: ['0x123', false],
      }),
    ).rejects.toMatch('Gateway timeout. The request took too long to process.');

    jest.runAllTimers();
    await sleep(0);

    jest.runAllTimers();
    await sleep(0);

    jest.runAllTimers();
    await sleep(0);

    jest.runAllTimers();
    await sleep(0);

    jest.runAllTimers();
    await sleep(0);
  });

  test('unauthorized requests should request token invalidation', async () => {
    expect.assertions(2);
    const provider = createTestProvider({
      async clearAccessToken() {
        expect(true).toBe(true);
      },
    });

    fetchMock.mockResponse(async (req) => {
      if (req.method === 'GET') {
        // loading block number
        return JSON.stringify({ result: '0x123' });
      }

      return { body: 'Not Authorized', status: 401 };
    });

    try {
      await provider.request({
        method: EthMethod.eth_getBlockByHash,
        params: ['0x123', false],
      });
    } catch (error) {
      expect((error as Error).message).toMatch(
        'Request failed, response status: 401, body: Not Authorized',
      );
    }
  });
});
