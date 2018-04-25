import { BitskiProvider } from '../src/providers/bitski-provider';
import { OAuthProviderIntegrationType } from '../src/providers/oauth-http-provider';
import { UserManager, InMemoryWebStorage, WebStorageStateStore } from 'oidc-client';
import mock from 'xhr-mock';

function createProvider(networkName?: string): BitskiProvider {
  const store = new InMemoryWebStorage();
  const stateStore = new WebStorageStateStore({ prefix: 'bitski.', store: store});
  const settings = {
    userStore: stateStore,
    stateStore: stateStore,
  }
  const userManager = new UserManager(settings);
  return new BitskiProvider(networkName, userManager);
}

function createRequest(method: string, params: any[]): any {
  return {
    jsonrpc: '2.0',
    method: method,
    params: params,
    id: 0
  };
}

const mockUser = {
  id_token: 'test-id-token',
  session_state: 'test-session-state',
  access_token: 'test-access-token',
  scope: 'openid',
  profile: null,
  expires_at: 0,
  expires_in: null,
  expired: false,
  token_type: '',
  state: null,
  toStorageString: jest.fn(),
  scopes: []
};

beforeEach(() => {
  mock.setup();
});

afterEach(() => {
  mock.teardown();
});

describe('should handle sign in state', () => {
  test('should lock when calling didSignIn without a user', () => {
    expect.assertions(1);
    const provider = createProvider();
    provider.locked = false;
    provider.didSignIn(null);
    expect(provider.locked).toBe(true);
  });
});

describe('handles authenticated sends', () => {
  test('should send request with headers when signed in', () => {
    expect.assertions(5);

    const provider = createProvider();
    jest.spyOn(provider.userManager, 'getUser').mockResolvedValue(mockUser);

    mock.post('https://api.bitski.com/v1/web3/kovan', (req, res) => {
      expect(req.header('Authorization')).toBe('Bearer test-access-token');
      return res.status(200).body('{ "jsonrpc": "2.0", "id": 0, "result": "foo" }');
    });

    provider.didSignIn(mockUser);
    expect(provider.locked).toBe(false);
    expect(provider.currentUser).toBeDefined();
    const request = createRequest('eth_accounts', ['0x0']);
    return provider.sendAsync(request, (error, value) => {
      expect(error).toBeNull();
      expect(value.result).toBe('foo');
    });
  });

  test('sends when not authenticated should be cached and sent when logged in', done => {
    expect.assertions(5);

    const provider = createProvider();
    expect(provider['queuedSends'].length).toBe(0);

    const request = createRequest('eth_accounts', ['0x0']);
    provider.send(request, (error, value) => {
      expect(error).toBeNull();
      expect(value.result).toBe('foo');
      done();
    });
    expect(provider['queuedSends'].length).toBe(1);

    jest.spyOn(provider.userManager, 'getUser').mockResolvedValue(mockUser);

    mock.post('https://api.bitski.com/v1/web3/kovan', (req, res) => {
      expect(req.header('Authorization')).toBe('Bearer test-access-token');
      return res.status(200).body('{ "jsonrpc": "2.0", "id": 0, "result": "foo" }');
    });

    provider.didSignIn(mockUser);
  });

  test('sends that dont require authentication should work without a user', done => {
    expect.assertions(3);

    const provider = createProvider();

    const request = createRequest('eth_peerCount', ['0x0']);
    provider['requiresAuthentication'] = jest.fn().mockReturnValue(false);

    mock.post('https://api.bitski.com/v1/web3/kovan', (req, res) => {
      expect(req.header('Authorization')).toBeNull();
      return res.status(200).body('{ "jsonrpc": "2.0", "id": 0, "result": "foo" }');
    });

    provider.send(request, (error, value) => {
      expect(error).toBeNull();
      expect(value.result).toBe('foo');
      done();
    });
  });

  test('methods should always require authentication', () => {
    const provider = createProvider();
    //Specific example
    let result = provider['requiresAuthentication']('eth_coinbase');
    expect(result).toBe(true);
    //Generic example
    result = provider['requiresAuthentication']('foo');
    expect(result).toBe(true);
  });
});

