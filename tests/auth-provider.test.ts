import { InMemoryWebStorage, WebStorageStateStore } from 'oidc-client';
import mock from 'xhr-mock';
import { OAuthProviderIntegrationType } from '../src/auth/auth-provider';
import { OpenidAuthProvider } from '../src/auth/openid-auth-provider';

const dummyUser = {
  access_token: 'test-access-token',
  expired: false,
  expires_at: 0,
  expires_in: 1000000,
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

function createInstance(): OpenidAuthProvider {
  const store = new InMemoryWebStorage();
  const stateStore = new WebStorageStateStore({ prefix: 'bitski.', store });
  const otherSettings = {
    stateStore,
    userStore: stateStore,
  };
  return new OpenidAuthProvider(clientID, undefined, undefined, otherSettings);
}

beforeEach(() => {
  if(localStorage) {
    localStorage.removeItem('bitski.isSignedIn');
  }
  mock.setup();
});

afterEach(() => {
  if(localStorage) {
    localStorage.removeItem('bitski.isSignedIn');
  }
  mock.teardown();
});

describe('initializing the sdk', () => {
  test('correctly sets client id', () => {
    const authProvider = createInstance();
    expect(authProvider.userManager['_settings'].client_id).toBe(clientID);
  });

  test('should call signinpopupCallback when window.opener exists', () => {
    Object.defineProperty(global, 'opener', { writable: true, value: {} });
    const authProvider = createInstance();
  });
});

describe('getUserOrSignIn', () => {
  test('getUserOrSignIn should get user when signed in', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(dummyUser);
    return authProvider.getUserOrSignIn().then((user) => {
      expect(user).toMatchObject(dummyUser);
    });
  });

  test('getUserOrSignIn should sign in when user is expired', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue({ expired: true });
    jest.spyOn(authProvider.userManager, 'signinRedirect').mockResolvedValue(dummyUser);
    return authProvider.getUserOrSignIn().then((user) => {
      expect(user).toMatchObject(dummyUser);
    });
  });

  test('getUserOrSignIn should sign in when not signed in', () => {
    expect.assertions(2);
    const authProvider = createInstance();
    jest.spyOn(authProvider.userManager, 'getUser').mockRejectedValue(new Error('not signed in'));
    const signInSilentMock = jest.spyOn(authProvider.userManager, 'signinSilent').mockResolvedValue(dummyUser);
    return authProvider.getUserOrSignIn(OAuthProviderIntegrationType.SILENT).then((user) => {
      expect(signInSilentMock).toHaveBeenCalled();
      expect(user).toMatchObject(dummyUser);
    });
  });
});

describe('getUser', () => {
  test('getUser should sign in silent if previously signed in', () => {
    const authProvider = createInstance();
    const signingPopupMock = jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return authProvider.signIn(OAuthProviderIntegrationType.POPUP).then((user) => {
      const signinSilentMock = jest.spyOn(authProvider.userManager, 'signinSilent').mockResolvedValue(dummyUser);
      return authProvider.getUser();
    }).then((user) => {
      expect(user).toMatchObject(dummyUser);
    });
  });

  test('getUser should return null if we haven\'nt signed in previously', () => {
    const authProvider = createInstance();
    return authProvider.getUser().then((user) => {
      expect(user).toBeNull();
    });
  });
});

describe('signing in', () => {
  test('should handle popup sign in', () => {
    const authProvider = createInstance();
    const signingPopupMock = jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return authProvider.signIn(OAuthProviderIntegrationType.POPUP).then((user) => {
      expect(user).toMatchObject(dummyUser);
      expect(signingPopupMock).toHaveBeenCalled();
    });
  });

  test('should handle silent sign in', () => {
    const authProvider = createInstance();
    const signinSilentMock = jest.spyOn(authProvider.userManager, 'signinSilent').mockResolvedValue(dummyUser);
    return authProvider.signIn(OAuthProviderIntegrationType.SILENT).then((user) => {
      expect(user).toMatchObject(dummyUser);
      expect(signinSilentMock).toHaveBeenCalled();
    });
  });

  test('should prevent iframe sign in', () => {
    const authProvider = createInstance();
    const expectedError = new Error('iFrame sign-in not allowed with Bitski due to security issues. Please use popup method instead.');
    return expect(authProvider.signIn(OAuthProviderIntegrationType.IFRAME)).rejects.toEqual(expectedError);
  });
});

