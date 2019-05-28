import { RemoteAccountSubprovider } from '../src/subproviders/remote-accounts';
import { MockEngine } from './util/mock-engine';
import { MockTokenProvider } from './util/mock-token-provider';
import { createRequest } from './util/rpc-utils';

function createProvider() {
  const tokenProvider = new MockTokenProvider();
  const accountsProvider = new RemoteAccountSubprovider('https://test-api.bitski.com/v1/test', false, tokenProvider);
  const provider = new MockEngine([accountsProvider]);
  provider.start();
  return { provider, accountsProvider };
}

beforeEach(() => {
  // @ts-ignore
  fetch.resetMocks();
});

test('it requests accounts from bitski', (done) => {
  const { provider, accountsProvider } = createProvider();
  const request = createRequest('eth_accounts');
  // @ts-ignore
  // Fetch Mock isn't working for some weird reason. Perhaps because of cross-fetch in FetchSubprovider?
  // fetch.mockResponse(JSON.stringify({ result: ['0xf00'] }));
  // Alternative to mocking fetch:
  jest.spyOn(accountsProvider, 'handleAuthenticatedRequest').mockImplementation((payload, next, end) => {
    end(undefined, ['0xf00']);
  });
  provider.sendAsync(request, (error, response) => {
    expect(error).toBeNull();
    expect(response.result).toEqual(['0xf00']);
    done();
  });
});

test('it ignores other requests', (done) => {
  const { provider, accountsProvider } = createProvider();
  const request = createRequest('eth_coinbase');
  const handlerSpy = jest.spyOn(accountsProvider, 'handleAuthenticatedRequest');
  provider.sendAsync(request, () => {
    expect(handlerSpy).not.toBeCalled();
    done();
  });
});
