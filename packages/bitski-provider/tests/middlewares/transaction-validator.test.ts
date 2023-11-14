import { EthMethod } from 'eth-provider-types';
import { createTestProvider } from '../util/create-provider';

describe('transaction-validator middleware', () => {
  test('adds `from` if it was not present', async () => {
    expect.assertions(3);
    const provider = createTestProvider({
      getUser: async () => ({
        id: 'test-id',
      }),
    });

    const txn = {
      to: '0x',
      value: '0x',
      gas: '0x',
      gasPrice: '0x',
    };

    fetchMock.once(async () => {
      return JSON.stringify({
        accounts: [
          {
            kind: 'bitski',
            address: '0x123',
          },
        ],
      });
    });

    fetchMock.once(async (req) => {
      const { method, params } = await req.json();

      expect(method).toEqual(EthMethod.eth_sendTransaction);
      expect(params[0]).toEqual({
        from: '0x123',
        ...txn,
      });

      return JSON.stringify({ result: '0x123' });
    });

    const result = await provider.request({
      method: EthMethod.eth_sendTransaction,
      params: [{ ...txn }],
    });

    expect(result).toBe('0x123');
  });

  test('it only updates values that are missing', async () => {
    expect.assertions(3);
    const provider = createTestProvider({
      getUser: async () => ({
        id: 'test-id',
        accounts: ['0x123'],
      }),
    });

    const txn = {
      from: '0x456',
      to: '0x',
      value: '0x',
      gas: '0x',
      gasPrice: '0x',
    };

    fetchMock.mockResponse(async (req) => {
      const { method, params } = await req.json();

      expect(method).toEqual(EthMethod.eth_sendTransaction);
      expect(params[0]).toEqual({
        ...txn,
        from: '0x456',
      });

      return JSON.stringify({ result: '0x123' });
    });

    const result = await provider.request({
      method: EthMethod.eth_sendTransaction,
      params: [{ ...txn }],
    });

    expect(result).toBe('0x123');
  });
});
