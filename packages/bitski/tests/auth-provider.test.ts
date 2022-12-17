import { AuthorizationResponse, TokenResponse } from '@openid/appauth';
import { AccessToken } from '../src/-private/auth/access-token';
import { OpenidAuthProvider } from '../src/-private/auth/openid-auth-provider';
import { TokenStore } from '../src/-private/auth/token-store';
import { User } from '../src/-private/auth/user';
import { AuthenticationStatus, OAuthSignInMethod } from '../src/index';
import MemStore from './util/mem-store';

const dummyUser = new User('test-user');
const dummyToken = new AccessToken('test-access-token');
const expiredToken = new AccessToken('test-expired-access-token', 2);
const clientID = 'test-client-id';

class MockTokenStore extends TokenStore {
  public setToken(accessToken?: AccessToken) {
    this.accessToken = Promise.resolve(accessToken);
  }

  public setRefreshToken(refreshToken?: string) {
    if (refreshToken) {
      this.refreshToken = Promise.resolve(refreshToken);
      localStorage.setItem(this.refreshTokenKey, refreshToken);
    } else {
      this.refreshToken = Promise.resolve(undefined);
      localStorage.removeItem(this.refreshTokenKey);
    }
  }
}

function createInstance(): OpenidAuthProvider {
  const memStore = new MemStore();
  const provider = new OpenidAuthProvider(clientID, 'http://localhost:3000', memStore);
  const tokenStore = new MockTokenStore(clientID, memStore);
  provider.tokenStore = tokenStore;
  return provider;
}

beforeEach(() => {
  if (localStorage) {
    localStorage.clear();
  }
});

afterEach(() => {
  if (localStorage) {
    localStorage.clear();
  }
});

describe('getAuthStatus', () => {
  test('should be connected when access token exists', async () => {
    expect.assertions(1);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setToken(dummyToken);
    expect(await authProvider.getAuthStatus()).toBe(AuthenticationStatus.Connected);
  });

  test('should be expired when access token is expired and refresh token exists', async () => {
    expect.assertions(1);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setToken(expiredToken);
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    expect(await authProvider.getAuthStatus()).toBe(AuthenticationStatus.Expired);
  });

  test('should be expired when refresh token exists', async () => {
    expect.assertions(1);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    expect(await authProvider.getAuthStatus()).toBe(AuthenticationStatus.Expired);
  });

  test('should be not connected when no tokens are available', async () => {
    expect.assertions(1);
    const authProvider = createInstance();
    expect(await authProvider.getAuthStatus()).toBe(AuthenticationStatus.NotConnected);
  });
});

describe('getting an access token', () => {
  test('getAccessToken returns access tokens from token store', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setToken(dummyToken);
    return authProvider.getAccessToken().then((token) => {
      expect(token).toBe(dummyToken.token);
    });
  });

  test('getAccessToken should reject if no tokens available', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    return authProvider.getAccessToken().catch((err) => {
      expect(err.message).toMatch(/Not signed in/);
    });
  });

  test('getAccessToken should refresh token if access token is invalid', () => {
    expect.assertions(2);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setToken(expiredToken);
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    const spy = jest.spyOn(authProvider, 'refreshAccessToken');
    spy.mockResolvedValue(dummyToken.token);
    return authProvider.getAccessToken().then((token) => {
      expect(spy).toBeCalled();
      expect(token).toBe(dummyToken.token);
    });
  });

  test('getAccessToken should refresh token if access token does not exist', () => {
    expect.assertions(2);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    const spy = jest.spyOn(authProvider, 'refreshAccessToken');
    spy.mockResolvedValue(dummyToken.token);
    return authProvider.getAccessToken().then((token) => {
      expect(spy).toBeCalled();
      expect(token).toBe(dummyToken.token);
    });
  });

  test('should be able to get a refresh token if the user is logged in', () => {
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    return authProvider.getRefreshToken().then((token) => {
      expect(token).toBe('test-refresh-token');
    });
  });

  test('should not be able to get a refresh token if the user is not logged in', (done) => {
    const authProvider = createInstance();
    authProvider.getRefreshToken().catch((error) => {
      expect(error.message).toMatch('Not signed in');
      done();
    });
  });

  test('should not be able to get a refresh token if the user did not approve offline access', (done) => {
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setToken(dummyToken);
    authProvider.getRefreshToken().catch((error) => {
      expect(error.message).toMatch('No refresh token available');
      done();
    });
  });
});

