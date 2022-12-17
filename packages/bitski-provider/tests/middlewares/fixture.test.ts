import { EthMethod } from 'eth-provider-types';
import { createTestProvider } from '../util/create-provider';

describe('fixture middleware', () => {
  test('responds with fixtures for certain methods', async () => {
    const provider = createTestProvider();

    const result = await provider.request({ method: EthMethod.web3_clientVersion });

    expect(result).toEqual('Bitski/latest');
    expect(fetchMock.mock.calls.length).toBe(0);
  });
});
