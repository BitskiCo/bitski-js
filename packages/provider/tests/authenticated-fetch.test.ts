import { InMemoryWebStorage, WebStorageStateStore } from 'oidc-client';
import mock from 'xhr-mock';
import { AuthenticatedFetchSubprovider } from '../src/subproviders/authenticated-fetch';
import { MockEngine } from './util/mock-engine';
import { AccessTokenProvider } from '../dist';

const clientID = 'test-client-id';

class MockProvider implements AccessTokenProvider {
  public getAccessToken(): Promise<string> {
    return Promise.resolve('test-access-token');
  }
}

function createAuthProvider() {
  return new MockProvider();
}

function createInstance(tokenProvider: AccessTokenProvider): AuthenticatedFetchSubprovider {
  return new AuthenticatedFetchSubprovider('https://localhost:56610/v1/web3/kovan', true, tokenProvider, { 'X-API-KEY': 'test-client-id' });
}

function createRequest(method: string, params: any[]): any {
  return {
    id: 0,
    jsonrpc: '2.0',
    method,
    params,
  };
}

beforeEach(() => {
  mock.setup();
  // fetch.resetMocks();
});

afterEach(() => {
  mock.teardown();
});

describe('handles authenticated sends', () => {
  test('should send request with headers when signed in', (done) => {
    const authProvider = createAuthProvider();
    const instance = createInstance(authProvider);
    const engine = new MockEngine();
    engine.addProvider(instance);

    // @ts-ignore
    fetch.mockResponse(JSON.stringify({
      id: 0,
      jsonrpc: '2.0',
      result: 'foo',
    }));
    const sendRequestSpy = jest.spyOn(instance, 'sendRequest');
    const request = createRequest('eth_accounts', []);
    return engine.sendAsync(request, (error, value) => {
      expect(sendRequestSpy).toHaveBeenCalled();
      const params = sendRequestSpy.mock.calls[0][0];
      expect(params.headers['Authorization']).toBe('Bearer test-access-token');
      expect(params.headers['X-API-KEY']).toBe('test-client-id');
      expect(error).toBeNull();
      expect(value.result).toBe('foo');
      done();
    });
  });

  test('sends that dont require authentication should work without a user', (done) => {
    const authProvider = createAuthProvider();
    const instance = createInstance(authProvider);
    const engine = new MockEngine();
    engine.addProvider(instance);

    // @ts-ignore
    fetch.mockResponse(JSON.stringify({
      id: 0,
      jsonrpc: '2.0',
      result: 'foo',
    }));
    const sendRequestSpy = jest.spyOn(instance, 'sendRequest');
    const request = createRequest('eth_peerCount', []);
    return engine.sendAsync(request, (error, value) => {
      expect(sendRequestSpy).toHaveBeenCalled();
      const params = sendRequestSpy.mock.calls[0][0];
      expect(params.headers['Authorization']).toBeUndefined();
      expect(params.headers['X-API-KEY']).toBe('test-client-id');
      expect(error).toBeNull();
      expect(value.result).toBe('foo');
      done();
    });
  });
});