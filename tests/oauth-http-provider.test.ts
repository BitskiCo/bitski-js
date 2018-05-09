import { AccessToken } from '../src/access-token';
import { OAuthHttpProvider } from '../src/providers/oauth-http-provider';

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
  return new OAuthHttpProvider('my-host', 1000);
}

test('should always be connected', () => {
  const provider = createProvider();
  return expect(provider.isConnected()).toBe(true);
});

test('access tokens without expiration date should never be expired', () => {
  const mockNeverExpiredAccessToken = new AccessToken('test-access-token');
  expect(mockNeverExpiredAccessToken.expired).toBe(false);
});
