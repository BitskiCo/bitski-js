import { Bitski } from '../src/bitski';
import { BitskiProvider } from '../src/providers/bitski-provider';
import { OAuthProviderIntegrationType } from '../src/providers/oauth-http-provider';
import { InMemoryWebStorage, WebStorageStateStore } from '../node_modules/oidc-client';
import { UserManager, User, Log } from 'oidc-client';
import HttpProvider from 'web3-providers-http';
import mock from 'xhr-mock';

const dummyUser = {
  id_token: 'test-id-token',
  session_state: null,
  access_token: 'test-access-token',
  scope: 'openid',
  profile: null,
  expires_at: 0,
  expires_in: 1000000,
  expired: false,
  state: null,
  token_type: '',
  toStorageString: jest.fn().mockReturnValue('{ "id_token": "test-id-token", "session_state": "test-session-state", "access_token": "test-access-token" }'),
  scopes: []
};

const clientID = 'test-client-id';

function createInstance(): Bitski {
  const store = new InMemoryWebStorage();
    const stateStore = new WebStorageStateStore({ prefix: 'bitski.', store: store});
    const otherSettings = {
      userStore: stateStore,
      stateStore: stateStore,
    }
    return new Bitski(clientID, undefined, undefined, otherSettings);;
}

beforeEach(() => {
  mock.setup();
});

afterEach(() => {
  mock.teardown();
});

describe('initializing the sdk', () => {
  test('correctly sets client id', () => {
    const bitski = createInstance();
    expect(bitski.userManager['_settings'].client_id).toBe(clientID);
  });

  test('should call signinpopupCallback when window.opener exists', () => {
    Object.defineProperty(global, 'opener', { writable: true, value: {}});
    const bitski = createInstance();
  });
});

describe('getUser', () => {
  test('getUserOrSignIn should get user when signed in', () => {
    expect.assertions(1);
    const bitski = createInstance();
    jest.spyOn(bitski.userManager, 'getUser').mockResolvedValue(dummyUser);
    return bitski.getUserOrSignIn().then(user => {
      expect(user).toMatchObject(dummyUser);
    });
  });

  test('getUserOrSignIn should sign in when user is expired', () => {
    expect.assertions(1);
    const bitski = createInstance();
    jest.spyOn(bitski.userManager, 'getUser').mockResolvedValue({ expired: true });
    jest.spyOn(bitski.userManager, 'signinRedirect').mockResolvedValue(dummyUser);
    return bitski.getUserOrSignIn().then(user => {
      expect(user).toMatchObject(dummyUser);
    });
  });

  test('getUserOrSignIn should sign in when not signed in', () => {
    expect.assertions(2);
    const bitski = createInstance();
    jest.spyOn(bitski.userManager, 'getUser').mockRejectedValue(new Error('not signed in'));
    const signInSilentMock = jest.spyOn(bitski.userManager, 'signinSilent').mockResolvedValue(dummyUser);
    return bitski.getUserOrSignIn(OAuthProviderIntegrationType.SILENT).then(user => {
      expect(signInSilentMock).toHaveBeenCalled();
      expect(user).toMatchObject(dummyUser);
    });
  });
});

