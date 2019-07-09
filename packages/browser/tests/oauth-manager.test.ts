import { ServerError } from 'bitski-provider';
import { LOGIN_HINT_SIGNUP } from '../src/bitski';
import { AuthenticationError, AuthenticationErrorCode } from '../src/errors/authentication-error';
import { NoHashQueryStringUtils } from '../src/utils/no-hash-query-string-utils';
import { MockOAuthManager } from './util/mock-oauth-manager';

function createInstance() {
  return new MockOAuthManager({ clientId: 'test-client-id', redirectUri: 'http://localhost:3000' });
}

beforeEach(() => {
  // @ts-ignore
  fetch.resetMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

test('sign in redirect performs redirect', (done) => {
  expect.assertions(2);
  const manager = createInstance();

  const originalLocation = window.location.href;

  // Setup a mock of window.location.assign to complete test
  const spy = jest.fn((location) => {
    // Assert location has changed (redirected)
    expect(location).not.toBe(originalLocation);

    // Parse the new location value
    const parser = new NoHashQueryStringUtils();
    const parsed = parser.parseQueryString(location);

    // Delete window location and assign a mock with the expected end state
    delete window.location;
    // @ts-ignore
    window.location = { search: `?code=foo&state=${parsed.state}` };

    // Mock API request for token
    // @ts-ignore
    fetch.mockResponseOnce(JSON.stringify({ access_token: 'test-token' }));

    // Call the callback (which will look at window.location.search)
    manager.redirectCallback().then((tokenResponse) => {
      // Assert the API request was parsed
      expect(tokenResponse.accessToken).toBe('test-token');
      done();
    });
  });
  window.location.assign = spy;

  // Perform sign in request
  manager.signInRedirect();
});

test('sign in popup opens popup', () => {
  expect.assertions(2);

  const manager = createInstance();

  // Spy on window open
  jest.spyOn(window, 'open').mockImplementation((url, target, features) => {
    // Assert the URL is something we expect
    expect(url).toMatch(manager.configuration.authorizationEndpoint);
    // Hack to create an object that is similar to Location in JSDom
    const location = document.createElement('a');
    location.href = `http://localhost:3000/callback?code=foo&state=${manager.authHandler.pendingRequest.state}`;
    // Call the callback to trigger the completion handler
    // @ts-ignore
    manager.authHandler.callback.call(manager.authHandler, location);
  });

  // @ts-ignore
  fetch.mockResponseOnce(JSON.stringify({ access_token: 'test-token' }));

  return manager.signInPopup().then((tokenResponse) => {
    expect(tokenResponse.accessToken).toBe('test-token');
  });
});

test('signInPopup passes options to authorization request', () => {
  expect.assertions(2);
  const manager = createInstance();
  jest.spyOn(window, 'open').mockImplementation(() => {
    return {
      onload: jest.fn(),
      focus: jest.fn(),
      innerHeight: 1000,
    };
  });
  manager.signInPopup({ login_hint: LOGIN_HINT_SIGNUP });
  expect(manager.currentAuthRequest).toBeDefined();
  expect(manager.currentAuthRequest.extras.login_hint).toBe(LOGIN_HINT_SIGNUP);
});

test('signInRedirect passes options to authorization request', () => {
  expect.assertions(2);
  const manager = createInstance();
  window.location.assign = jest.fn();
  manager.signInRedirect({ login_hint: LOGIN_HINT_SIGNUP });
  expect(manager.currentAuthRequest).toBeDefined();
  expect(manager.currentAuthRequest.extras.login_hint).toBe(LOGIN_HINT_SIGNUP);
});

test('can handle oauth error response', () => {
  expect.assertions(4);

  const manager = createInstance();

  // Spy on window open
  jest.spyOn(window, 'open').mockImplementation((url, target, features) => {
    // Assert the URL is something we expect
    expect(url).toMatch(manager.configuration.authorizationEndpoint);
    // Hack to create an object that is similar to Location in JSDom
    const location = document.createElement('a');
    location.href =
      `http://localhost:3000/callback?error=womp%20womp&error_description=better%20luck%20next%20time&state=${manager.currentAuthRequest.state}`;
    // Call the callback to trigger the completion handler
    // @ts-ignore
    manager.authHandler.callback.call(manager.authHandler, location);
    return {
      onload: jest.fn(),
      focus: jest.fn(),
      innerHeight: 1000,
    };
  });

  return manager.signInPopup().catch((error) => {
    expect(error).toBeInstanceOf(AuthenticationError);
    expect(error.code).toBe(AuthenticationErrorCode.ServerError);
    expect(error.message).toMatch(/womp womp/);
  });
});

test('rejects with an error if the popup is blocked', (done) => {
  expect.assertions(2);

  const manager = createInstance();

  // Spy on window open
  jest.spyOn(window, 'open').mockImplementation((url, target, features) => {
    // Return null, simulating a blocked popup
    return null;
  });

  manager.signInPopup().catch((error) => {
    expect(error).toBeInstanceOf(AuthenticationError);
    expect(error.code).toBe(AuthenticationErrorCode.PopupBlocked);
    done();
  });
});

test('it submits refresh token requests', () => {
  expect.assertions(1);
  const manager = createInstance();

  // @ts-ignore
  fetch.mockResponseOnce(JSON.stringify({ access_token: 'refreshed-token' }));

  return manager.refreshAccessToken('old-token').then((tokenResponse) => {
    expect(tokenResponse.accessToken).toBe('refreshed-token');
  });
});

test('it submits sign out requests', () => {
  expect.assertions(1);
  const manager = createInstance();

  // @ts-ignore
  fetch.mockResponseOnce(JSON.stringify({}));

  return manager.requestSignOut('old-token').then((response) => {
    expect(response).toBeDefined();
  });
});

test('it submits user info requests', () => {
  expect.assertions(1);
  const manager = createInstance();

  // @ts-ignore
  fetch.mockResponseOnce(JSON.stringify({ sub: 'test-user' }));

  return manager.requestUserInfo('test-token').then((userInfo) => {
    expect(userInfo.sub).toBe('test-user');
  });
});

test('it parses error messages returned by api', () => {
  expect.assertions(3);
  const manager = createInstance();
  const errorResponse = {
    error: {
      message: 'Oops!',
    },
  };
  // @ts-ignore
  fetch.mockResponseOnce(JSON.stringify(errorResponse), { status: 400 });

  return manager.requestUserInfo('test-token').catch((error) => {
    expect(error).toBeInstanceOf(ServerError);
    expect(error.code).toBe(400);
    expect(error.message).toEqual(expect.stringContaining(errorResponse.error.message));
  });
});

test('it parses poorly formed error messages returned by api', () => {
  expect.assertions(3);
  const manager = createInstance();
  const errorResponse = {
    error: 'Oops!',
  };
  // @ts-ignore
  fetch.mockResponseOnce(JSON.stringify(errorResponse), { status: 500 });

  return manager.requestUserInfo('test-token').catch((error) => {
    expect(error).toBeInstanceOf(ServerError);
    expect(error.code).toBe(500);
    expect(error.message).toEqual(expect.stringContaining(errorResponse.error));
  });
});
