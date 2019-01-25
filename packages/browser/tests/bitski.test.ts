import { User } from '../src/auth/user';
import { AuthenticationStatus, Bitski, OAuthSignInMethod } from '../src/bitski';

const clientID = 'test-client-id';

const dummyUser = new User('test-user');

function createInstance(): Bitski {
  return new Bitski(clientID, '');
}

describe('managing providers', () => {
  test('should get a mainnet provider by default', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider();
    expect(provider).toBeDefined();
    // @ts-ignore
    expect(provider.rpcUrl.includes('mainnet')).toBe(true);
  });

  test('should be able to pass a network name as a string', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider('rinkeby');
    expect(provider).toBeDefined();
    // @ts-ignore
    expect(provider.rpcUrl.includes('rinkeby')).toBe(true);
  });

  test('should be able to pass a network name in options', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider({ networkName: 'rinkeby' });
    expect(provider).toBeDefined();
    // @ts-ignore
    expect(provider.rpcUrl.includes('rinkeby')).toBe(true);
  });

  test('should be able to pass a rpcUrl in options', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider({ rpcUrl: 'http://localhost:3000/web3' });
    expect(provider).toBeDefined();
    // @ts-ignore
    expect(provider.rpcUrl).toBe('http://localhost:3000/web3');
  });

  test('should be able to pass in custom configuration', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider({
      networkName: 'rinkeby',
      rpcUrl: 'https://api-v2.bitski.com/web3/rinkeby',
      webBaseUrl: 'https://next.bitski.com',
    });
    expect(provider).toBeDefined();
    // @ts-ignore
    expect(provider.networkName).toBe('rinkeby');
    // @ts-ignore
    expect(provider.webBaseUrl).toBe('https://next.bitski.com');
    // @ts-ignore
    expect(provider.rpcUrl).toBe('https://api-v2.bitski.com/web3/rinkeby');
  });

  test('should pass settings to provider-engine', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider({ networkName: 'mainnet', pollingInterval: 10000000 });
    // @ts-ignore
    expect(provider._blockTracker._pollingInterval).toBe(10000000);
  });

  test('should create new provider if one doesnt yet exist', () => {
    const bitski = createInstance();
    // @ts-ignore
    expect(bitski.engines.size).toBe(0);
    const provider = bitski.getProvider('kovan');
    // @ts-ignore
    expect(bitski.engines.size).toBe(1);
  });

  test('should not create a new provider if one already exists for that network', () => {
    const bitski = createInstance();
    // @ts-ignore
    expect(bitski.engines.size).toBe(0);
    bitski.getProvider('kovan');
    // @ts-ignore
    expect(bitski.engines.size).toBe(1);
    bitski.getProvider('kovan');
    // @ts-ignore
    expect(bitski.engines.size).toBe(1);
  });

  test('should stop all engines when signing out', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider('kovan');
    // @ts-ignore
    expect(provider._blockTracker._isRunning).toBe(true);
    bitski.signOut();
    // @ts-ignore
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
    // @ts-ignore
    expect(providerEngine.rpcUrl === 'http://localhost:7545');
  });
});

describe('authentication', () => {

  test('start calls signInOrConnect', () => {
    expect.assertions(2);
    const bitski = createInstance();
    // @ts-ignore
    const spy = jest.spyOn(bitski.authProvider, 'signInOrConnect');
    spy.mockResolvedValue(dummyUser);
    return bitski.start().then((user) => {
      expect(user).toBe(dummyUser);
      expect(spy).toHaveBeenCalled();
    });
  });

  test('should get auth status from auth provider', () => {
    const bitski = createInstance();
    // @ts-ignore
    const spy = jest.spyOn(bitski.authProvider, 'authStatus', 'get');
    spy.mockReturnValue(AuthenticationStatus.Connected);
    return bitski.getAuthStatus().then((authStatus) => {
      expect(authStatus).toBe(AuthenticationStatus.Connected);
    });
  });

  test('should log in via popup', () => {
    expect.assertions(2);
    const bitski = createInstance();
    // @ts-ignore
    const spy = jest.spyOn(bitski.authProvider, 'signIn');
    spy.mockResolvedValue(dummyUser);
    return bitski.signIn().then((user) => {
      expect(spy).toHaveBeenCalledWith(OAuthSignInMethod.Popup);
      expect(user).toBe(dummyUser);
    });
  });

  test('can login via redirect', (done) => {
    expect.assertions(1);
    const bitski = createInstance();
    // @ts-ignore
    const spy = jest.spyOn(bitski.authProvider, 'signIn');
    spy.mockResolvedValue(dummyUser);
    bitski.signInRedirect();
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(OAuthSignInMethod.Redirect);
      done();
    }, 500);
  });

  test('should connect by refreshing access token', () => {
    expect.assertions(2);
    const bitski = createInstance();
    localStorage.setItem('bitski.refresh_token.test-client-id', 'test-refresh-token');
    // @ts-ignore
    const spy = jest.spyOn(bitski.authProvider, 'refreshAccessToken');
    // @ts-ignore
    const userSpy = jest.spyOn(bitski.authProvider, 'loadUser');
    const mockUser = {
      accounts: ['test-account'],
      id: 'foo',
    };
    userSpy.mockResolvedValue(mockUser);
    spy.mockResolvedValue('test-access-token');
    return bitski.connect().then((user) => {
      expect(spy).toHaveBeenCalled();
      expect(user).toBe(mockUser);
      localStorage.clear();
    });
  });

  test('can get user from auth provider', () => {
    expect.assertions(2);
    const bitski = createInstance();
    // @ts-ignore
    const spy = jest.spyOn(bitski.authProvider, 'getUser');
    const mockUser = {
      sub: 'test-user',
    };
    spy.mockResolvedValue(mockUser);
    return bitski.getUser().then((user) => {
      expect(spy).toHaveBeenCalled();
      expect(user).toBe(mockUser);
    });
  });

});

test('should submit redirect callback', () => {
  const bitski = createInstance();
  // @ts-ignore
  const spy = jest.spyOn(bitski.authProvider, 'redirectCallback');
  bitski.redirectCallback();
  expect(spy).toHaveBeenCalled();
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
