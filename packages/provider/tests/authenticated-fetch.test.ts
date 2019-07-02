import { AuthenticatedFetchSubprovider, ServerError } from '../src/index';
import { AccessTokenProvider } from '../src/index';
import { MockEngine } from './util/mock-engine';
import { createRequest } from './util/rpc-utils';

class MockProvider implements AccessTokenProvider {
  public loggedIn: boolean = true;

  public getAccessToken(): Promise<string> {
    if (this.loggedIn) {
      return Promise.resolve('test-access-token');
    }
    return Promise.reject(new Error('Not logged in'));
  }

  public invalidateToken(): Promise<void> {
    this.loggedIn = false;
    return Promise.resolve();
  }
}

function createFetchProvider(): AuthenticatedFetchSubprovider {
  const tokenProvider = new MockProvider();
  return new AuthenticatedFetchSubprovider('https://localhost:56610/v1/web3/kovan', true, tokenProvider, { 'X-API-KEY': 'test-client-id' });
}

function createEngine(fetchProvider: AuthenticatedFetchSubprovider): MockEngine {
  const engine = new MockEngine({ disableBlockTracking: true, disableCaching: true });
  engine.addProvider(fetchProvider);
  engine.start();
  return engine;
}

beforeEach(() => {
  // @ts-ignore
  fetch.resetMocks();
});

describe('handles authenticated sends', () => {
  test('should send request with headers when signed in', (done) => {
    const provider = createFetchProvider();
    const engine = createEngine(provider);

    // @ts-ignore
    fetch.mockResponse(JSON.stringify({
      id: 0,
      jsonrpc: '2.0',
      result: 'foo',
    }));

    // @ts-ignore
    const sendRequestSpy = jest.spyOn(provider, 'sendRequest');
    engine.send('eth_accounts', []).then((value) => {
      expect(sendRequestSpy).toHaveBeenCalled();
      const params = sendRequestSpy.mock.calls[0][0];
      expect(params.headers.Authorization).toBe('Bearer test-access-token');
      expect(params.headers['X-API-KEY']).toBe('test-client-id');
      expect(value).toBe('foo');
      done();
    });
  });

  test('forwards error when access token cannot be loaded for a request that requires one', (done) => {
    expect.assertions(1);
    const provider = createFetchProvider();
    const engine = createEngine(provider);
    provider.accessTokenProvider.loggedIn = false;

    engine.send('eth_accounts', []).catch((error) => {
      expect(error.message).toMatch(/Not logged in/);
      done();
    });
  });

  test('retries requests when receiving errors that match the criteria', (done) => {
    const provider = createFetchProvider();
    const engine = createEngine(provider);

    // @ts-ignore
    fetch.once('ECONNRESET', { status: 500 }).once('ECONNRESET', { status: 500 }).once(JSON.stringify({ id: 0, jsonrpc: '2.0', result: 'foo' }));

    return engine.send('eth_peerCount', []).then((value) => {
      expect(fetch.mock.calls.length).toBe(3);
      expect(value).toBe('foo');
      done();
    });
  });

  test('does not retry for non-retryable errors', (done) => {
    const provider = createFetchProvider();
    const engine = createEngine(provider);

    // @ts-ignore
    fetch.mockResponse(JSON.stringify({ error: { message: 'Not Authorized' }}));

    engine.send('eth_peerCount', []).catch((error) => {
      expect(fetch.mock.calls.length).toBe(1);
      expect(error.message).toMatch(/Not Authorized/);
      done();
    });
  });

  test('retries only 5 times', (done) => {
    const provider = createFetchProvider();
    const engine = createEngine(provider);

    // @ts-ignore
    fetch.mockReject(new Error('ECONNRESET'));
    // @ts-ignore
    const request = createRequest('eth_peerCount', []);

    return engine.send('eth_peerCount', []).catch((error) => {
      expect(error).toBeInstanceOf(ServerError);
      expect(error.code).toBe(200);
      expect(error.retried).toBe(true);
      expect(fetch.mock.calls.length).toBe(5);
      done();
    });
  });

  test('sends that dont require authentication should work without a user', (done) => {
    const provider = createFetchProvider();
    const engine = createEngine(provider);

    // @ts-ignore
    fetch.mockResponse(JSON.stringify({
      id: 0,
      jsonrpc: '2.0',
      result: 'foo',
    }));

    // @ts-ignore
    const sendRequestSpy = jest.spyOn(provider, 'sendRequest');

    engine.send('eth_peerCount', []).then((value) => {
      expect(sendRequestSpy).toHaveBeenCalled();
      const params = sendRequestSpy.mock.calls[0][0];
      expect(params.headers.Authorization).toBeUndefined();
      expect(params.headers['X-API-KEY']).toBe('test-client-id');
      expect(value).toBe('foo');
      done();
    });
  });

  test('unauthorized requests should request token invalidation', (done) => {
    const provider = createFetchProvider();
    const engine = createEngine(provider);

    // @ts-ignore
    fetch.mockResponse(JSON.stringify({
      error: {
        message: 'Not Authorized',
      },
      id: 0,
      jsonrpc: '2.0',
    }));

    // @ts-ignore
    const invalidateTokenSpy = jest.spyOn(provider.accessTokenProvider, 'invalidateToken');

    engine.send('eth_peerCount', []).catch((error) => {
      expect(invalidateTokenSpy).toHaveBeenCalled();
      expect(error).toBeDefined();
      done();
    });
  });
});