describe('sign in callback', () => {
  test('sign in callback should default to redirect', () => {
    const authProvider = createInstance();
    const signinRedirectCallbackMock = jest.spyOn(authProvider.userManager, 'signinRedirectCallback').mockResolvedValue(dummyUser);
    return authProvider.signInCallback(1).then(() => {
      expect(signinRedirectCallbackMock).toBeCalled();
    });
  });

  test('sign in callback should respect passed authentication type', () => {
    const authProvider = createInstance();
    const signinSilentCallbackMock = jest.spyOn(authProvider.userManager, 'signinSilentCallback').mockResolvedValue(dummyUser);
    return authProvider.signInCallback(OAuthProviderIntegrationType.SILENT).then(() => {
      expect(signinSilentCallbackMock).toBeCalled();
    });
  });
});

describe('sign out', () => {
  test('sign out should reject when not signed in', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    return expect(authProvider.signOut()).resolves.toBeUndefined();
  });

  test('sign out should reject when receiving an error', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    mock.post('https://www.bitski.com/v1/logout', (req, res) => {
      return res.status(401).body('{ "error": { "message": "Not authorized." }}');
    });
    jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return authProvider.signIn(OAuthProviderIntegrationType.POPUP).then((user) => {
      jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(user);
      return expect(authProvider.signOut()).rejects.toEqual(new Error('Not authorized.'));
    });
  });

  test('sign out should reject when receiving an error without a message', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    mock.post('https://www.bitski.com/v1/logout', (req, res) => {
      return res.status(401).body('{ "error": "Not authorized." }');
    });
    jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return authProvider.signIn(OAuthProviderIntegrationType.POPUP).then((user) => {
      jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(user);
      return expect(authProvider.signOut()).rejects.toEqual(new Error('Not authorized.'));
    });
  });

  test('sign out should reject when receiving non json response', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    mock.post('https://www.bitski.com/v1/logout', (req, res) => {
      return res.status(500).body('Something went wrong.');
    });
    jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return authProvider.signIn(OAuthProviderIntegrationType.POPUP).then((user) => {
      jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(user);
      return expect(authProvider.signOut()).rejects.toEqual(new Error('Unknown error. Could not parse error response.'));
    });
  });

  test('sign out should reject when receiving empty response', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    mock.post('https://www.bitski.com/v1/logout', (req, res) => {
      return res.status(500).body('{}');
    });
    jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return authProvider.signIn(OAuthProviderIntegrationType.POPUP).then((user) => {
      jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(user);
      return expect(authProvider.signOut()).rejects.toEqual(new Error('Unknown error.'));
    });
  });

  test('sign out should reject on timeout', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    authProvider.timeout = 100;
    mock.post('https://www.bitski.com/v1/logout', () => new Promise(() => { }));
    jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return authProvider.signIn(OAuthProviderIntegrationType.POPUP).then((user) => {
      jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(user);
      return expect(authProvider.signOut()).rejects.toEqual(new Error('Connection timed out.'));
    });
  });

  test('should clear user on bitski instance', () => {
    const authProvider = createInstance();
    mock.post('https://www.bitski.com/v1/logout', (req, res) => {
      return res.status(204);
    });
    jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return authProvider.signIn(OAuthProviderIntegrationType.POPUP).then(() => {
      return authProvider.signOut().then(() => {
        return authProvider.getUser().then((user) => {
          expect(user).toBeNull();
        });
      });
    });
  });
});