describe('refreshing access tokens', () => {
  test('can refresh access tokens', () => {
    expect.assertions(2);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    const spy = jest.spyOn(authProvider.oauthManager, 'refreshAccessToken');
    const tokenResponse = new TokenResponse({
      access_token: 'refreshed-access-token',
    });
    spy.mockResolvedValue(tokenResponse);
    return authProvider.refreshAccessToken().then((token) => {
      expect(spy).toBeCalled();
      expect(token).toBe('refreshed-access-token');
    });
  });

  test('clears caches when refreshing token fails', async () => {
    expect.assertions(3);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    const spy = jest.spyOn(authProvider.oauthManager, 'refreshAccessToken');
    spy.mockRejectedValue(new Error('Test error'));
    return authProvider.refreshAccessToken().catch(async () => {
      expect(spy).toBeCalled();
      expect(await authProvider.tokenStore.getCurrentToken()).toBeUndefined();
      expect(await authProvider.tokenStore.getRefreshToken()).toBeUndefined();
    });
  });

  test('rejects when no refresh token is available', () => {
    expect.assertions(2);
    const authProvider = createInstance();
    const spy = jest.spyOn(authProvider.oauthManager, 'refreshAccessToken');
    return authProvider.refreshAccessToken().catch((err) => {
      expect(spy).not.toHaveBeenCalled();
      expect(err.message).toMatch('No refresh token available');
    });
  });

  test('connect rejects when not signed in', () => {
    const authProvider = createInstance();
    const spy = jest.spyOn(authProvider.oauthManager, 'refreshAccessToken');
    return authProvider.connect().catch((error) => {
      expect(error.message).toMatch('No refresh token available');
      expect(spy).not.toHaveBeenCalled();
    });
  });
});

describe('getting the user', () => {
  test('getUser should load from the api if not already cached', () => {
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setToken(dummyToken);
    const spy = jest.spyOn(authProvider.oauthManager, 'requestUserInfo').mockResolvedValue({
      sub: 'test-user',
    });
    return authProvider.getUser().then((user) => {
      expect(spy).toBeCalled();
      expect(user.id).toBe('test-user');
    });
  });

  test('getUser should use cached value', async () => {
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setToken(dummyToken);
    const spy = jest.spyOn(authProvider.oauthManager, 'requestUserInfo').mockResolvedValue({
      sub: 'test-user',
    });
    await authProvider.getUser();
    const user = await authProvider.getUser();

    expect(spy).toBeCalledTimes(1);
    expect(user.id).toBe('test-user');
  });
});

describe('signing in', () => {
  test('should handle popup sign in', () => {
    expect.assertions(3);
    const authProvider = createInstance();
    const tokenResponse = new TokenResponse({
      access_token: 'test-access-token',
    });
    const popupMock = jest
      .spyOn(authProvider.oauthManager, 'signInPopup')
      .mockResolvedValue(tokenResponse);
    const userMock = jest.spyOn(authProvider.oauthManager, 'requestUserInfo').mockResolvedValue({
      sub: 'test-user',
    });
    return authProvider.signIn(OAuthSignInMethod.Popup).then((user) => {
      expect(user.id).toBe('test-user');
      expect(popupMock).toHaveBeenCalled();
      expect(userMock).toHaveBeenCalled();
    });
  });

  test('should handle redirect sign in', () => {
    expect.assertions(3);
    const authProvider = createInstance();
    const authResponse = new AuthorizationResponse({ code: 'test-code', state: 'test-state' });
    const redirectMock = jest
      .spyOn(authProvider.oauthManager, 'signInRedirect')
      .mockResolvedValue(authResponse);
    jest.spyOn(authProvider, 'getAccessToken').mockResolvedValue('test-token');
    const userMock = jest.spyOn(authProvider.oauthManager, 'requestUserInfo').mockResolvedValue({
      sub: 'test-user',
    });
    return authProvider.signIn(OAuthSignInMethod.Redirect).then((user) => {
      expect(user).toMatchObject(dummyUser);
      expect(redirectMock).toHaveBeenCalled();
      expect(userMock).toHaveBeenCalled();
    });
  });

  test('should reject silent sign in', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    return authProvider.signIn(OAuthSignInMethod.Silent).catch((error) => {
      expect(error.message).toMatch('Sign in method not supported');
    });
  });
});

