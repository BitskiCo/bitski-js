import { OpenidAuthProvider } from '../src/auth/openid-auth-provider';
import { OAuthSignInMethod } from '../src/bitski';
import { ConnectButton, ConnectButtonSize } from '../src/components/connect-button';

const clientID = 'test-client-id';

function createAuthProvider(): OpenidAuthProvider {
  return new OpenidAuthProvider(clientID, '');
}
test('it sets small attributes', () => {
  const authProvider = createAuthProvider();
  const button = new ConnectButton(authProvider, undefined, ConnectButtonSize.Small);
  expect(button.element.classList.contains('size-small')).toBe(true);
});

test('it sets large attributes', () => {
  const authProvider = createAuthProvider();
  const button = new ConnectButton(authProvider, undefined, ConnectButtonSize.Large);
  expect(button.element.classList.contains('size-large')).toBe(true);
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
  expect(() => { button.signin(); }).not.toThrow();
});

test('it does not throw when received error and no callback', () => {
  const authProvider = createAuthProvider();
  const button = new ConnectButton(authProvider);
  jest.spyOn(authProvider, 'signInOrConnect').mockRejectedValue('foo');
  expect(() => { button.signin(); }).not.toThrow();
});

test('it calls the callback on success', (done) => {
  const authProvider = createAuthProvider();
  jest.spyOn(authProvider, 'signIn').mockResolvedValue({});
  const callback = (error, user) => {
    expect(error).toBeUndefined();
    expect(user).toBeDefined();
    done();
  };
  const button = new ConnectButton(authProvider, undefined, undefined, undefined, callback);
  button.signin();
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
  button.signin();
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
  button.signin();
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
