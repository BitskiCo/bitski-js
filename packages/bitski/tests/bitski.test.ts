import { User } from '../src/-private/auth/user';
import { BitskiSDK, ProviderOptions } from '../src/-private/sdk';
import { AuthenticationStatus, Bitski, Goerli, Mainnet, OAuthSignInMethod } from '../src/index';
import fetchMock from 'jest-fetch-mock';
import MemStore from './util/mem-store';
import { ID_TOKEN_KEY } from '../src/-private/constants';

const clientID = 'test-client-id';

const dummyUser = new User('test-user');

function createInstance(opts?: ProviderOptions): Bitski {
  window.Bitski = { BitskiSDK: BitskiSDK };
  return new Bitski(clientID, '', undefined, opts);
}

describe('managing providers', () => {
  beforeEach(() => {
    // This doesn't seem to be working. Instead catching network errors and silencing them.
    fetchMock.mockResponse(JSON.stringify({ jsonrpc: '2.0', id: 0, result: null }));
    (window as any).ethereum = undefined;
  });

  test('should get a mainnet provider by default', async () => {
    const bitski = createInstance();
    const provider = bitski.getProvider();

    const chainId = await provider.request({ method: 'eth_chainId' });

    expect(parseInt(chainId as string, 16)).toBe(Mainnet.chainId);
  });

  test('should get a mainnet provider when passing options with no network name', async () => {
    const bitski = createInstance();
    const provider = bitski.getProvider({ pollingInterval: 1000000 });
    expect(provider).toBeDefined();

    const chainId = await provider.request({ method: 'eth_chainId' });
    expect(parseInt(chainId as string, 16)).toBe(Mainnet.chainId);
  });

  test('should be able to pass a network name as a string', async () => {
    const bitski = createInstance();
    const provider = bitski.getProvider('goerli');
    expect(provider).toBeDefined();

    const chainId = await provider.request({ method: 'eth_chainId' });
    expect(parseInt(chainId as string, 16)).toBe(Goerli.chainId);
  });

  test('should be able to pass a network name in options', async () => {
    const bitski = createInstance();
    const provider = bitski.getProvider({ networkName: 'goerli' });
    expect(provider).toBeDefined();

    const chainId = await provider.request({ method: 'eth_chainId' });
    expect(parseInt(chainId as string, 16)).toBe(Goerli.chainId);
  });

  test('passing an invalid network name results in an error', () => {
    const bitski = createInstance();
    expect(() => {
      bitski.getProvider('ropstem');
    }).toThrow(/Unsupported network/);
  });

  test('should be able to pass a custom network in options', async () => {
    const bitski = createInstance();
    const provider = bitski.getProvider({
      network: {
        rpcUrl: 'http://localhost:3000/web3',
        chainId: 123,
      },
    });

    const chainId = await provider.request({ method: 'eth_chainId' });
    expect(parseInt(chainId as string, 16)).toBe(123);
  });

  test('should be able to pass in custom configuration', async () => {
    const bitski = createInstance();
    const provider = bitski.getProvider({
      network: {
        rpcUrl: 'https://api-v2.otl.com/web3/goerli',
        chainId: 4,
      },
      webBaseUrl: 'https://next.bitski.com',
    });
    expect(provider).toBeDefined();

    const innerProvider = await (provider as any).providerPromise;

    expect(innerProvider.config.additionalHeaders['X-CLIENT-ID']).toBe(clientID);
    expect(innerProvider.config.signerBaseUrl).toBe('https://next.bitski.com');
    expect(await innerProvider.store.getCurrentChainId()).toBe('0x4');
    expect(await innerProvider.store.findChain('0x4')).toEqual({
      chainId: '0x4',
      rpcUrls: ['https://api-v2.otl.com/web3/goerli'],
    });
  });

  test('should pass additional headers to providers', async () => {
    const bitski = createInstance();
    const provider = bitski.getProvider({
      networkName: 'goerli',
      additionalHeaders: {
        'X-FOO-FEATURE': 'ENABLED',
      },
    });
    provider.on('error', (error) => {});
    expect(provider).toBeDefined();

    const innerProvider = await (provider as any).providerPromise;

    expect(innerProvider.config.additionalHeaders['X-FOO-FEATURE']).toBe('ENABLED');
  });

  test('should throw an error when passing host string as name', () => {
    const bitski = createInstance();
    expect(() => {
      bitski.getProvider('http://localhost:7545');
    }).toThrow(/Unsupported network name/);
  });
});

