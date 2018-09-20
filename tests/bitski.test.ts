import { Log } from 'oidc-client';
import { InMemoryWebStorage, WebStorageStateStore } from '../node_modules/oidc-client';
import { Bitski } from '../src/bitski';

const clientID = 'test-client-id';

function createInstance(): Bitski {
  const store = new InMemoryWebStorage();
  const stateStore = new WebStorageStateStore({ prefix: 'bitski.', store });
  const otherSettings = {
    stateStore,
    userStore: stateStore,
  };
  return new Bitski(clientID, undefined, undefined, otherSettings);
}

describe('managing providers', () => {
  test('should get a provider by default', () => {
    const bitski = createInstance();
    const provider = bitski.getProvider();
    expect(provider).toBeDefined();
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

  test('should create regular HTTPProvider when passing host string', () => {
    const bitski = createInstance();
    const providerEngine = bitski.getProvider('http://localhost:7545');
    expect(providerEngine !== undefined);
  });
});

test('should be able to create connect button', () => {
  const bitski = createInstance();
  const connectButton = bitski.getConnectButton();
  expect(connectButton).toBeDefined();
  expect(connectButton.element.onclick).toBeDefined();
});

test('should be able to set logger and log level', () => {
  const bitski = createInstance();
  bitski.setLogger(console);
  expect(Log.logger).toBe(console);

  bitski.setLogger(console, Log.DEBUG);
  expect(Log.level).toBe(Log.DEBUG);

  bitski.setLogger(console, Log.NONE);
});
