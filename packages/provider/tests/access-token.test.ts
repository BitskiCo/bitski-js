import { AccessToken } from '../src/index';

test('does not expire if no expiration date exists', () => {
  const token = new AccessToken('test-token', undefined);
  expect(token.expired).toBe(false);
});

test('properly calculates expired', () => {
  const regularToken = new AccessToken('test-token', 100000000000);
  const expiredToken = new AccessToken('test-token', -1);
  expect(regularToken.expired).toBe(false);
  expect(expiredToken.expired).toBe(true);
});
