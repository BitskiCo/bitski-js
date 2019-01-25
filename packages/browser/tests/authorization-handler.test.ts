import { AuthorizationHandler } from '../src/subproviders/authorization-handler';

class MockAuthorizationHandler extends AuthorizationHandler {
  public handleAuthorization(req, next, end) {
    // ignore
  }
}

describe('authorization handler', () => {

  test('it sets default options', () => {
    const handler = new MockAuthorizationHandler();
    // @ts-ignore
    expect(handler.authorizedMethods).toContain('eth_sendTransaction');
  });

  test('it sets options when provided', () => {
    const opts = { authorizedMethods: ['foo_bar'] };
    const handler = new MockAuthorizationHandler(opts);
    // @ts-ignore
    expect(handler.authorizedMethods).toBe(opts.authorizedMethods);
  });

  test('it ignores options when invalid', () => {
    const opts = {};
    const handler = new MockAuthorizationHandler(opts);
    // @ts-ignore
    expect(handler.authorizedMethods).toContain('eth_sendTransaction');
  });

  test('it catches authorized methods', () => {
    const handler = new MockAuthorizationHandler();
    const spy = jest.spyOn(handler, 'handleAuthorization');
    const payload = {
      method: 'eth_sendTransaction',
    };
    handler.handleRequest(payload, () => { /* */ }, () => { /* */ });
    expect(spy).toBeCalled();
  });

  test('it ignores non-authorized methods', () => {
    const handler = new MockAuthorizationHandler();
    const spy = jest.spyOn(handler, 'handleAuthorization');
    const payload = {
      method: 'eth_accounts',
    };
    handler.handleRequest(payload, () => { /* */ }, () => { /* */ });
    expect(spy).not.toBeCalled();
  });

});
