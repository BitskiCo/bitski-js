import { OAuthHttpProvider } from '../src/providers/oauth-http-provider';
import { InMemoryWebStorage, WebStorageStateStore, UserManager } from 'oidc-client';

const mockUser = {
  id_token: 'test-id-token',
  session_state: 'test-session-state',
  access_token: 'test-access-token',
  scope: 'openid',
  profile: null,
  expires_at: 0,
  expires_in: null,
  expired: false,
  token_type: '',
  state: null,
  toStorageString: jest.fn(),
  scopes: []
};

function createProvider(networkName?: string): OAuthHttpProvider {
  const store = new InMemoryWebStorage();
  const stateStore = new WebStorageStateStore({ prefix: 'bitski.', store: store});
  const settings = {
    userStore: stateStore,
    stateStore: stateStore,
  }
  const userManager = new UserManager(settings);
  return new OAuthHttpProvider('my-host', 1000, userManager);
}

test('should always be connected', () => {
  const provider = createProvider();
  return expect(provider.isConnected()).toBe(true);
});

test('should post message to parent when didSignIn when in iframe', () => {
  const provider = createProvider();
  const spy = jest.spyOn(provider, 'isInFrame').mockReturnValue(true);
  const parentSpy = jest.spyOn(window.parent, 'postMessage');
  provider.didSignIn(mockUser);
  expect(spy).toHaveBeenCalled();
  expect(parentSpy).toHaveBeenCalledWith(mockUser, '*');
});