describe('authentication', () => {
  test('start calls signInOrConnect', async () => {
    expect.assertions(3);
    const bitski = createInstance();
    const authProvider = (await (bitski as any).loadSDK()).authProvider;
    const spy = jest.spyOn(authProvider, 'signInOrConnect');
    spy.mockResolvedValue(dummyUser);
    return bitski.start().then((user) => {
      expect(user).toBe(dummyUser);
      expect(spy).toHaveBeenCalled();
      expect((window as any).ethereum).not.toBeUndefined();
    });
  });

  test('should get auth status from auth provider', async () => {
    const bitski = createInstance();
    const authProvider = (await (bitski as any).loadSDK()).authProvider;
    const spy = jest.spyOn(authProvider, 'getAuthStatus');
    spy.mockReturnValue(Promise.resolve(AuthenticationStatus.Connected));
    const authStatus = await bitski.getAuthStatus();
    expect(authStatus).toBe(AuthenticationStatus.Connected);
    expect(authStatus).toBe(await bitski.getAuthStatus());
  });

  test('should log in via popup', async () => {
    expect.assertions(3);
    const bitski = createInstance();
    const authProvider = (await (bitski as any).loadSDK()).authProvider;
    const spy = jest.spyOn(authProvider, 'signIn');
    spy.mockResolvedValue(dummyUser);
    return bitski.signIn().then((user) => {
      expect(spy).toHaveBeenCalledWith(OAuthSignInMethod.Popup, undefined);
      expect(user).toBe(dummyUser);
      expect((window as any).ethereum).not.toBeUndefined();
    });
  });

  test('should pass options when signing in', async () => {
    expect.assertions(2);
    const bitski = createInstance();
    const authProvider = (await (bitski as any).loadSDK()).authProvider;
    const spy = jest.spyOn(authProvider, 'signIn');
    spy.mockResolvedValue(dummyUser);
    const opts = { login_hint: 'foo' };
    return bitski.signIn(opts).then((user) => {
      expect(spy).toHaveBeenCalledWith(OAuthSignInMethod.Popup, opts);
      expect(user).toBe(dummyUser);
    });
  });

  test('can login via redirect', async () => {
    expect.assertions(1);
    const bitski = createInstance();
    const authProvider = (await (bitski as any).loadSDK()).authProvider;
    const spy = jest.spyOn(authProvider, 'signIn');
    spy.mockResolvedValue(dummyUser);
    bitski.signInRedirect();

    return new Promise((resolve) => {
      setTimeout(() => {
        expect(spy).toHaveBeenCalledWith(OAuthSignInMethod.Redirect, undefined);
        resolve(null);
      }, 500);
    });
  });

  test('should pass options when signing in via redirect', async () => {
    expect.assertions(1);
    const bitski = createInstance();
    const authProvider = (await (bitski as any).loadSDK()).authProvider;
    const spy = jest.spyOn(authProvider, 'signIn');
    spy.mockResolvedValue(dummyUser);
    const opts = { login_hint: 'foo' };
    bitski.signInRedirect(opts);

    return new Promise((resolve) => {
      setTimeout(() => {
        expect(spy).toHaveBeenCalledWith(OAuthSignInMethod.Redirect, opts);
        resolve(null);
      }, 500);
    });
  });

  test('should connect by refreshing access token', async () => {
    expect.assertions(2);
    const bitski = createInstance();
    const authProvider = (await (bitski as any).loadSDK()).authProvider;
    localStorage.setItem('bitski.refresh_token.test-client-id', 'test-refresh-token');
    const spy = jest.spyOn(authProvider, 'refreshAccessToken');
    const userSpy = jest.spyOn(authProvider, 'loadUser');
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

  test('can get user from auth provider', async () => {
    expect.assertions(2);
    const bitski = createInstance();
    const authProvider = (await (bitski as any).loadSDK()).authProvider;
    const spy = jest.spyOn(authProvider, 'getUser');
    const mockUser = {
      sub: 'test-user',
    };
    spy.mockResolvedValue(mockUser);
    return bitski.getUser().then((user) => {
      expect(spy).toHaveBeenCalled();
      expect(user).toBe(mockUser);
    });
  });

  test('should submit redirect callback', async () => {
    const bitski = createInstance();
    const authProvider = (await (bitski as any).loadSDK()).authProvider;
    const spy = jest.spyOn(authProvider, 'redirectCallback');
    bitski.redirectCallback();

    // wait a tick to make sure we get past all the promises in the way
    return new Promise((resolve) => {
      setTimeout(() => {
        expect((window as any).ethereum).not.toBeUndefined();
        expect(spy).toHaveBeenCalled();
        resolve(null);
      });
    });
  });

  test('can add and remove signout callbacks', async () => {
    expect.assertions(3);
    const bitski = createInstance();
    const sdk = await (bitski as any).loadSDK();
    expect(sdk.signoutHandlers.length).toEqual(0);
    const callback = jest.fn();
    await bitski.addSignOutHandler(callback);
    expect(sdk.signoutHandlers.length).toEqual(1);
    await bitski.removeSignOutHandler(callback);
    expect(sdk.signoutHandlers.length).toEqual(0);
  });

  test('signout callbacks are called upon sign out', async () => {
    expect.assertions(1);
    const bitski = createInstance();
    const authProvider = (await (bitski as any).loadSDK()).authProvider;
    jest.spyOn(authProvider.oauthManager, 'requestSignOut').mockResolvedValue({});
    const callback = jest.fn();
    bitski.addSignOutHandler(callback);
    return bitski.signOut().then(() => {
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});

describe('working with access tokens', () => {
  test('should be able to get an access token if the user is logged in', async () => {
    const bitski = createInstance();
    const authProvider = (await (bitski as any).loadSDK()).authProvider;
    jest.spyOn(authProvider, 'getAccessToken').mockResolvedValue('test-access-token');
    return bitski.getCurrentAccessToken().then((accessToken) => {
      expect(accessToken).toBe('test-access-token');
    });
  });

  test('should be able to get a refresh token if the user is logged in', async () => {
    const bitski = createInstance();
    const authProvider = (await (bitski as any).loadSDK()).authProvider;
    jest.spyOn(authProvider, 'getRefreshToken').mockResolvedValue('test-refresh-token');
    return bitski.getCurrentRefreshToken().then((refreshToken) => {
      expect(refreshToken).toBe('test-refresh-token');
    });
  });
});

describe('connect button', () => {
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
});

describe('reinitializing', () => {
  test('should do nothing on initialize if user has not signed in', async () => {
    const bitski = createInstance();
    const spy = jest.spyOn(bitski, 'connect');
    await bitski.initialize();

    expect((window as any).ethereum).not.toBeUndefined();
    expect(spy.mock.calls.length).toBe(0);
  });

  test('should be able to pass callback to connect button', async () => {
    const store = new MemStore();
    store.setItem(ID_TOKEN_KEY, 'test-id-token');

    const bitski = createInstance({
      store,
    });
    const spy = jest.spyOn(bitski, 'connect').mockImplementation((() => {}) as any);
    await bitski.initialize();

    expect(spy.mock.calls.length).toBe(1);
  });
});
