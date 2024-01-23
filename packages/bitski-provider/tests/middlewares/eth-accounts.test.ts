import { EthMethod } from 'eth-provider-types';
import { createTestProvider } from '../util/create-provider';

describe('eth-accounts middleware', () => {
  test('loads accounts via blockchain accounts API', async () => {
    expect.assertions(3);
    const provider = createTestProvider();

    fetchMock.mockResponse(async (req) => {
      expect(req.url).toBe('https://api.bitski.com/v2/blockchain/accounts');
      expect(req.method).toBe('GET');

      return JSON.stringify({
        accounts: [
          {
            kind: 'bitski',
            address: '0x123',
          },
        ],
      });
    });

    const result = await provider.request({ method: EthMethod.eth_accounts });
    expect(result).toEqual(['0x123']);
  });

  test('uses access token if available', async () => {
    expect.assertions(4);
    const provider = createTestProvider({
      async getAccessToken() {
        return 'test-access-token';
      },
    });

    fetchMock.mockResponse(async (req) => {
      expect(req.headers.get('Authorization')).toBe('Bearer test-access-token');
      expect(req.url).toBe('https://api.bitski.com/v2/blockchain/accounts');
      expect(req.method).toBe('GET');

      return JSON.stringify({
        accounts: [
          {
            kind: 'bitski',
            address: '0x123',
          },
        ],
      });
    });

    const result = await provider.request({ method: EthMethod.eth_accounts });
    expect(result).toEqual(['0x123']);
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
      expect(req.url).toBe('https://api.bitski.com/v2/blockchain/accounts');
      expect(req.method).toBe('GET');

      return JSON.stringify({
        accounts: [
          {
            kind: 'bitski',
            address: user.accounts[0],
          },
        ],
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
