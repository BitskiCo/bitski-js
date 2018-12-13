import { InMemoryWebStorage, WebStorageStateStore } from 'oidc-client';
import mock from 'xhr-mock';
import { OAuthSignInMethod } from '../src/auth/auth-provider';
import { OpenidAuthProvider } from '../src/auth/openid-auth-provider';
import { AuthenticationStatus } from '../src/bitski';

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
  return new OpenidAuthProvider(clientID, 'http://localhost:3000', otherSettings);
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

describe('getAuthStatus', () => {
  test('should be connected when user exists', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(dummyUser);
    return authProvider.getAuthStatus().then(authStatus => {
      expect(authStatus).toBe(AuthenticationStatus.Connected);
    });
  });

  test('should be approved when user exists but expired', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    let user = dummyUser;
    user.expired = true;
    localStorage.setItem('bitski.isSignedIn', 'true');
    jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(user);
    return authProvider.getAuthStatus().then(authStatus => {
      expect(authStatus).toBe(AuthenticationStatus.Expired);
    });
  });

  test('should be approved when user does not exist but previously signed in', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    localStorage.setItem('bitski.isSignedIn', 'true');
    jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(undefined);
    return authProvider.getAuthStatus().then(authStatus => {
      expect(authStatus).toBe(AuthenticationStatus.Expired);
    });
  });

  test('should be not connected when user does not exist and has not previously signed in', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(undefined);
    return authProvider.getAuthStatus().then(authStatus => {
      expect(authStatus).toBe(AuthenticationStatus.NotConnected);
    });
  });
});

describe('getting an access token', () => {
  test('getAccessToken should reject if user is not available', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(undefined);
    return authProvider.getAccessToken().catch(err => {
      expect(err.message).toBe('Not signed in');
    });
  });

  test('getAccessToken should reject if access token is invalid', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    let user = dummyUser;
    user.expired = true;
    jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(user);
    return authProvider.getAccessToken().catch(err => {
      expect(err.message).toBe('Not signed in');
    });
  });
});

describe('getting the user', () => {
  test('getUser should pass value from userManager', () => {
    const authProvider = createInstance();
    const spy = jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(dummyUser);
    return authProvider.getUser().then(user => {
      expect(user).toBe(dummyUser);
      expect(spy).toHaveBeenCalled();
    })
  });
});

describe('signing in', () => {
  test('should handle popup sign in', () => {
    const authProvider = createInstance();
    const signingPopupMock = jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return authProvider.signIn(OAuthSignInMethod.Popup).then((user) => {
      expect(user).toMatchObject(dummyUser);
      expect(signingPopupMock).toHaveBeenCalled();
    });
  });

  test('should handle redirect sign in', () => {
    const authProvider = createInstance();
    const signingRedirectMock = jest.spyOn(authProvider.userManager, 'signinRedirect').mockResolvedValue(dummyUser);
    return authProvider.signIn(OAuthSignInMethod.Redirect).then((user) => {
      expect(user).toMatchObject(dummyUser);
      expect(signingRedirectMock).toHaveBeenCalled();
    });
  });

  test('should handle silent sign in', () => {
    const authProvider = createInstance();
    const signinSilentMock = jest.spyOn(authProvider.userManager, 'signinSilent').mockResolvedValue(dummyUser);
    return authProvider.signIn(OAuthSignInMethod.Silent).then((user) => {
      expect(user).toMatchObject(dummyUser);
      expect(signinSilentMock).toHaveBeenCalled();
    });
  });
});

describe('sign in callback', () => {
  test('sign in callback should default to redirect', () => {
    const authProvider = createInstance();
    const signinRedirectCallbackMock = jest.spyOn(authProvider.userManager, 'signinRedirectCallback').mockResolvedValue(dummyUser);
    return authProvider.signInCallback(OAuthSignInMethod.Redirect).then(() => {
      expect(signinRedirectCallbackMock).toBeCalled();
    });
  });

  test('sign in callback should respect passed authentication type', () => {
    const authProvider = createInstance();
    const signinSilentCallbackMock = jest.spyOn(authProvider.userManager, 'signinSilentCallback').mockResolvedValue(dummyUser);
    return authProvider.signInCallback(OAuthSignInMethod.Silent).then(() => {
      expect(signinSilentCallbackMock).toBeCalled();
    });
  });
});