describe('sign in callback', () => {
  test('should properly complete redirect flow', () => {
    expect.assertions(4);
    const authProvider = createInstance();
    const tokenResponse = new TokenResponse({
      access_token: 'test-user',
    });
    const callbackMock = jest
      .spyOn(authProvider.oauthManager, 'redirectCallback')
      .mockResolvedValue(tokenResponse);
    const userMock = jest.spyOn(authProvider.oauthManager, 'requestUserInfo').mockResolvedValue({
      sub: 'test-user',
    });
    return authProvider.redirectCallback().then(async (user) => {
      expect(await authProvider.getAuthStatus()).toBe(AuthenticationStatus.Connected);
      expect(user).toMatchObject(dummyUser);
      expect(callbackMock).toHaveBeenCalled();
      expect(userMock).toHaveBeenCalled();
    });
  });
});

describe('sign in or connect', () => {
  test('should load the user when already connected', () => {
    expect.assertions(2);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setToken(dummyToken);
    const getUserMock = jest.spyOn(authProvider.oauthManager, 'requestUserInfo').mockResolvedValue({
      sub: 'test-user',
    });
    return authProvider.signInOrConnect().then((user) => {
      expect(user).toMatchObject(dummyUser);
      expect(getUserMock).toHaveBeenCalled();
    });
  });

  test('should refresh access token when user is expired', () => {
    expect.assertions(3);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    const tokenResponse = new TokenResponse({
      access_token: 'refreshed-access-token',
    });
    const refreshTokenMock = jest
      .spyOn(authProvider.oauthManager, 'refreshAccessToken')
      .mockResolvedValue(tokenResponse);
    const getUserMock = jest.spyOn(authProvider.oauthManager, 'requestUserInfo').mockResolvedValue({
      sub: 'test-user',
    });
    return authProvider.signInOrConnect().then((user) => {
      expect(user).toMatchObject(dummyUser);
      expect(refreshTokenMock).toHaveBeenCalled();
      expect(getUserMock).toHaveBeenCalled();
    });
  });

  test('should sign in popup if not connected', () => {
    expect.assertions(3);
    const authProvider = createInstance();
    const tokenResponse = new TokenResponse({
      access_token: 'test-access-token',
    });
    const signInMock = jest
      .spyOn(authProvider.oauthManager, 'signInPopup')
      .mockResolvedValue(tokenResponse);
    const getUserMock = jest.spyOn(authProvider.oauthManager, 'requestUserInfo').mockResolvedValue({
      sub: 'test-user',
    });
    return authProvider.signInOrConnect().then((user) => {
      expect(user).toMatchObject(dummyUser);
      expect(signInMock).toHaveBeenCalled();
      expect(getUserMock).toHaveBeenCalled();
    });
  });
});

describe('sign out', () => {
  test('should call signout callback', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    const spy = jest.fn();
    authProvider.signOutCallback = spy;
    jest.spyOn(authProvider.oauthManager, 'requestSignOut').mockResolvedValue({});
    return authProvider.signOut().then(() => {
      expect(spy).toHaveBeenCalled();
    });
  });

  test('should remove user data on sign out', () => {
    expect.assertions(3);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setToken(dummyToken);
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    const spy = jest.spyOn(authProvider.oauthManager, 'requestSignOut').mockResolvedValue({});
    return authProvider.signOut().then(async () => {
      expect(spy).not.toHaveBeenCalled();
      expect(await authProvider.tokenStore.getCurrentToken()).toBeUndefined();
      expect(await authProvider.tokenStore.getRefreshToken()).toBeUndefined();
    });
  });

  test('should invalidate tokens when requested', () => {
    expect.assertions(3);
    const authProvider = createInstance();
    const spy = jest.fn();
    authProvider.signOutCallback = spy;
    (authProvider.tokenStore as MockTokenStore).setToken(dummyToken);
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    return authProvider.invalidateToken().then(async () => {
      expect(await authProvider.tokenStore.getCurrentToken()).toBeUndefined();
      expect(await authProvider.tokenStore.getRefreshToken()).toBeDefined();
      expect(spy).toHaveBeenCalled();
    });
  });
});
