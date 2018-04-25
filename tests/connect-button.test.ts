import { Bitski } from '../src/bitski';
import { UserManager, InMemoryWebStorage, WebStorageStateStore } from 'oidc-client';
import { ConnectButton, ConnectButtonSize } from '../src/components/connect-button';

function createInstance(): Bitski {
  const store = new InMemoryWebStorage();
  const stateStore = new WebStorageStateStore({ prefix: 'bitski.', store: store});
  const settings = {
    userStore: stateStore,
    stateStore: stateStore,
  }
  return new Bitski('test-client-id', undefined, undefined, settings);
}

test('it sets small attributes', () => {
  const instance = createInstance();
  const button = new ConnectButton(instance, undefined, ConnectButtonSize.SMALL);
  expect(button.element.style.height).toBe('20px');
});

test('it sets large attributes', () => {
  const instance = createInstance();
  const button = new ConnectButton(instance, undefined, ConnectButtonSize.LARGE);
  expect(button.element.style.height).toBe('40px');
});

test('it defaults to medium', () => {
  const instance = createInstance();
  const button = new ConnectButton(instance);
  expect(button.size).toBe(ConnectButtonSize.MEDIUM);
});

test('it inserts itself into an existing HTMLElement', () => {
  const element = document.createElement('div');
  const instance = createInstance();
  const button = new ConnectButton(instance, element);
  expect(element.firstChild).toBe(button.element);
});

test('it does not throw when no callback', () => {
  const instance = createInstance();
  const button = new ConnectButton(instance);
  jest.spyOn(instance, 'signIn').mockResolvedValue({});
  expect(() => { button['signin']() }).not.toThrow();
});

test('it does not throw when received error and no callback', () => {
  const instance = createInstance();
  const button = new ConnectButton(instance);
  jest.spyOn(instance, 'signIn').mockRejectedValue('foo');
  expect(() => { button['signin']() }).not.toThrow();
});

test('it calls the callback on success', done => {
  const instance = createInstance();
  const button = new ConnectButton(instance);
  jest.spyOn(instance, 'signIn').mockResolvedValue({});
  const callback = function(error, user) {
    expect(error).toBeUndefined();
    expect(user).toBeDefined();
    done();
  }
  button.callback = callback;
  button['signin']();
});

test('it calls the callback on error', done => {
  const instance = createInstance();
  const button = new ConnectButton(instance);
  jest.spyOn(instance, 'signIn').mockRejectedValue(new Error('foo error'));
  const callback = function(error, user) {
    expect(error).toBeDefined();
    expect(user).toBeUndefined();
    done();
  }
  button.callback = callback;
  button['signin']();
});

test('it sets focus and blur states', () => {
  const instance = createInstance();
  const button = new ConnectButton(instance);
  const defaultColor = button.element.style.backgroundColor;
  //test focus
  button.element.dispatchEvent(new Event('focus'));
  expect(button.element.style.backgroundColor).not.toBe(defaultColor);
  //test blur
  button.element.dispatchEvent(new Event('blur'));
  expect(button.element.style.backgroundColor).toBe(defaultColor);
});
