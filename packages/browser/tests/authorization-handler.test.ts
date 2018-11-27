import { AuthorizationHandler } from '../src/subproviders/authorization-handler';

describe('authorization handler', () => {

  test('it sets default options', () => {
    const handler = new AuthorizationHandler();
    //@ts-ignore
    expect(handler.authorizedMethods).toContain('eth_sendTransaction');
  });

  test('it sets options when provided', () => {
    const opts = { authorizedMethods: ['foo_bar'] };
    const handler = new AuthorizationHandler(opts);
    //@ts-ignore
    expect(handler.authorizedMethods).toBe(opts.authorizedMethods);
  });

  test('it ignores options when invalid', () => {
    const opts = {};
    const handler = new AuthorizationHandler(opts);
    //@ts-ignore
    expect(handler.authorizedMethods).toContain('eth_sendTransaction');
  });

  test('it catches authorized methods', () => {
    const handler = new AuthorizationHandler();
    const spy = jest.spyOn(handler, 'handleAuthorization');
    const payload = {
      method: 'eth_sendTransaction'
    };
    handler.handleRequest(payload, () => {}, () => {});
    expect(spy).toBeCalled();
  });

  test('it ignores non-authorized methods', () => {
    const handler = new AuthorizationHandler();
    const spy = jest.spyOn(handler, 'handleAuthorization');
    const payload = {
      method: 'eth_accounts'
    };
    handler.handleRequest(payload, () => {}, () => {});
    expect(spy).not.toBeCalled();
  });

});