describe('it handles sends with authorization', () => {
  test('Iframe: should show approval dialog by default', done => {
    expect.assertions(2);

    const provider = createProvider();
    const request = createRequest('eth_sendTransaction', []);
    jest.spyOn(provider.userManager, 'getUser').mockResolvedValue(mockUser);

    provider.didSignIn(mockUser);
    provider.send(request, (error, value) => {
      expect(value.result).toBe('foo');
      done();
    });
    expect(provider['currentTransactionDialog']).toBeDefined();
    const message = new MessageEvent('worker', {
      origin: 'https://www.bitski.com',
      data: {
        jsonrpc: '2.0',
        id: 0,
        result: 'foo'
      }
    });
    provider.receiveMessage(message);
  });

  test('Iframe: should ignore messages when from another host', () => {
    expect.assertions(1);
    const provider = createProvider();
    const mock = jest.fn();
    const request = createRequest('eth_sendTransaction', []);
    provider.didSignIn(mockUser);
    provider.send(request, (error, value) => {
      mock();
    });
    const message = new MessageEvent('worker', {
      origin: 'https://www.foo.com',
      data: {
        jsonrpc: '2.0',
        id: 0,
        result: 'foo'
      }
    });
    provider.receiveMessage(message);
    expect(mock).not.toHaveBeenCalled();
  });

  test('Iframe: should close existing dialog if one is already open', () => {
    expect.assertions(1);

    const provider = createProvider();
    const request = createRequest('eth_sendTransaction', []);
    jest.spyOn(provider.userManager, 'getUser').mockResolvedValue(mockUser);
    provider.didSignIn(mockUser)
    provider.send(request, () => {});
    const dismissMock = provider['currentTransactionDialog'].dismiss = jest.fn();
    provider.send(request, () => {});
    expect(dismissMock).toHaveBeenCalled();
  });

  test('Popup: should open window when authorization type is POPUP', () => {
    expect.assertions(1);

    const provider = createProvider();
    provider.authorizationIntegrationType = OAuthProviderIntegrationType.POPUP;
    const request = createRequest('eth_sendTransaction', []);
    jest.spyOn(provider.userManager, 'getUser').mockResolvedValue(mockUser);

    const mockWindow = { focus: function() {} };
    jest.spyOn(window, 'open').mockImplementation(() => { return mockWindow });

    provider.didSignIn(mockUser);
    provider.send(request, (error, value) => {});
    expect(provider['currentTransactionWindow']).toMatchObject(mockWindow);
  });

  test('Popup: should close existing window if one is already open', () => {
    expect.assertions(1);

    const provider = createProvider();
    provider.authorizationIntegrationType = OAuthProviderIntegrationType.POPUP;
    const request = createRequest('eth_sign', []);
    jest.spyOn(provider.userManager, 'getUser').mockResolvedValue(mockUser);

    const mockWindow = { focus: function() {} };
    jest.spyOn(window, 'open').mockImplementation(() => { return mockWindow });

    provider.didSignIn(mockUser)
    provider.send(request, (error, value) => {});
    const closeMock = provider['currentTransactionWindow'].close = jest.fn();
    provider.send(request, (error, value) => {});
    expect(closeMock).toHaveBeenCalled();
  });

  test('Redirect: should redirect when authorization type is REDIRECT', () => {
    expect.assertions(2);

    const provider = createProvider();
    provider.authorizationIntegrationType = OAuthProviderIntegrationType.REDIRECT;
    const request = createRequest('eth_sendTransaction', []);
    jest.spyOn(provider.userManager, 'getUser').mockResolvedValue(mockUser);

    const locationMock = window.location.assign = jest.fn();

    provider.didSignIn(mockUser);
    provider.send(request, (error, value) => {});
    expect(locationMock).toHaveBeenCalledTimes(1);
    expect(locationMock.mock.calls[0][0]).toMatch(/eth-send-transaction\?/);
  });

  test('Silent: should throw error when authorization type is SILENT', done => {
    expect.assertions(2);
    const provider = createProvider();
    provider.authorizationIntegrationType = OAuthProviderIntegrationType.SILENT;
    const request = createRequest('eth_sendTransaction', []);
    provider.didSignIn(mockUser)
    provider.send(request, (error, value) => {
      expect(error).toBeDefined();
      expect(error.message).toMatch('Silent authorization requests are not allowed');
      done();
    });
  });
});