import { InMemoryWebStorage, WebStorageStateStore } from 'oidc-client';
import { OAuthSignInMethod } from '../src/auth/auth-provider';
import { OpenidAuthProvider } from '../src/auth/openid-auth-provider';
import { ConnectButton, ConnectButtonSize } from '../src/components/connect-button';

const clientID = 'test-client-id';

function createAuthProvider(): OpenidAuthProvider {
  const store = new InMemoryWebStorage();
  const stateStore = new WebStorageStateStore({ prefix: 'bitski.', store });
  const otherSettings = {
    stateStore,
    userStore: stateStore,
  };
  return new OpenidAuthProvider(clientID, '', otherSettings);
}
test('it sets small attributes', () => {
  const authProvider = createAuthProvider();
  const button = new ConnectButton(authProvider, undefined, ConnectButtonSize.Small);
  expect(button.element.style.height).toBe('20px');
});

test('it sets large attributes', () => {
  const authProvider = createAuthProvider();
  const button = new ConnectButton(authProvider, undefined, ConnectButtonSize.Large);
  expect(button.element.style.height).toBe('40px');
});

test('it defaults to medium', () => {
  const authProvider = createAuthProvider();
  const button = new ConnectButton(authProvider);
  expect(button.size).toBe(ConnectButtonSize.Medium);
});

test('it inserts itself into an existing HTMLElement', () => {
  const element = document.createElement('div');
  const authProvider = createAuthProvider();
  const button = new ConnectButton(authProvider, element);
  expect(element.firstChild).toBe(button.element);
});

test('it does not throw when no callback', () => {
  const authProvider = createAuthProvider();
  const button = new ConnectButton(authProvider);
  jest.spyOn(authProvider, 'signInOrConnect').mockResolvedValue({});
  expect(() => { button['signin'](); }).not.toThrow();
});

test('it does not throw when received error and no callback', () => {
  const authProvider = createAuthProvider();
  const button = new ConnectButton(authProvider);
  jest.spyOn(authProvider, 'signInOrConnect').mockRejectedValue('foo');
  expect(() => { button['signin'](); }).not.toThrow();
});

test('it calls the callback on success', done => {
  const authProvider = createAuthProvider();
  jest.spyOn(authProvider, 'signIn').mockResolvedValue({});
  const callback = (error, user) => {
    expect(error).toBeUndefined();
    expect(user).toBeDefined();
    done();
  };
  const button = new ConnectButton(authProvider, undefined, undefined, undefined, callback);
  button['signin']();
});

test('it calls the callback on error', (done) => {
  const authProvider = createAuthProvider();
  const button = new ConnectButton(authProvider);
  jest.spyOn(authProvider, 'signIn').mockRejectedValue(new Error('foo error'));
  const callback = (error, user) => {
    expect(error).toBeDefined();
    expect(user).toBeUndefined();
    done();
  };
  button.callback = callback;
  button['signin']();
});

test('it sets focus and blur states', () => {
  const authProvider = createAuthProvider();
  const button = new ConnectButton(authProvider);
  const defaultColor = button.element.style.backgroundColor;
  // test focus
  button.element.dispatchEvent(new Event('focus'));
  expect(button.element.style.backgroundColor).not.toBe(defaultColor);
  // test blur
  button.element.dispatchEvent(new Event('blur'));
  expect(button.element.style.backgroundColor).toBe(defaultColor);
});

test('it uses provided authentication mode', (done) => {
  expect.assertions(1);
  const authProvider = createAuthProvider();
  const button = new ConnectButton(authProvider, undefined, undefined, OAuthSignInMethod.Redirect);
  jest.spyOn(authProvider, 'signIn').mockImplementation((method) => {
    expect(method).toBe(OAuthSignInMethod.Redirect);
    done();
    return Promise.resolve();
  });
  button['signin']();
});

test('it can remove itself from the DOM', () => {
  expect.assertions(2);
  const authProvider = createAuthProvider();
  const button = new ConnectButton(authProvider);
  const parent = document.createElement('div');
  parent.appendChild(button.element);
  expect(button.element.parentElement).toBe(parent);
  button.remove();
  expect(button.element.parentElement).toBeNull();
});
