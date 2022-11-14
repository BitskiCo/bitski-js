import { EthEvent, EthMethod } from 'eth-provider-types';
import { Goerli, Mainnet } from '../src/constants';
import { sleep } from './util/async';
import { createTestProvider } from './util/create-provider';

describe('connect event', () => {
  test('emits connect event when initialized', async () => {
    expect.assertions(1);
    const provider = createTestProvider();

    provider.on(EthEvent.connect, ({ chainId }) => {
      expect(chainId).toBe(Mainnet.chainId);
    });

    // wait for listener to be called
    await sleep(10);
  });

  test('passes the correct chain id on connect event', async () => {
    expect.assertions(1);
    const provider = createTestProvider();

    await provider.request({
      method: EthMethod.wallet_switchEthereumChain,
      params: [{ chainId: Goerli.chainId }],
    });

    provider.on(EthEvent.connect, ({ chainId }) => {
      expect(chainId).toBe(Goerli.chainId);
    });

    // wait for listener to be called
    await sleep(10);
  });

  test('emits connect event only after first listener for connect is added', async () => {
    expect.assertions(1);
    const provider = createTestProvider();

    // sleep a random amount of time before adding the listener
    await sleep(123);

    provider.on(EthEvent.connect, ({ chainId }) => {
      expect(chainId).toBe(Mainnet.chainId);
    });

    // wait for listener to be called
    await sleep(10);
  });
});