describe('sign in or connect', () => {
  test('should return the user when already connected', () => {
    expect.assertions(2);
    const authProvider = createInstance();
    jest.spyOn(authProvider, 'getAuthStatus').mockResolvedValue(AuthenticationStatus.Connected);
    const getUserMock = jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(dummyUser);
    return authProvider.signInOrConnect().then(user => {
      expect(user).toBe(dummyUser);
      expect(getUserMock).toHaveBeenCalled();
    });
  });

  test('should sign in silent when user is expired', () => {
    expect.assertions(2);
    const authProvider = createInstance();
    jest.spyOn(authProvider, 'getAuthStatus').mockResolvedValue(AuthenticationStatus.Expired);
    const signinMock = jest.spyOn(authProvider.userManager, 'signinSilent').mockResolvedValue(dummyUser);
    return authProvider.signInOrConnect().then(user => {
      expect(user).toBe(dummyUser);
      expect(signinMock).toHaveBeenCalled();
    });
  });

  test('should sign in popup when user is expired but silent is not available', () => {
    expect.assertions(2);
    const authProvider = createInstance();
    document.hasStorageAccess = true;
    jest.spyOn(authProvider, 'getAuthStatus').mockResolvedValue(AuthenticationStatus.Expired);
    const signinMock = jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return authProvider.signInOrConnect().then(user => {
      expect(user).toBe(dummyUser);
      expect(signinMock).toHaveBeenCalled();
      delete document.hasStorageAccess;
    });
  });

  test('should sign in popup if sign in silent fails when approved', () => {
    expect.assertions(3);
    const authProvider = createInstance();
    jest.spyOn(authProvider, 'getAuthStatus').mockResolvedValue(AuthenticationStatus.Expired);
    const signinMock = jest.spyOn(authProvider.userManager, 'signinSilent').mockRejectedValue(new Error('foo'));
    const signinPopupMock = jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return authProvider.signInOrConnect().then(user => {
      expect(user).toBe(dummyUser);
      expect(signinMock).toHaveBeenCalled();
      expect(signinPopupMock).toHaveBeenCalled();
    });
  });

  test('should sign in popup if not connected', () => {
    expect.assertions(2);
    const authProvider = createInstance();
    jest.spyOn(authProvider, 'getAuthStatus').mockResolvedValue(AuthenticationStatus.NotConnected);
    const signinPopupMock = jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValue(dummyUser);
    return authProvider.signInOrConnect().then(user => {
      expect(user).toBe(dummyUser);
      expect(signinPopupMock).toHaveBeenCalled();
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
    return authProvider.signIn(OAuthSignInMethod.Popup).then((user) => {
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
    return authProvider.signIn(OAuthSignInMethod.Popup).then((user) => {
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
    return authProvider.signIn(OAuthSignInMethod.Popup).then((user) => {
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
    return authProvider.signIn(OAuthSignInMethod.Popup).then((user) => {
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
    return authProvider.signIn(OAuthSignInMethod.Popup).then((user) => {
      jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(user);
      return expect(authProvider.signOut()).rejects.toEqual(new Error('Connection timed out.'));
    });
  });

  test('should clear user on bitski instance', (done) => {
    expect.assertions(2);
    const authProvider = createInstance();
    mock.post('https://www.bitski.com/v1/logout', (req, res) => {
      return res.status(204);
    });
    authProvider.userManager.storeUser(dummyUser);
    authProvider.getUser().then(user => {
      expect(user).toBeDefined();
      authProvider.signOut().then(() => {
        authProvider.getUser().then((user) => {
          expect(user).toBeNull();
          done();
        });
      });
    });
  });
});
