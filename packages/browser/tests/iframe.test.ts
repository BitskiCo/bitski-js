import mock from 'xhr-mock';
import { OpenidAuthProvider } from '../src/auth/openid-auth-provider';
import { Dialog } from '../src/components/dialog';
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

const clientID = 'test-client-id';

const GET_ACCESS_TOKEN_TIMEOUT = 500;

function createAuthProvider(): OpenidAuthProvider {
    return new OpenidAuthProvider(clientID, 'http://localhost/callback');
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

function prepareAuthenticatedSession(authProvider: OpenidAuthProvider) {
    jest.spyOn(authProvider, 'getAccessToken').mockResolvedValue('test-token');
}

beforeEach(() => {
    mock.setup();
});

afterEach(() => {
    mock.teardown();
});

describe('it handles sends with authorization', () => {

    test('iframe: should show approval dialog for eth_sendTransaction', (done) => {
        expect.assertions(4);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        const request = createRequest('eth_sendTransaction', []);

        // @ts-ignore
        const spy = jest.spyOn(instance, 'urlForMethod');

        prepareAuthenticatedSession(authProvider);
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
            expect(spy).toBeCalled();
            expect(spy.mock.results[0].value).toBe('https://www.bitski.com/eth-send-transaction');
            done();
        });
    });

    test('iframe: should show approval dialog for eth_sign', (done) => {
        expect.assertions(4);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        const request = createRequest('eth_sign', []);

        // @ts-ignore
        const spy = jest.spyOn(instance, 'urlForMethod');

        prepareAuthenticatedSession(authProvider);

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
            expect(spy).toBeCalled();
            expect(spy.mock.results[0].value).toBe('https://www.bitski.com/eth-sign');
            done();
        });
    });

    test('iframe: should show approval dialog for personal_sign', (done) => {
        expect.assertions(4);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        const request = createRequest('personal_sign', []);

        // @ts-ignore
        const spy = jest.spyOn(instance, 'urlForMethod');

        prepareAuthenticatedSession(authProvider);

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
            expect(spy).toBeCalled();
            expect(spy.mock.results[0].value).toBe('https://www.bitski.com/eth-sign');
            done();
        });
    });

    test('iframe: should ignore messages when from another host', (done) => {
        expect.assertions(1);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        prepareAuthenticatedSession(authProvider);

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
            done();
        }, GET_ACCESS_TOKEN_TIMEOUT);
    });

    test('iframe: should ignore messages when they don\'t have IDs that match the current request', (done) => {
        expect.assertions(1);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        prepareAuthenticatedSession(authProvider);

        const mismatchedRequestMock = jest.fn();
        const request = createRequest('eth_sendTransaction', []);

        engine.sendAsync(request, (error, value) => {
            mismatchedRequestMock(error, value);
        });

        setTimeout(() => {
            const message = new MessageEvent('worker', {
                data: {
                    id: 20,
                    jsonrpc: '2.0',
                    result: '0xf00',
                },
                origin: 'https://www.bitski.com',
            });
            instance.receiveMessage(message);
            expect(mismatchedRequestMock).not.toHaveBeenCalled();
            done();
        }, GET_ACCESS_TOKEN_TIMEOUT);
    });

    test('iframe: should not validate id if original request did not have an id', (done) => {
        expect.assertions(1);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);

        const request = createRequest('eth_sendTransaction', []);
        delete request.id;
        const mismatchedRequestMock = jest.fn();

        instance.currentRequest = [request, mismatchedRequestMock];

        setTimeout(() => {
            const message = new MessageEvent('worker', {
                data: {
                    id: 0,
                    jsonrpc: '2.0',
                    result: '0xf00',
                },
                origin: 'https://www.bitski.com',
            });
            instance.receiveMessage(message);
            expect(mismatchedRequestMock).toHaveBeenCalled();
            done();
        }, GET_ACCESS_TOKEN_TIMEOUT);
    });

    test('iframe: should close existing dialog if one is already open', (done) => {
        expect.assertions(3);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        prepareAuthenticatedSession(authProvider);

        const request = createRequest('eth_sendTransaction', []);

        const dummyDialog = new Dialog('hello world');
        const dismissMock = jest.spyOn(dummyDialog, 'dismiss');
        const nextMock = jest.fn();
        const endMock = jest.fn();

        instance.currentRequestDialog = dummyDialog;

        // @ts-ignore
        instance.currentRequest = [nextMock, endMock];

        instance.handleAuthorization(request, () => { /* */ }, () => { /* */ });

        setTimeout(() => {
            expect(dismissMock).toHaveBeenCalled();
            expect(nextMock).not.toHaveBeenCalled();
            expect(endMock).toHaveBeenCalled();
            done();
        }, 1000);
    });
});
