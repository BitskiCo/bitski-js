import { Bitski } from '../src/bitski';
import { BitskiProvider } from '../src/providers/bitski-provider';
import { OAuthProviderIntegrationType } from '../src/providers/oauth-http-provider';
import { InMemoryWebStorage, WebStorageStateStore } from '../node_modules/oidc-client';
import { UserManager, User, Log } from 'oidc-client';
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

  test('locked when not signed in', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider();
    expect(provider.locked).toBe(true);
  });

  test('should prevent iframe sign in', () => {
    expect.assertions(1);
    const bitski = createInstance();
    const expectedError = 'iFrame sign-in not allowed with Bitski due to security issues. Please use popup method instead.';
    return expect(bitski.signIn(0)).rejects.toMatch(expectedError);
  });

  test('correctly sets user and unlocks after signing in', () => {
    expect.assertions(4);
    const bitski = createInstance();
    const signInSpy = jest.spyOn(bitski.userManager, 'signinRedirect').mockResolvedValue(dummyUser);
    const provider = bitski.getProvider();
    expect(provider.locked).toBe(true);
    return bitski.signIn().then(user => {
      expect(user).toMatchObject(dummyUser);
      expect(provider.locked).toBe(false);
      expect(provider.currentUser).toMatchObject(dummyUser);
    });
  });

  test('should get user when signed in', () => {
    expect.assertions(1);
    const bitski = createInstance();
    jest.spyOn(bitski.userManager, 'getUser').mockResolvedValue(dummyUser);
    return bitski.getUserOrSignIn().then(user => {
      expect(user).toMatchObject(dummyUser);
    });
  });

  describe('handles all login methods', () => {
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
  });

  test('should call signinpopupCallback when window.opener exists', () => {
    Object.defineProperty(global, 'opener', { writable: true, value: {}});
    const bitski = createInstance();
  });

  test('should call didSignIn on all providers after getting the user', () => {
    expect.assertions(3);
    const bitski = createInstance();
    const getUserMock = jest.spyOn(bitski.userManager, 'getUser').mockResolvedValue(dummyUser);
    const provider = bitski.getProvider();
    const didSignInSpy = jest.spyOn(provider, 'didSignIn');
    return bitski.getUser().then(user => {
      expect(user).toMatchObject(dummyUser);
      expect(getUserMock).toHaveBeenCalled();
      expect(didSignInSpy).toHaveBeenCalled();
    });
  });

  test('should return existing instances of bitski provider', () => {
    const bitski = createInstance();
    const mockProvider = new BitskiProvider('foo', bitski.userManager);
    bitski['providers'].set('kovan', mockProvider);
    const provider = bitski.getProvider('kovan');
    expect(provider['networkName']).toBe('foo');
  });

  test('sign in callback should call user manager', () => {
    const bitski = createInstance();
    const mock = jest.spyOn(bitski.userManager, 'signinRedirectCallback').mockResolvedValue(dummyUser);
    return bitski.signInCallback(OAuthProviderIntegrationType.REDIRECT).then(() => {
      expect(mock).toBeCalled();
    });
  });

  test('sign in callback should respect passed authentication type', () => {
    const bitski = createInstance();
    const mock = jest.spyOn(bitski.userManager, 'signinPopupCallback').mockResolvedValue(dummyUser);
    return bitski.signInCallback(OAuthProviderIntegrationType.POPUP).then(() => {
      expect(mock).toBeCalled();
    });
  });

  test('sign in callback should default to silent', () => {
    const bitski = createInstance();
    const mock = jest.spyOn(bitski.userManager, 'signinSilentCallback').mockResolvedValue(dummyUser);
    return bitski.signInCallback(null).then(() => {
      expect(mock).toBeCalled();
    });
  });

  test('didSetUser should be called when user is received', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider();
    jest.spyOn(bitski.userManager, 'getUser').mockResolvedValue(dummyUser);
    bitski.userManager.events.load(dummyUser);
    expect(bitski['cachedUser']).toMatchObject(dummyUser);
    expect(provider.locked).toBe(false);
  });

  test('didUnsetUser should be called when access token is revoked', () => {
    expect.assertions(2);
    const bitski = createInstance();
    const provider = bitski.getProvider();
    provider.locked = false;
    return bitski.userManager.removeUser().then(() => {
      expect(bitski['cachedUser']).toBeUndefined();
      expect(provider.locked).toBe(true);
    });
  });

  test('should sign in when user is expired', () => {
    expect.assertions(1);
    const bitski = createInstance();
    jest.spyOn(bitski.userManager, 'getUser').mockResolvedValue({ expired: true });
    jest.spyOn(bitski.userManager, 'signinRedirect').mockResolvedValue(dummyUser);
    return bitski.getUserOrSignIn().then(user => {
      expect(user).toMatchObject(dummyUser);
    });
  });

  test('should log in when not signed in', () => {
    expect.assertions(1);
    const bitski = createInstance();
    jest.spyOn(bitski.userManager, 'getUser').mockRejectedValue(new Error('not signed in'));
    jest.spyOn(bitski.userManager, 'signinRedirect').mockResolvedValue(dummyUser);
    return bitski.getUserOrSignIn().then(user => {
      expect(user).toMatchObject(dummyUser);
    });
  });

  test('should get connect button', () => {
    const bitski = createInstance();
    const connectButton = bitski.getConnectButton();
    expect(connectButton).toBeDefined();
    expect(connectButton.element.onclick).toBeDefined();
  });

  test('should get default provider', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider();
    expect(provider).toBeDefined();
    expect(provider['networkName']).toBe('mainnet');
  });

  test('should create new provider if one doesnt yet exist', () => {
    const bitski = createInstance();
    expect(bitski['providers'].size).toBe(0);
    const provider = bitski.getProvider('foo');
    expect(bitski['providers'].size).toBe(1);
    expect(provider['networkName']).toBe('foo');
  });

  test('should set currentUser when creating a provider after already signed in', () => {
    expect.assertions(4);
    const bitski = createInstance();
    jest.spyOn(bitski.userManager, 'signinRedirect').mockResolvedValue(dummyUser);
    return bitski.signIn().then(() => {
      expect(bitski['providers'].size).toBe(0);
      expect(bitski['cachedUser']).toMatchObject(dummyUser);
      const provider = bitski.getProvider();
      expect(provider.currentUser).toMatchObject(dummyUser);
      expect(provider.locked).toBe(false);
    });
  });

  test('should lock existing providers when signin fails', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider();
    provider.locked = false;
    jest.spyOn(bitski.userManager, 'signinRedirect').mockRejectedValue('foo');
    return bitski.signIn().catch(() => {
      expect(provider.locked).toBe(true);
    });
  });

  test('should get web3', () => {
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

  test('should set logger and log level', () => {
    const bitski = createInstance();
    bitski.setLogger(console);
    expect(Log.logger).toBe(console);
    expect(Log.level).toBe(Log.INFO);

    bitski.setLogger(console, Log.DEBUG);
    expect(Log.level).toBe(Log.DEBUG);

    bitski.setLogger(console, Log.NONE);
  });
});
