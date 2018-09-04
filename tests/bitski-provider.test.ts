import { AccessToken } from '../src/access-token';
import { BitskiProvider } from '../src/providers/bitski-provider';
import { OAuthProviderIntegrationType } from '../src/providers/oauth-http-provider';
import mock from 'xhr-mock';
import { BitskiProviderSettings } from '../src/providers/bitski-provider-settings';

function createProvider(networkName?: string): BitskiProvider {
  const settings = new BitskiProviderSettings('test', 'test-client-id');
  return new BitskiProvider(networkName, settings);
}

function createRequest(method: string, params: any[]): any {
  return {
    jsonrpc: '2.0',
    method: method,
    params: params,
    id: 0
  };
}

const mockAccessToken = new AccessToken('test-access-token', Math.floor(Date.now() / 1000) + 60);
const mockExpiredAccessToken = new AccessToken('test-access-token', Math.floor(Date.now() / 1000));

beforeEach(() => {
  mock.setup();
});

afterEach(() => {
  mock.teardown();
});

describe('should handle signed in state', () => {
  test('should lock when setting null access token', () => {
    expect.assertions(2);
    const provider = createProvider();
    provider.setAccessToken(mockAccessToken);
    expect(provider.isAuthenticated).toBe(true);
    provider.setAccessToken(null);
    expect(provider.isAuthenticated).toBe(false);
  });

  test('should lock when setting an expired access token', () => {
    expect.assertions(1);
    const provider = createProvider();
    provider.setAccessToken(mockExpiredAccessToken);
    expect(provider.isAuthenticated).toBe(false);
  });
});

describe('handles authenticated sends', () => {
  test('should send request with headers when signed in', () => {
    expect.assertions(5);

    const provider = createProvider();

    mock.post('https://api.bitski.com/v1/web3/mainnet', (req, res) => {
      expect(req.header('Authorization')).toBe('Bearer test-access-token');
      return res.status(200).body('{ "jsonrpc": "2.0", "id": 0, "result": "foo" }');
    });

    provider.setAccessToken(mockAccessToken);
    expect(provider.isAuthenticated).toBe(true);
    expect(provider.accessToken).toBeDefined();
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

    mock.post('https://api.bitski.com/v1/web3/mainnet', (req, res) => {
      expect(req.header('Authorization')).toBe('Bearer test-access-token');
      return res.status(200).body('{ "jsonrpc": "2.0", "id": 0, "result": "foo" }');
    });

    provider.setAccessToken(mockAccessToken);
  });

  test('sends that dont require authentication should work without a user', done => {
    expect.assertions(3);

    const provider = createProvider();

    const request = createRequest('eth_peerCount', ['0x0']);
    provider['requiresAuthentication'] = jest.fn().mockReturnValue(false);

    mock.post('https://api.bitski.com/v1/web3/mainnet', (req, res) => {
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

    provider.setAccessToken(mockAccessToken);
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
    provider.setAccessToken(mockAccessToken);
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
    provider.setAccessToken(mockAccessToken);
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

    const mockWindow = { focus: function() {} };
    jest.spyOn(window, 'open').mockImplementation(() => { return mockWindow });

    provider.setAccessToken(mockAccessToken);
    provider.send(request, (error, value) => {});
    expect(provider['currentTransactionWindow']).toMatchObject(mockWindow);
  });

  test('Popup: should close existing window if one is already open', () => {
    expect.assertions(1);

    const provider = createProvider();
    provider.authorizationIntegrationType = OAuthProviderIntegrationType.POPUP;
    const request = createRequest('eth_sign', []);

    const mockWindow = { focus: function() {} };
    jest.spyOn(window, 'open').mockImplementation(() => { return mockWindow });

    provider.setAccessToken(mockAccessToken);
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

    const locationMock = window.location.assign = jest.fn();

    provider.setAccessToken(mockAccessToken);
    provider.send(request, (error, value) => {});
    expect(locationMock).toHaveBeenCalledTimes(1);
    expect(locationMock.mock.calls[0][0]).toMatch(/eth-send-transaction\?/);
  });

  test('Silent: should throw error when authorization type is SILENT', done => {
    expect.assertions(2);
    const provider = createProvider();
    provider.authorizationIntegrationType = OAuthProviderIntegrationType.SILENT;
    const request = createRequest('eth_sendTransaction', []);
    provider.setAccessToken(mockAccessToken);
    provider.send(request, (error, value) => {
      expect(error).toBeDefined();
      expect(error.message).toMatch('Silent authorization requests are not allowed');
      done();
    });
  });
});
