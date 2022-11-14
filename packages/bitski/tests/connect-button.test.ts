import { OAuthSignInMethod } from '../src/index';
import { ConnectButton, ConnectButtonSize } from '../src/-private/components/connect-button';
import { BitskiSDK } from '../src/-private/sdk';

const clientID = 'test-client-id';

function createSDK(): BitskiSDK {
  return new BitskiSDK(clientID);
}
test('it sets small attributes', () => {
  const sdk = createSDK();
  const button = new ConnectButton(async () => sdk, { size: ConnectButtonSize.Small });
  expect(button.element.classList.contains('size-small')).toBe(true);
});

test('it sets large attributes', () => {
  const sdk = createSDK();
  const button = new ConnectButton(async () => sdk, { size: ConnectButtonSize.Large });
  expect(button.element.classList.contains('size-large')).toBe(true);
});

test('it defaults to medium', () => {
  const sdk = createSDK();
  const button = new ConnectButton(async () => sdk);
  expect(button.size).toBe(ConnectButtonSize.Medium);
});

test('it inserts itself into an existing HTMLElement', () => {
  const element = document.createElement('div');
  const sdk = createSDK();
  const button = new ConnectButton(async () => sdk, { container: element });
  expect(element.firstChild).toBe(button.element);
});

test('it does not throw when no callback', () => {
  const sdk = createSDK();
  const button = new ConnectButton(async () => sdk);
  jest.spyOn(sdk, 'signInOrConnect').mockResolvedValue({} as any);
  expect(() => {
    (button as any).signin();
  }).not.toThrow();
});

test('it does not throw when received error and no callback', () => {
  const sdk = createSDK();
  const button = new ConnectButton(async () => sdk);
  jest.spyOn(sdk, 'signInOrConnect').mockRejectedValue('foo');
  expect(() => {
    (button as any).signin();
  }).not.toThrow();
});

test('it calls the callback on success', (done) => {
  const sdk = createSDK();
  jest.spyOn(sdk, 'signInOrConnect').mockResolvedValue({} as any);
  const callback = (error, user) => {
    expect(error).toBeUndefined();
    expect(user).toBeDefined();
    done();
  };
  const button = new ConnectButton(async () => sdk, undefined, callback);
  (button as any).signin();
});

test('it calls the callback on error', (done) => {
  const sdk = createSDK();
  const button = new ConnectButton(async () => sdk);
  jest.spyOn(sdk, 'signInOrConnect').mockRejectedValue(new Error('foo error'));
  const callback = (error, user) => {
    expect(error).toBeDefined();
    expect(user).toBeUndefined();
    done();
  };
  button.callback = callback;
  (button as any).signin();
});

test('it uses provided authentication mode', (done) => {
  expect.assertions(1);
  const sdk = createSDK();
  const button = new ConnectButton(async () => sdk, {
    authMethod: OAuthSignInMethod.Redirect,
  });
  jest.spyOn(sdk, 'signInOrConnect').mockImplementation(((method) => {
    expect(method).toBe(OAuthSignInMethod.Redirect);
    done();
    return Promise.resolve();
  }) as any);
  (button as any).signin();
});

test('it passes provided sign in options', (done) => {
  expect.assertions(2);
  const sdk = createSDK();
  const button = new ConnectButton(async () => sdk, {
    authMethod: OAuthSignInMethod.Redirect,
    signInOptions: { login_hint: 'signup' },
  });
  jest.spyOn(sdk, 'signInOrConnect').mockImplementation(((method, options) => {
    expect(options.login_hint).toBe('signup');
    expect(method).toBe(OAuthSignInMethod.Redirect);
    done();
    return Promise.resolve();
  }) as any);
  (button as any).signin();
});

test('it can remove itself from the DOM', () => {
  expect.assertions(2);
  const sdk = createSDK();
  const button = new ConnectButton(async () => sdk);
  const parent = document.createElement('div');
  parent.appendChild(button.element);
  expect(button.element.parentElement).toBe(parent);
  button.remove();
  expect(button.element.parentElement).toBeNull();
});
