import { TokenResponse } from '@openid/appauth';
import { AccessToken } from '../src/auth/access-token';
import { OpenidAuthProvider } from '../src/auth/openid-auth-provider';
import { TokenStore } from '../src/auth/token-store';
import { User } from '../src/auth/user';
import { AuthenticationStatus, OAuthSignInMethod } from '../src/bitski';
import { AuthenticationError, AuthenticationErrorCode } from '../src/errors/authentication-error';

const dummyUser = new User('test-user');
const dummyToken = new AccessToken('test-access-token');
const expiredToken = new AccessToken('test-expired-access-token', 2);
const clientID = 'test-client-id';

class MockTokenStore extends TokenStore {

  public setToken(accessToken?: AccessToken) {
    this.accessToken = accessToken;
  }

  public setRefreshToken(refreshToken?: string) {
    if (refreshToken) {
      localStorage.setItem(this.refreshTokenKey, refreshToken);
    } else {
      localStorage.removeItem(this.refreshTokenKey);
    }
  }
}

function createInstance(): OpenidAuthProvider {
  const provider = new OpenidAuthProvider(clientID, 'http://localhost:3000');
  const tokenStore = new MockTokenStore(clientID);
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
  test('should be connected when access token exists', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setToken(dummyToken);
    expect(authProvider.authStatus).toBe(AuthenticationStatus.Connected);
  });

  test('should be expired when access token is expired and refresh token exists', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setToken(expiredToken);
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    expect(authProvider.authStatus).toBe(AuthenticationStatus.Expired);
  });

  test('should be expired when refresh token exists', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    expect(authProvider.authStatus).toBe(AuthenticationStatus.Expired);
  });

  test('should be not connected when no tokens are available', () => {
    expect.assertions(1);
    const authProvider = createInstance();
    expect(authProvider.authStatus).toBe(AuthenticationStatus.NotConnected);
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
      expect(error).toBeInstanceOf(AuthenticationError);
      expect(error.code).toBe(AuthenticationErrorCode.NotSignedIn);
      done();
    });
  });

  test('should not be able to get a refresh token if the user did not approve offline access', (done) => {
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setToken(dummyToken);
    authProvider.getRefreshToken().catch((error) => {
      expect(error).toBeInstanceOf(AuthenticationError);
      expect(error.code).toBe(AuthenticationErrorCode.NoRefreshToken);
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

  test('clears caches when refreshing token fails', () => {
    expect.assertions(4);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    authProvider.userStore.set(dummyUser);
    const spy = jest.spyOn(authProvider.oauthManager, 'refreshAccessToken');
    spy.mockRejectedValue(new Error('Test error'));
    return authProvider.refreshAccessToken().catch((err) => {
      expect(spy).toBeCalled();
      expect(authProvider.tokenStore.currentToken).toBeUndefined();
      expect(authProvider.tokenStore.refreshToken).toBeUndefined();
      expect(authProvider.userStore.currentUser).toBeUndefined();
    });
  });

  test('rejects when no refresh token is available', () => {
    expect.assertions(3);
    const authProvider = createInstance();
    const spy = jest.spyOn(authProvider.oauthManager, 'refreshAccessToken');
    return authProvider.refreshAccessToken().catch((err) => {
      expect(spy).not.toHaveBeenCalled();
      expect(err).toBeInstanceOf(AuthenticationError);
      expect(err.code).toBe(AuthenticationErrorCode.NoRefreshToken);
    });
  });

  test('connect rejects when not signed in', () => {
    const authProvider = createInstance();
    const spy = jest.spyOn(authProvider.oauthManager, 'refreshAccessToken');
    return authProvider.connect().catch((error) => {
      expect(error).toBeInstanceOf(AuthenticationError);
      expect(error.code).toBe(AuthenticationErrorCode.NoRefreshToken);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});

describe('getting the user', () => {
  test('getUser should pass value from userstore if available', () => {
    const authProvider = createInstance();
    authProvider.userStore.set(dummyUser);
    return authProvider.getUser().then((user) => {
      expect(user).toBe(dummyUser);
    });
  });

  test('getUser should load from the api if not already cached', () => {
    const authProvider = createInstance();
    authProvider.userStore.clear();
    (authProvider.tokenStore as MockTokenStore).setToken(dummyToken);
    const spy = jest.spyOn(authProvider.oauthManager, 'requestUserInfo').mockResolvedValue({
      sub: 'test-user',
    });
    return authProvider.getUser().then((user) => {
      expect(spy).toBeCalled();
      expect(user.id).toBe('test-user');
    });
  });
});

describe('signing in', () => {
  test('should handle popup sign in', () => {
    expect.assertions(3);
    const authProvider = createInstance();
    const tokenResponse = new TokenResponse({
      access_token: 'test-access-token',
    });
    const popupMock = jest.spyOn(authProvider.oauthManager, 'signInPopup').mockResolvedValue(tokenResponse);
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
    const tokenResponse = new TokenResponse({
      access_token: 'test-access-token',
    });
    const redirectMock = jest.spyOn(authProvider.oauthManager, 'signInRedirect').mockResolvedValue(tokenResponse);
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
    expect.assertions(2);
    const authProvider = createInstance();
    return authProvider.signIn(OAuthSignInMethod.Silent).catch((error) => {
      expect(error).toBeInstanceOf(AuthenticationError);
      expect(error.code).toBe(AuthenticationErrorCode.UnsupportedAuthenticationMethod);
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
    const callbackMock = jest.spyOn(authProvider.oauthManager, 'redirectCallback').mockResolvedValue(tokenResponse);
    const userMock = jest.spyOn(authProvider.oauthManager, 'requestUserInfo').mockResolvedValue({
      sub: 'test-user',
    });
    return authProvider.redirectCallback().then((user) => {
      expect(authProvider.authStatus).toBe(AuthenticationStatus.Connected);
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
    const refreshTokenMock = jest.spyOn(authProvider.oauthManager, 'refreshAccessToken').mockResolvedValue(tokenResponse);
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
    const signInMock = jest.spyOn(authProvider.oauthManager, 'signInPopup').mockResolvedValue(tokenResponse);
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
    expect.assertions(4);
    const authProvider = createInstance();
    (authProvider.tokenStore as MockTokenStore).setToken(dummyToken);
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    authProvider.userStore.set(dummyUser);
    const spy = jest.spyOn(authProvider.oauthManager, 'requestSignOut').mockResolvedValue({});
    return authProvider.signOut().then(() => {
      expect(spy).not.toHaveBeenCalled();
      expect(authProvider.tokenStore.currentToken).toBeUndefined();
      expect(authProvider.tokenStore.refreshToken).toBeUndefined();
      expect(authProvider.userStore.currentUser).toBeUndefined();
    });
  });

  test('should invalidate tokens when requested', () => {
    expect.assertions(3);
    const authProvider = createInstance();
    const spy = jest.fn();
    authProvider.signOutCallback = spy;
    (authProvider.tokenStore as MockTokenStore).setToken(dummyToken);
    (authProvider.tokenStore as MockTokenStore).setRefreshToken('test-refresh-token');
    return authProvider.invalidateToken().then(() => {
      expect(authProvider.tokenStore.currentToken).toBeUndefined();
      expect(authProvider.tokenStore.refreshToken).toBeDefined();
      expect(spy).toHaveBeenCalled();
    });
  });
});