describe('signing in', () => {
  test('should handle popup sign in', () => {
    const bitski = createInstance();
    const mock = jest.spyOn(bitski.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return bitski.signIn(OAuthProviderIntegrationType.POPUP).then(user => {
      expect(user).toMatchObject(dummyUser);
      expect(mock).toHaveBeenCalled();
    });
  });

  test('should handle silent sign in', () => {
    const bitski = createInstance();
    const mock = jest.spyOn(bitski.userManager, 'signinSilent').mockResolvedValue(dummyUser);
    return bitski.signIn(OAuthProviderIntegrationType.SILENT).then(user => {
      expect(user).toMatchObject(dummyUser);
      expect(mock).toHaveBeenCalled();
    });
  });

  test('should prevent iframe sign in', () => {
    expect.assertions(1);
    const bitski = createInstance();
    const expectedError = 'iFrame sign-in not allowed with Bitski due to security issues. Please use popup method instead.';
    return expect(bitski.signIn(OAuthProviderIntegrationType.IFRAME)).rejects.toMatch(expectedError);
  });

  test('should post message to parent when didSignIn when in iframe', () => {
    const bitski = createInstance();
    const spy = jest.spyOn(bitski, 'isInFrame').mockReturnValue(true);
    const parentSpy = jest.spyOn(window.parent, 'postMessage');
    bitski['setUser'].call(bitski, dummyUser);
    expect(spy).toHaveBeenCalled();
    expect(parentSpy).toHaveBeenCalledWith(dummyUser, '*');
  });
});

describe('receives events from user manager', () => {
  test('didSetUser should be called when user is received', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider();
    jest.spyOn(bitski.userManager, 'getUser').mockResolvedValue(dummyUser);
    bitski.userManager.events.load(dummyUser);
    expect(bitski['cachedUser']).toMatchObject(dummyUser);
    expect(provider.isAuthenticated).toBe(true);
  });

  test('didUnsetUser should be called when access token is revoked', () => {
    expect.assertions(3);
    const bitski = createInstance();
    const provider = bitski.getProvider();
    const accessTokenSpy = jest.spyOn(provider, 'setAccessToken');
    return bitski.userManager.removeUser().then(() => {
      expect(bitski['cachedUser']).toBeUndefined();
      expect(accessTokenSpy).toBeCalledWith(undefined);
      expect(provider.isAuthenticated).toBe(false);
    });
  });
});

describe('managing providers', () => {
  test('should get mainnet provider by default', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider();
    expect(provider).toBeDefined();
    expect(provider['networkName']).toBe('mainnet');
  });

  test('should create new provider if one doesnt yet exist', () => {
    const bitski = createInstance();
    expect(bitski['providers'].size).toBe(0);
    const provider = bitski.getProvider('kovan');
    expect(bitski['providers'].size).toBe(1);
    expect(provider['networkName']).toBe('kovan');
  });

  test('should not create a new provider if one already exists for that network', () => {
    const bitski = createInstance();
    const mockProvider = new BitskiProvider('foo');
    bitski['providers'].set('kovan', mockProvider);
    const provider = bitski.getProvider('kovan');
    expect(provider['networkName']).toBe('foo');
  });

  test('should create regular HTTPProvider when passing host string', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider('http://localhost:7545');
    expect(provider).toBeInstanceOf(HttpProvider);
    expect(provider.host).toBe('http://localhost:7545');
  });

  test('should set access token on all providers after getting the user', () => {
    expect.assertions(6);
    const bitski = createInstance();
    const getUserMock = jest.spyOn(bitski.userManager, 'getUser').mockResolvedValue(dummyUser);
    const provider = bitski.getProvider();
    expect(provider.isAuthenticated).toBe(false);
    const didSignInSpy = jest.spyOn(provider, 'setAccessToken');
    return bitski.getUser().then(user => {
      expect(user).toMatchObject(dummyUser);
      expect(getUserMock).toHaveBeenCalled();
      expect(didSignInSpy).toHaveBeenCalled();
      expect(provider.isAuthenticated).toBe(true);
      expect(provider.accessToken.token).toMatch(dummyUser.access_token);
    });
  });

  test('should set currentUser when creating a provider after already signed in', () => {
    expect.assertions(4);
    const bitski = createInstance();
    jest.spyOn(bitski.userManager, 'signinRedirect').mockResolvedValue(dummyUser);
    return bitski.signIn().then(() => {
      expect(bitski['providers'].size).toBe(0);
      expect(bitski['cachedUser']).toMatchObject(dummyUser);
      const provider = bitski.getProvider();
      expect(provider.accessToken.token).toMatch(dummyUser.access_token);
      expect(provider.isAuthenticated).toBe(true);
    });
  });

  test('should lock existing providers when signin fails', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider();
    const accessTokenSpy = jest.spyOn(provider, 'setAccessToken');
    jest.spyOn(bitski.userManager, 'signinRedirect').mockRejectedValue('foo');
    return bitski.signIn().catch(() => {
      expect(accessTokenSpy).toBeCalledWith(undefined);
      expect(provider.isAuthenticated).toBe(false);
    });
  });
});

