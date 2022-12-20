import { EthMethod } from 'eth-provider-types';
import { createTestProvider } from '../util/create-provider';

describe('eth-accounts middleware', () => {
  test('loads accounts via RPC', async () => {
    expect.assertions(4);
    const provider = createTestProvider();

    fetchMock.mockResponse(async (req) => {
      expect(req.url).toBe('https://api.bitski.com/v1/web3/mainnet');
      expect(req.method).toBe('POST');

      const body = await req.json();

      expect(body).toMatchObject({
        method: 'eth_accounts',
      });

      return JSON.stringify({
        id: 0,
        jsonrpc: '2.0',
        result: ['0x123'],
      });
    });

    const result = await provider.request({ method: EthMethod.eth_accounts });
    expect(result).toEqual(['0x123']);
  });

  test('uses access token if available', async () => {
    expect.assertions(5);
    const provider = createTestProvider({
      async getAccessToken() {
        return 'test-access-token';
      },
    });

    fetchMock.mockResponse(async (req) => {
      expect(req.headers.get('Authorization')).toBe('Bearer test-access-token');
      expect(req.url).toBe('https://api.bitski.com/v1/web3/mainnet');
      expect(req.method).toBe('POST');

      const body = await req.json();

      expect(body).toMatchObject({
        method: 'eth_accounts',
      });

      return JSON.stringify({
        id: 0,
        jsonrpc: '2.0',
        result: ['0x123'],
      });
    });

    const result = await provider.request({ method: EthMethod.eth_accounts });
    expect(result).toEqual(['0x123']);
  });

  test('uses user accounts if available for the first request', async () => {
    jest.useFakeTimers();

    expect.assertions(5);
    const provider = createTestProvider({
      async getUser() {
        return {
          id: 'test-user-id',
          accounts: ['0x456'],
        };
      },
    });

    fetchMock.mockResponse(async (req) => {
      expect(req.url).toBe('https://api.bitski.com/v1/web3/mainnet');
      expect(req.method).toBe('POST');

      const body = await req.json();

      expect(body).toMatchObject({
        method: 'eth_accounts',
        params: [],
      });

      return JSON.stringify({
        id: 0,
        jsonrpc: '2.0',
        result: ['0x123'],
      });
    });

    const result = await provider.request({ method: EthMethod.eth_accounts });
    expect(result).toEqual(['0x456']);

    jest.runAllTimers();

    const result2 = await provider.request({ method: EthMethod.eth_accounts });
    expect(result2).toEqual(['0x123']);
  });

  test('caches accounts response based on user', async () => {
    jest.useFakeTimers();

    const user = {
      id: 'test-user-id',
      accounts: ['0x123'],
    };

    const provider = createTestProvider({
      async getUser() {
        return user;
      },
    });

    fetchMock.mockResponse(async (req) => {
      expect(req.url).toBe('https://api.bitski.com/v1/web3/mainnet');
      expect(req.method).toBe('POST');

      const body = await req.json();

      expect(body).toMatchObject({
        method: 'eth_accounts',
      });

      return JSON.stringify({
        id: 0,
        jsonrpc: '2.0',
        result: user.accounts,
      });
    });

    expect(await provider.request({ method: EthMethod.eth_accounts })).toEqual(['0x123']);
    user.accounts = ['0x456'];
    expect(await provider.request({ method: EthMethod.eth_accounts })).toEqual(['0x123']);

    jest.runAllTimers();

    expect(await provider.request({ method: EthMethod.eth_accounts })).toEqual(['0x456']);

    user.id = 'test-user-id-2';
    user.accounts = ['0x789'];

    expect(await provider.request({ method: EthMethod.eth_accounts })).toEqual(['0x789']);
    user.accounts = ['0x123'];
    expect(await provider.request({ method: EthMethod.eth_accounts })).toEqual(['0x789']);

    jest.runAllTimers();

    expect(await provider.request({ method: EthMethod.eth_accounts })).toEqual(['0x123']);
  });
});
