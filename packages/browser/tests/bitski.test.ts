import { Log } from 'oidc-client';
import { OAuthSignInMethod } from '../src/auth/auth-provider';
import { InMemoryWebStorage, WebStorageStateStore } from '../node_modules/oidc-client';
import { Bitski, AuthenticationStatus } from '../src/bitski';

const clientID = 'test-client-id';

function createInstance(): Bitski {
  const store = new InMemoryWebStorage();
  const stateStore = new WebStorageStateStore({ prefix: 'bitski.', store });
  const otherSettings = {
    stateStore,
    userStore: stateStore,
  };
  return new Bitski(clientID, undefined, otherSettings);
}

describe('managing providers', () => {
  test('should get a provider by default', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider();
    expect(provider).toBeDefined();
    //@ts-ignore
    expect(provider.rpcUrl.includes('mainnet')).toBe(true);
  });

  test('should be able to pass a network name', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider('rinkeby');
    expect(provider).toBeDefined();
    //@ts-ignore
    expect(provider.rpcUrl.includes('rinkeby')).toBe(true);
  });

  test('should pass settings to provider-engine', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider('mainnet', { pollingInterval: 10000000 });
    //@ts-ignore
    expect(provider._blockTracker._pollingInterval).toBe(10000000);
  });

  test('should create new provider if one doesnt yet exist', () => {
    const bitski = createInstance();
    expect(bitski['engines'].size).toBe(0);
    const provider = bitski.getProvider('kovan');
    expect(bitski['engines'].size).toBe(1);
  });

  test('should not create a new provider if one already exists for that network', () => {
    const bitski = createInstance();
    expect(bitski['engines'].size).toBe(0);
    bitski.getProvider('kovan');
    expect(bitski['engines'].size).toBe(1);
    bitski.getProvider('kovan');
    expect(bitski['engines'].size).toBe(1);
  });

  test('should stop all engines when signing out', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider('kovan');
    //@ts-ignore
    expect(provider._blockTracker._isRunning).toBe(true);
    bitski.signOut();
    //@ts-ignore
    expect(provider._blockTracker._isRunning).toBe(false);
  });

  test('should stop engine when force logged out', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider('kovan');
    const spy = jest.spyOn(provider, 'stop');
    provider.emit('error', new Error('Not signed in'));
    expect(spy).toHaveBeenCalled();
  });

  test('should create regular RPCProvider when passing host string', () => {
    const bitski = createInstance();
    const providerEngine = bitski.getProvider('http://localhost:7545');
    expect(providerEngine !== undefined);
    //@ts-ignore
    expect(providerEngine.rpcUrl == 'http://localhost:7545');
  });
});

describe('authentication', () => {

  test('should get auth status from auth provider', () => {
    const bitski = createInstance();
    //@ts-ignore
    const spy = jest.spyOn(bitski.authProvider, 'getAuthStatus');
    spy.mockResolvedValue(AuthenticationStatus.Connected);
    return bitski.getAuthStatus().then(authStatus => {
      expect(authStatus).toBe(AuthenticationStatus.Connected);
    });
  });

  test('should log in via popup', () => {
    expect.assertions(2);
    const bitski = createInstance();
    //@ts-ignore
    const spy = jest.spyOn(bitski.authProvider, 'signIn');
    const mockUser = {
      sub: 'test-user',
      expired: false
    };
    spy.mockResolvedValue(mockUser);
    return bitski.signIn().then(user => {
      expect(spy).toHaveBeenCalledWith(OAuthSignInMethod.Popup);
      expect(user).toBe(mockUser);
    });
  });

  test('should connect by logging in silently', () => {
    expect.assertions(2);
    const bitski = createInstance();
    //@ts-ignore
    const spy = jest.spyOn(bitski.authProvider, 'signIn');
    const mockUser = {
      sub: 'test-user',
      expired: false
    };
    spy.mockResolvedValue(mockUser);
    return bitski.connect().then(user => {
      expect(spy).toHaveBeenCalledWith(OAuthSignInMethod.Silent);
      expect(user).toBe(mockUser);
    });
  });

  test('can get user from auth provider', () => {
    expect.assertions(2);
    const bitski = createInstance();
    //@ts-ignore
    const spy = jest.spyOn(bitski.authProvider, 'getUser');
    const mockUser = {
      sub: 'test-user',
      expired: false
    };
    spy.mockResolvedValue(mockUser);
    return bitski.getUser().then(user => {
      expect(spy).toHaveBeenCalled();
      expect(user).toBe(mockUser);
    });
  });

});

describe('when handling callbacks', () => {
  test('should forward oauth login method if provided', () => {
    const bitski = createInstance();
    //@ts-ignore
    const spy = jest.spyOn(bitski.authProvider, 'signInCallback');
    bitski.redirectCallback();
    expect(spy).toHaveBeenCalledWith(OAuthSignInMethod.Redirect, undefined);
  });

  test('should forward url when provided', () => {
    const bitski = createInstance();
    //@ts-ignore
    const spy = jest.spyOn(bitski.authProvider, 'signInCallback');
    bitski.redirectCallback('http://foo.bar/callback');
    expect(spy).toHaveBeenCalledWith(OAuthSignInMethod.Redirect, 'http://foo.bar/callback');
  });

  test('should default to popup login method', () => {
    const bitski = createInstance();
    //@ts-ignore
    const spy = jest.spyOn(bitski.authProvider, 'signInCallback');
    bitski.callback();
    expect(spy).toHaveBeenCalledWith(OAuthSignInMethod.Popup);
  });
});

test('should be able to create connect button', () => {
  const bitski = createInstance();
  const connectButton = bitski.getConnectButton();
  expect(connectButton).toBeDefined();
  expect(connectButton.element.onclick).toBeDefined();
});

test('should be able to pass callback to connect button', () => {
  const bitski = createInstance();
  const callback = jest.fn();
  const connectButton = bitski.getConnectButton(undefined, callback);
  expect(connectButton.callback).toBe(callback);
});

test('should be able to set logger and log level', () => {
  const bitski = createInstance();
  bitski.setLogger(console);
  expect(Log.logger).toBe(console);

  bitski.setLogger(console, Log.DEBUG);
  expect(Log.level).toBe(Log.DEBUG);

  bitski.setLogger(console, Log.NONE);
});
