import { EthMethod } from 'eth-provider-types';
import { Goerli, Mainnet } from '../../src/constants';
import { clearLegacyProviders } from '../../src/utils/legacy-middleware';
import { toHex } from '../../src/utils/parse-utils';
import { sleep } from '../util/async';
import { createTestProvider } from '../util/create-provider';

let currentBlockNumber = 1;

const advanceBlocks = async (numBlocks: number) => {
  jest.runAllTimers();
  await sleep(0);

  currentBlockNumber += numBlocks;
  // Wait for block poller to start
  jest.runAllTimers();
  await sleep(0);
};

describe('filter middleware', () => {
  beforeEach(() => {
    clearLegacyProviders();
    jest.useFakeTimers();

    fetchMock.resetMocks();

    fetchMock.mockResponse(async (req) => {
      if (req.url.includes(EthMethod.eth_blockNumber)) {
        return JSON.stringify({ result: toHex(currentBlockNumber) });
      } else {
        return JSON.stringify({
          result: [
            {
              topics: ['0x123'],
            },
          ],
        });
      }
    });
  });

  test('can create filters', async () => {
    expect.assertions(1);
    const provider = createTestProvider();

    const filter = await provider.request({
      method: EthMethod.eth_newFilter,
      params: [{ topics: ['0x123'] }],
    });

    await advanceBlocks(1);

    const result = await provider.request({
      method: EthMethod.eth_getFilterChanges,
      params: [filter],
    });

    expect(result).toEqual([{ topics: ['0x123'] }]);
  });

  test('can remove filters', async () => {
    expect.assertions(2);
    const provider = createTestProvider();

    const filter = await provider.request({
      method: EthMethod.eth_newFilter,
      params: [{ topics: ['0x123'] }],
    });

    await advanceBlocks(1);

    const result = await provider.request({
      method: EthMethod.eth_getFilterChanges,
      params: [filter],
    });

    expect(result).toEqual([{ topics: ['0x123'] }]);

    await advanceBlocks(1);

    await provider.request({
      method: EthMethod.eth_uninstallFilter,
      params: [filter],
    });

    expect(
      provider.request({
        method: EthMethod.eth_getFilterChanges,
        params: [filter],
      }),
    ).rejects.toMatchObject({ message: 'Subscription/filter not found for id: 0x1:0x01' });
  });

  test('can create filters on multiple chains', async () => {
    expect.assertions(4);
    const provider = createTestProvider();

    const filter1 = await provider.request({
      method: EthMethod.eth_newFilter,
      params: [{ topics: ['0x123'] }],
    });

    await provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [{ chainId: Goerli.chainId }],
    });

    const filter2 = await provider.request({
      method: EthMethod.eth_newFilter,
      params: [{ topics: ['0x123'] }],
    });

    await provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [{ chainId: Mainnet.chainId }],
    });

    await advanceBlocks(1);
    await advanceBlocks(0);

    const result1 = await provider.request({
      method: EthMethod.eth_getFilterChanges,
      params: [filter1],
    });

    const result2 = await provider.request({
      method: EthMethod.eth_getFilterChanges,
      params: [filter2],
    });

    expect(result1).toEqual([{ topics: ['0x123'] }]);
    expect(result2).toEqual([{ topics: ['0x123'] }]);

    await provider.request({
      method: EthMethod.eth_uninstallFilter,
      params: [filter1],
    });

    await provider.request({
      method: EthMethod.eth_uninstallFilter,
      params: [filter2],
    });

    expect(
      provider.request({
        method: EthMethod.eth_getFilterChanges,
        params: [filter1],
      }),
    ).rejects.toMatchObject({ message: 'Subscription/filter not found for id: 0x1:0x01' });

    expect(
      provider.request({
        method: EthMethod.eth_getFilterChanges,
        params: [filter2],
      }),
    ).rejects.toMatchObject({ message: 'Subscription/filter not found for id: 0x5:0x01' });
  });
});
