import { InMemoryWebStorage, User, WebStorageStateStore } from 'oidc-client';
import mock from 'xhr-mock';
import { OAuthProviderIntegrationType } from '../src/auth/auth-provider';
import { OpenidAuthProvider } from '../src/auth/openid-auth-provider';
import { IFrameSubprovider } from '../src/subproviders/iframe';
import { MockEngine } from './util/mock-engine';

const mockUser = {
    access_token: 'test-access-token',
    expired: false,
    expires_at: Math.floor(Date.now() / 1000) + 60,
    expires_in: 60,
    id_token: 'test-id-token',
    profile: null,
    scope: 'openid',
    scopes: [],
    session_state: null,
    state: null,
    toStorageString: jest.fn().mockReturnValue('{ "id_token": "test-id-token", "session_state": "test-session-state", "access_token": "test-access-token" }'),
    token_type: '',
};

const mockExpiredUser = {
    access_token: 'test-access-token',
    expired: false,
    expires_at: Math.floor(Date.now() / 1000) + 60,
    expires_in: 60,
    id_token: 'test-id-token',
    profile: null,
    scope: 'openid',
    scopes: [],
    session_state: null,
    state: null,
    toStorageString: jest.fn().mockReturnValue('{ "id_token": "test-id-token", "session_state": "test-session-state", "access_token": "test-access-token" }'),
    token_type: '',
};

const clientID = 'test-client-id';

const GET_ACCESS_TOKEN_TIMEOUT = 500;

function createAuthProvider(): OpenidAuthProvider {
    const store = new InMemoryWebStorage();
    const stateStore = new WebStorageStateStore({ prefix: 'bitski.', store });
    const otherSettings = {
        stateStore,
        userStore: stateStore,
    };
    return new OpenidAuthProvider(clientID, 'http://localhost/callback', 'http://localhost/callback', otherSettings);
}

function createInstance(authProvider: OpenidAuthProvider): IFrameSubprovider {
    return new IFrameSubprovider('https://www.bitski.com', 'kovan', authProvider);
}

function createRequest(method: string, params: any[]): any {
    return {
        id: 0,
        jsonrpc: '2.0',
        method,
        params,
    };
}

function prepareAuthenticatedSession(authProvider: OpenidAuthProvider): Promise<User> {
    jest.spyOn(authProvider.userManager, 'signinPopup').mockResolvedValueOnce(mockUser);
    return authProvider.signIn(OAuthProviderIntegrationType.POPUP).then((user) => {
        jest.spyOn(authProvider.userManager, 'getUser').mockResolvedValue(user);
        return user;
    });
}

beforeEach(() => {
    mock.setup();
});

afterEach(() => {
    mock.teardown();
});

describe('it handles sends with authorization', () => {
    test('IFrame: should show approval dialog by default', (done) => {
        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        const request = createRequest('eth_sendTransaction', []);

        return prepareAuthenticatedSession(authProvider).then((user) => {
            const mockResponse = {
                id: 0,
                jsonrpc: '2.0',
                result: 'foo',
            };

            setTimeout(() => {
                const message = new MessageEvent('worker', {
                    data: mockResponse,
                    origin: 'https://www.bitski.com',
                });

                instance.receiveMessage(message);
            }, GET_ACCESS_TOKEN_TIMEOUT);

            return engine.sendAsync(request, (error, value) => {
                expect(error).toBeNull();
                expect(value.result).toBe('foo');
                done();
            });
        });
    });

    test('IFrame: should ignore messages when from another host', () => {
        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        return prepareAuthenticatedSession(authProvider).then((user) => {
            const responseMock = jest.fn();
            const request = createRequest('eth_sendTransaction', []);

            engine.sendAsync(request, (error, value) => {
                responseMock(error, value);
            });
            setTimeout(() => {
                const message = new MessageEvent('worker', {
                    data: {
                        id: 0,
                        jsonrpc: '2.0',
                        result: 'foo',
                    },
                    origin: 'https://www.foo.com',
                });
                instance.receiveMessage(message);
                expect(responseMock).not.toHaveBeenCalled();
            }, GET_ACCESS_TOKEN_TIMEOUT);
        });
    });

    test('IFrame: should ignore messages when they don\'t have IDs that match the current request', (done) => {
        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        return prepareAuthenticatedSession(authProvider).then((user) => {
            const mismatchedRequestMock = jest.fn();
            const request = createRequest('eth_sendTransaction', []);

            engine.sendAsync(request, (error, value) => {
                mismatchedRequestMock(error, value);
            });

            setTimeout(() => {
                const message = new MessageEvent('worker', {
                    origin: 'https://www.bitski.com',
                    data: {
                        foo: 'bar',
                    }
                });
                instance.receiveMessage(message);
                expect(mismatchedRequestMock).not.toHaveBeenCalled();

                done();
            }, GET_ACCESS_TOKEN_TIMEOUT);
        });
    });

    test('Iframe: should close existing dialog if one is already open', (done) => {
        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        return prepareAuthenticatedSession(authProvider).then((user) => {
            const request = createRequest('eth_sendTransaction', []);
            engine.sendAsync(request, (error) => {
                expect(error).not.toBeUndefined();
            });

            setTimeout(() => {
                if (instance.currentTransactionDialog) {
                    const dismissMock = instance.currentTransactionDialog.dismiss = jest.fn();

                    engine.sendAsync(request, () => {});
    
                    setTimeout(() => {
                        expect(dismissMock).toHaveBeenCalled();
                        done();
                    }, GET_ACCESS_TOKEN_TIMEOUT);
                } else {
                    done();
                }
            }, GET_ACCESS_TOKEN_TIMEOUT);
        });
    });
});
