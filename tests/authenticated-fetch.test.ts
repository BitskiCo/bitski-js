import { InMemoryWebStorage, WebStorageStateStore } from 'oidc-client';
import mock from 'xhr-mock';
import { OAuthProviderIntegrationType } from '../src/auth/auth-provider';
import { OpenidAuthProvider } from '../src/auth/openid-auth-provider';
import { AuthenticatedFetchSubprovider } from '../src/subproviders/authenticated-fetch';
import { MockEngine } from './util/mock-engine';

const mockUser = {
  access_token: 'test-access-token',
  expired: false,
  expires_at: Math.floor(Date.now() / 1000) + 60,
  expires_in: 60,
  id_token: 'test-id-token',
  profile: null,
  scope: 'openid',
  scopes: [],
  session_state: null,
  state: null,
  toStorageString: jest.fn().mockReturnValue('{ "id_token": "test-id-token", "session_state": "test-session-state", "access_token": "test-access-token" }'),
  token_type: '',
};

const mockExpiredUser = {
  access_token: 'test-access-token',
  expired: false,
  expires_at: Math.floor(Date.now() / 1000) + 60,
  expires_in: 60,
  id_token: 'test-id-token',
  profile: null,
  scope: 'openid',
  scopes: [],
  session_state: null,
  state: null,
  toStorageString: jest.fn().mockReturnValue('{ "id_token": "test-id-token", "session_state": "test-session-state", "access_token": "test-access-token" }'),
  token_type: '',
};

const clientID = 'test-client-id';

function createAuthProvider(): OpenidAuthProvider {
  const store = new InMemoryWebStorage();
  const stateStore = new WebStorageStateStore({ prefix: 'bitski.', store });
  const otherSettings = {
    stateStore,
    userStore: stateStore,
  };
  return new OpenidAuthProvider(clientID, undefined, undefined, otherSettings);
}

function createInstance(authProvider: OpenidAuthProvider): AuthenticatedFetchSubprovider {
  return new AuthenticatedFetchSubprovider('https://localhost:56610/v1/web3/kovan', true, authProvider);
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

    jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(mockUser);
    return authProvider.signIn(OAuthProviderIntegrationType.POPUP).then((user) => {
      jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(user);

      const request = createRequest('eth_accounts', []);

      return engine.sendAsync(request, (error, value) => {
        expect(error).toBeNull();
        expect(value.result).toBe('foo');
        done();
      });
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

    jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(mockUser);
    return authProvider.signIn(OAuthProviderIntegrationType.POPUP).then((user) => {
      jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(user);

      const request = createRequest('eth_peerCount', []);
      return engine.sendAsync(request, (error, value) => {
        expect(error).toBeNull();
        expect(value.result).toBe('foo');
        done();
      });
    });
  });
});
