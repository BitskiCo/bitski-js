import { AuthenticatedCacheSubprovider } from '../src/subproviders/authenticated-cache';
import { InMemoryWebStorage, WebStorageStateStore } from 'oidc-client';
import { OpenidAuthProvider } from '../src/auth/openid-auth-provider';

const mockUser = {
  access_token: 'test-access-token',
  expired: false,
  expires_at: Math.floor(Date.now() / 1000) + 60,
  expires_in: 60,
  id_token: 'test-id-token',
  profile: {
    accounts: ['test-account']
  },
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

describe('authorization handler', () => {

  test('it ignores methods outside of scope', (done) => {
    const authProvider = createAuthProvider();
    const provider = new AuthenticatedCacheSubprovider(authProvider);
    const payload = {
      jsonrpc: '2.0',
      id: 0,
      method: 'foo',
      params: []
    };

    const next = () => {
      done();
    }

    const end = (error, value) => {
      done.fail('end() should not be called');
    }

    provider.handleRequest(payload, next, end);
  });

  test('it forwards calls when no cached data is available', (done) => {
    const authProvider = createAuthProvider();

    // getUser will return undefined
    const getUserSpy = jest.spyOn(authProvider, 'getUser');
    getUserSpy.mockResolvedValue(undefined);

    const provider = new AuthenticatedCacheSubprovider(authProvider);

    const payload = {
      jsonrpc: '2.0',
      id: 0,
      method: 'eth_accounts',
      params: []
    };

    const next = () => {
      done();
    }

    const end = (error, value) => {
      done.fail('end() should not be called');
    }

    provider.handleRequest(payload, next, end);
  });

  test('it handles calls when cached data is available in memory', (done) => {
    expect.assertions(2);

    const authProvider = createAuthProvider();

    const provider = new AuthenticatedCacheSubprovider(authProvider);

    provider.cachedValues.set('eth_accounts', ['1234']);

    const payload = {
      jsonrpc: '2.0',
      id: 0,
      method: 'eth_accounts',
      params: []
    };

    const next = () => {
      done.fail('next() should not have been called');
    }

    const end = (error, value) => {
      expect(error).toBeUndefined();
      expect(value).toEqual(['1234']);
      done();
    }

    provider.handleRequest(payload, next, end);
  });

  test('it handles calls when cached data is available in auth provider', (done) => {
    expect.assertions(2);
    const authProvider = createAuthProvider();

    // getUser will return mock user with accounts
    const getUserSpy = jest.spyOn(authProvider, 'getUser').mockResolvedValue(mockUser);

    const provider = new AuthenticatedCacheSubprovider(authProvider);

    const payload = {
      jsonrpc: '2.0',
      id: 0,
      method: 'eth_accounts',
      params: []
    };

    const next = () => {
      done.fail('next() should not have been called');
    }

    const end = (error, value) => {
      expect(error).toBeUndefined();
      expect(value).toEqual(['test-account']);
      done();
    }

    provider.handleRequest(payload, next, end);
  });

  test('it forwards calls when cached data is not available in auth provider', (done) => {
    const authProvider = createAuthProvider();

    // getUser will return user with no accounts value
    let user = mockUser;
    delete user.profile.accounts;
    const getUserSpy = jest.spyOn(authProvider, 'getUser').mockResolvedValue(user);

    const provider = new AuthenticatedCacheSubprovider(authProvider);

    const payload = {
      jsonrpc: '2.0',
      id: 0,
      method: 'eth_accounts',
      params: []
    };

    const next = () => {
      done();
    }

    const end = (error, value) => {
      done.fail('end() should not be called');
    }

    provider.handleRequest(payload, next, end);
  });

  test('it forwards calls when skipCache is set in the payload', (done) => {
    expect.assertions(1);
    const authProvider = createAuthProvider();

    // getUser will return user with no accounts value
    const getUserSpy = jest.spyOn(authProvider, 'getUser').mockResolvedValue(mockUser);

    const provider = new AuthenticatedCacheSubprovider(authProvider);

    const payload = {
      jsonrpc: '2.0',
      id: 0,
      method: 'eth_accounts',
      skipCache: true,
      params: []
    };

    const next = () => {
      expect(getUserSpy).not.toHaveBeenCalled();
      done();
    }

    const end = (error, value) => {
      done.fail('end() should not be called');
    }

    provider.handleRequest(payload, next, end);
  });

  test('it forwards calls when encountering errors loading user', (done) => {
    expect.assertions(1);
    const authProvider = createAuthProvider();

    // getUser will return user with no accounts value
    const getUserSpy = jest.spyOn(authProvider, 'getUser').mockRejectedValue(new Error('Unauthorized'));

    const provider = new AuthenticatedCacheSubprovider(authProvider);

    const payload = {
      jsonrpc: '2.0',
      id: 0,
      method: 'eth_accounts',
      params: []
    };

    const next = () => {
      expect(getUserSpy).toHaveBeenCalled();
      done();
    }

    const end = (error, value) => {
      done.fail('end() should not be called');
    }

    provider.handleRequest(payload, next, end);
  });

});
