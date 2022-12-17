import { EthEvent, EthMethod } from 'eth-provider-types';
import { toHex } from '../../src/utils/parse-utils';
import { sleep } from '../util/async';
import { createTestProvider } from '../util/create-provider';
import fetchMock from 'jest-fetch-mock';
import { Goerli } from '../../src/constants';
import { clearLegacyProviders } from '../../src/utils/legacy-middleware';

let currentBlockNumber = 1;

const advanceBlocks = async (numBlocks: number) => {
  jest.runAllTimers();
  await sleep(0);

  currentBlockNumber += numBlocks;
  // Wait for block poller to start
  jest.runAllTimers();
  await sleep(0);
};

describe('subscription middleware', () => {
  beforeEach(() => {
    clearLegacyProviders();
    jest.useFakeTimers();

    fetchMock.resetMocks();

    fetchMock.mockResponse(async (req) => {
      if (req.url.includes(EthMethod.eth_blockNumber)) {
        return JSON.stringify({ result: toHex(currentBlockNumber) });
      } else {
        return JSON.stringify({
          result: {
            number: toHex(currentBlockNumber),
          },
        });
      }
    });
  });

  test('it has support for subscriptions', () => {
    const provider = createTestProvider();
    expect(provider.supportsSubscriptions()).toBe(true);
  });

  test('it can subscribe to events', async () => {
    expect.assertions(4);

    const provider = createTestProvider();
    const subscription = await provider.request({
      method: EthMethod.eth_subscribe,
      params: ['newHeads'],
    });

    provider.on(EthEvent.message, (message) => {
      expect(message.type).toBe('eth_subscription');
      expect(message.data).toEqual(
        expect.objectContaining({
          subscription,
          result: {
            number: toHex(currentBlockNumber),
          },
        }),
      );
    });

    // Wait for block poller to poll again
    await advanceBlocks(1);

    // Wait but don't update
    await advanceBlocks(0);

    provider.destroy();
  });

  test('it can unsubscribe from events', async () => {
    expect.assertions(4);

    const provider = createTestProvider();

    const subscription = await provider.request({
      method: EthMethod.eth_subscribe,
      params: ['newHeads'],
    });

    provider.on(EthEvent.message, (message) => {
      expect(message.type).toBe('eth_subscription');
      expect(message.data).toEqual(
        expect.objectContaining({
          subscription,
          result: {
            number: toHex(currentBlockNumber),
          },
        }),
      );
    });

    // Wait for block poller to start
    await advanceBlocks(1);

    await provider.request({
      method: EthMethod.eth_unsubscribe,
      params: [subscription],
    });

    // Wait for block poller to poll again
    await advanceBlocks(1);

    // Wait but don't update
    await advanceBlocks(0);

    provider.destroy();
  });

  test('it re-emits data events for backwards compatibility', async () => {
    expect.assertions(2);

    const provider = createTestProvider();

    const subscription = await provider.request({
      method: EthMethod.eth_subscribe,
      params: ['newHeads'],
    });

    provider.on(EthEvent.data, (err, message) => {
      expect(message.params).toEqual(
        expect.objectContaining({
          subscription,
          result: {
            number: toHex(currentBlockNumber),
          },
        }),
      );
    });

    // Wait for block poller to start
    await advanceBlocks(1);

    await provider.request({
      method: EthMethod.eth_unsubscribe,
      params: [subscription],
    });

    // Wait for block poller to poll again
    await advanceBlocks(1);

    // Wait but don't update
    await advanceBlocks(0);

    provider.destroy();
  });

  test('it can subscribe to events on multiple chains', async () => {
    expect.assertions(8);

    const provider = createTestProvider();
    const subscription = await provider.request({
      method: EthMethod.eth_subscribe,
      params: ['newHeads'],
    });

    await provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [{ chainId: Goerli.chainId }],
    });

    const subscription2 = await provider.request({
      method: EthMethod.eth_subscribe,
      params: ['newHeads'],
    });

    provider.on(EthEvent.message, (message) => {
      expect(message.type).toBe('eth_subscription');
      expect(message.data).toEqual(
        expect.objectContaining({
          subscription: expect.stringMatching(new RegExp(`^${subscription}|${subscription2}$`)),
          result: {
            number: toHex(currentBlockNumber),
          },
        }),
      );
    });

    // Wait for block poller to poll again
    await advanceBlocks(1);

    await provider.request({
      method: EthMethod.eth_unsubscribe,
      params: [subscription],
    });

    await provider.request({
      method: EthMethod.eth_unsubscribe,
      params: [subscription2],
    });

    await advanceBlocks(1);
    await advanceBlocks(1);
    await advanceBlocks(1);
    await advanceBlocks(1);
    await advanceBlocks(1);

    // Wait but don't update
    await advanceBlocks(0);

    provider.destroy();
  });
});
