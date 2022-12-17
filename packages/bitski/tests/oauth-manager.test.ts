import { LOGIN_HINT_SIGNUP } from '../src/index';
import { NoHashQueryStringUtils } from '../src/-private/utils/no-hash-query-string-utils';
import { MockOAuthManager } from './util/mock-oauth-manager';
import fetchMock from 'jest-fetch-mock';

function createInstance() {
  return new MockOAuthManager({ clientId: 'test-client-id', redirectUri: 'http://localhost:3000' });
}

const { location } = window;

const win = window as any;

beforeAll((): void => {
  delete win.location;
  win.location = {
    href: '',
  };
});

afterAll((): void => {
  window.location = location;
});

describe('oauth-manager', () => {
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
      delete win.location;
      win.location = { search: `?code=foo&state=${parsed.state}` };

      // Mock API request for token
      fetchMock.mockResponseOnce(JSON.stringify({ access_token: 'test-token' }));

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
      const { authHandler } = manager as any;
      location.href = `http://localhost:3000/callback?code=foo&state=${authHandler.pendingRequest.state}`;
      // Call the callback to trigger the completion handler
      authHandler.callback.call(authHandler, location);

      return {} as any;
    });
    fetchMock.mockResponseOnce(JSON.stringify({ access_token: 'test-token' }));

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
      } as any;
    });
    manager.signInPopup({ login_hint: LOGIN_HINT_SIGNUP });
    expect(manager.currentAuthRequest).toBeDefined();
    expect(manager.currentAuthRequest?.extras?.login_hint).toBe(LOGIN_HINT_SIGNUP);
  });

  test('signInRedirect passes options to authorization request', () => {
    expect.assertions(2);
    const manager = createInstance();
    window.location.assign = jest.fn();
    manager.signInRedirect({ login_hint: LOGIN_HINT_SIGNUP });
    expect(manager.currentAuthRequest).toBeDefined();
    expect(manager.currentAuthRequest?.extras?.login_hint).toBe(LOGIN_HINT_SIGNUP);
  });

  test('can handle oauth error response', () => {
    expect.assertions(2);

    const manager = createInstance();

    // Spy on window open
    jest.spyOn(window, 'open').mockImplementation((url, target, features) => {
      // Assert the URL is something we expect
      expect(url).toMatch(manager.configuration.authorizationEndpoint);
      // Hack to create an object that is similar to Location in JSDom
      const location = document.createElement('a');
      location.href = `http://localhost:3000/callback?error=womp%20womp&error_description=better%20luck%20next%20time&state=${manager.currentAuthRequest?.state}`;
      // Call the callback to trigger the completion handler
      const { authHandler } = manager as any;
      authHandler.callback.call(authHandler, location);
      return {
        onload: jest.fn(),
        focus: jest.fn(),
        innerHeight: 1000,
      } as any;
    });

    return manager.signInPopup().catch((error) => {
      expect(error.message).toMatch(/womp womp/);
    });
  });

  test('rejects with an error if the popup is blocked', (done) => {
    expect.assertions(1);

    const manager = createInstance();

    // Spy on window open
    jest.spyOn(window, 'open').mockImplementation((url, target, features) => {
      // Return null, simulating a blocked popup
      return null;
    });

    manager.signInPopup().catch((error) => {
      expect(error.message).toMatch(/The popup was blocked./);
      done();
    });
  });

  test('it submits refresh token requests', () => {
    expect.assertions(1);
    const manager = createInstance();
    fetchMock.mockResponseOnce(JSON.stringify({ access_token: 'refreshed-token' }));

    return manager.refreshAccessToken('old-token').then((tokenResponse) => {
      expect(tokenResponse.accessToken).toBe('refreshed-token');
    });
  });

  test('it submits sign out requests', () => {
    expect.assertions(1);
    const manager = createInstance();
    fetchMock.mockResponseOnce(JSON.stringify({}));

    return manager.requestSignOut('old-token').then((response) => {
      expect(response).toBeDefined();
    });
  });

  test('it submits user info requests', () => {
    expect.assertions(1);
    const manager = createInstance();
    fetchMock.mockResponseOnce(JSON.stringify({ sub: 'test-user' }));

    return manager.requestUserInfo('test-token').then((userInfo) => {
      expect(userInfo.sub).toBe('test-user');
    });
  });

  test('it parses error messages returned by api', () => {
    expect.assertions(1);
    const manager = createInstance();
    const errorResponse = {
      error: {
        message: 'Oops!',
      },
    };
    fetchMock.mockResponseOnce(JSON.stringify(errorResponse), { status: 400 });

    return manager.requestUserInfo('test-token').catch((error) => {
      expect(error.message).toEqual(expect.stringContaining(errorResponse.error.message));
    });
  });

  test('it parses poorly formed error messages returned by api', () => {
    expect.assertions(1);
    const manager = createInstance();
    const errorResponse = {
      error: 'Oops!',
    };
    fetchMock.mockResponseOnce(JSON.stringify(errorResponse), { status: 500 });

    return manager.requestUserInfo('test-token').catch((error) => {
      expect(error.message).toEqual(expect.stringContaining(errorResponse.error));
    });
  });
});