describe('sign in callback', () => {
  test('sign in callback should default to redirect', () => {
    const bitski = createInstance();
    const mock = jest.spyOn(bitski.userManager, 'signinRedirectCallback').mockResolvedValue(dummyUser);
    return bitski.signInCallback(null).then(() => {
      expect(mock).toBeCalled();
    });
  });

  test('sign in callback should respect passed authentication type', () => {
    const bitski = createInstance();
    const mock = jest.spyOn(bitski.userManager, 'signinSilentCallback').mockResolvedValue(dummyUser);
    return bitski.signInCallback(OAuthProviderIntegrationType.SILENT).then(() => {
      expect(mock).toBeCalled();
    });
  });
});

describe('sign out', () => {
  test('should clear user on bitski instance', () => {
    const bitski = createInstance();
    jest.spyOn(bitski.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return bitski.signIn(OAuthProviderIntegrationType.POPUP).then(() => {
      return bitski.signOut().then(() => {
        expect(bitski['cachedUser']).toBeUndefined();
      });
    });
  });

  test('should clear access token from providers', () => {
    const bitski = createInstance();
    jest.spyOn(bitski.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return bitski.signIn(OAuthProviderIntegrationType.POPUP).then(() => {
      const mainnetProvider = bitski.getProvider('mainnet');
      const kovanProvider = bitski.getProvider('kovan');

      expect(mainnetProvider.accessToken).toBeDefined();
      expect(kovanProvider.accessToken).toBeDefined();

      return bitski.signOut().then(() => {
        expect(mainnetProvider.accessToken).toBeUndefined();
        expect(kovanProvider.accessToken).toBeUndefined();
      });
    });
  });
});

test('should be able to create connect button', () => {
  const bitski = createInstance();
  const connectButton = bitski.getConnectButton();
  expect(connectButton).toBeDefined();
  expect(connectButton.element.onclick).toBeDefined();
});

describe('setting up web3', () => {
  test('should be able to create web3', () => {
    const bitski = createInstance();

    mock.post('https://api.bitski.com/v1/web3/mainnet', (req, res) => {
      return res.status(200).body('{ "jsonrpc": "2.0", "id": 1, "result": ["0xD11Aa575f9C6f30bEDF392872726b2B157C83131"] }');
    });

    jest.spyOn(bitski.userManager, 'signinPopup').mockResolvedValue(dummyUser);

    return bitski.signIn(OAuthProviderIntegrationType.POPUP).then(user => {
      const web3 = bitski.getWeb3();
      expect(web3.currentProvider).toBeInstanceOf(BitskiProvider);
    });
  });

  test('should catch errors when trying to set defaultAccount', () => {
    const bitski = createInstance();

    mock.post('https://api.bitski.com/v1/web3/mainnet', (req, res) => {
      return res.status(422).body('{ "error": "Not authorized" }');
    });

    jest.spyOn(bitski.userManager, 'signinSilent').mockResolvedValue(dummyUser);

    return bitski.signIn(OAuthProviderIntegrationType.SILENT).then(user => {
      let web3 = null;
      expect(() => { web3 = bitski.getWeb3() }).not.toThrow();
      expect(web3).not.toBeNull();
      expect(web3.eth.defaultAccount).toBeNull();
    });
  });
});

test('should be able to set logger and log level', () => {
  const bitski = createInstance();
  bitski.setLogger(console);
  expect(Log.logger).toBe(console);

  bitski.setLogger(console, Log.DEBUG);
  expect(Log.level).toBe(Log.DEBUG);

  bitski.setLogger(console, Log.NONE);
});
