
import { OpenidAuthProvider } from '../src/auth/openid-auth-provider';
import { Dialog } from '../src/components/dialog';
import { IFrameSubprovider, TransactionKind } from '../src/subproviders/iframe';
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
    return new IFrameSubprovider('https://www.bitski.com', 'https://api.bitski.com/v1', 1, authProvider);
}

function createRequest(method: string, params?: any[]): any {
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
    // @ts-ignore
    fetch.resetMocks();
});

describe('it handles sends with authorization', () => {

    test('iframe: should show approval dialog for eth_sendTransaction', (done) => {
        expect.assertions(6);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        const txn = {
            from: '0x',
            to: '0x',
            value: '0x',
            gas: '0x',
            gasPrice: '0x'
        };

        const request = createRequest('eth_sendTransaction', [txn]);

        // @ts-ignore
        const showModalSpy = jest.spyOn(instance, 'showAuthorizationModal');

        showModalSpy.mockImplementation((_, req) => {
            // @ts-ignore
            instance.currentRequest = req;
        });

        // @ts-ignore
        const submitTransactionSpy = jest.spyOn(instance, 'submitTransaction');
        submitTransactionSpy.mockImplementation((transaction) => {
            return Promise.resolve({ transaction });
        });

        prepareAuthenticatedSession(authProvider);

        setTimeout(() => {
            const message = new MessageEvent('worker', {
                data: {
                    id: 0,
                    jsonrpc: '2.0',
                    result: 'foo',
                },
                origin: 'https://sign.bitski.com',
            });

            instance.receiveMessage(message);
        }, GET_ACCESS_TOKEN_TIMEOUT);

        return engine.sendAsync(request, (error, value) => {
            expect(error).toBeNull();
            expect(value.result).toBe('foo');
            expect(showModalSpy).toBeCalled();
            const transaction = showModalSpy.mock.calls[0][0];
            expect(transaction).not.toBeUndefined();
            expect(transaction.payload).toMatchObject(request.params[0]);
            expect(transaction.kind).toBe(TransactionKind.SendTransaction);
            done();
        });
    });

    test('iframe: should show approval dialog for eth_signTransaction', (done) => {
        expect.assertions(6);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        const txn = {
            from: '0x',
            to: '0x',
            value: '0x',
            gas: '0x',
            gasPrice: '0x',
        };

        const request = createRequest('eth_signTransaction', [txn]);

        // @ts-ignore
        const showModalSpy = jest.spyOn(instance, 'showAuthorizationModal');

        showModalSpy.mockImplementation((_, req) => {
            // @ts-ignore
            instance.currentRequest = req;
        });

        // @ts-ignore
        const submitTransactionSpy = jest.spyOn(instance, 'submitTransaction');
        submitTransactionSpy.mockImplementation((transaction) => {
            return Promise.resolve({ transaction });
        });

        prepareAuthenticatedSession(authProvider);

        setTimeout(() => {
            const message = new MessageEvent('worker', {
                data: {
                    id: 0,
                    jsonrpc: '2.0',
                    result: 'foo',
                },
                origin: 'https://sign.bitski.com',
            });

            instance.receiveMessage(message);
        }, GET_ACCESS_TOKEN_TIMEOUT);

        return engine.sendAsync(request, (error, value) => {
            expect(error).toBeNull();
            expect(value.result).toBe('foo');
            expect(showModalSpy).toBeCalled();
            const transaction = showModalSpy.mock.calls[0][0];
            expect(transaction).not.toBeUndefined();
            expect(transaction.payload).toMatchObject(request.params[0]);
            expect(transaction.kind).toBe(TransactionKind.SignTransaction);
            done();
        });
    });

    test('iframe: should show approval dialog for eth_sign', (done) => {
        expect.assertions(7);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        const request = createRequest('eth_sign', ['0x9b2055d370f73ec7d8a03e965129118dc8f5bf83', '0xdeadbeaf']);

        // @ts-ignore
        const showModalSpy = jest.spyOn(instance, 'showAuthorizationModal');

        showModalSpy.mockImplementation((_, req) => {
            // @ts-ignore
            instance.currentRequest = req;
        });

        // @ts-ignore
        const submitTransactionSpy = jest.spyOn(instance, 'submitTransaction');
        submitTransactionSpy.mockImplementation((transaction) => {
            return Promise.resolve({ transaction });
        });

        prepareAuthenticatedSession(authProvider);

        setTimeout(() => {
            const message = new MessageEvent('worker', {
                data: {
                    id: 0,
                    jsonrpc: '2.0',
                    result: 'foo',
                },
                origin: 'https://www.bitski.com',
            });

            instance.receiveMessage(message);
        }, GET_ACCESS_TOKEN_TIMEOUT);

        return engine.sendAsync(request, (error, value) => {
            expect(error).toBeNull();
            expect(value.result).toBe('foo');
            expect(showModalSpy).toBeCalled();
            const transaction = showModalSpy.mock.calls[0][0];
            expect(transaction).not.toBeUndefined();
            expect(transaction.payload.from).toBe('0x9b2055d370f73ec7d8a03e965129118dc8f5bf83');
            expect(transaction.payload.message).toBe('0xdeadbeaf');
            expect(transaction.kind).toBe(TransactionKind.Sign);
            done();
        });
    });

    test('iframe: should show approval dialog for personal_sign', (done) => {
        expect.assertions(7);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        const request = createRequest('personal_sign', ['0xdeadbeaf', '0x9b2055d370f73ec7d8a03e965129118dc8f5bf83']);

        // @ts-ignore
        const showModalSpy = jest.spyOn(instance, 'showAuthorizationModal');

        showModalSpy.mockImplementation((_, req) => {
            // @ts-ignore
            instance.currentRequest = req;
        });

        // @ts-ignore
        const submitTransactionSpy = jest.spyOn(instance, 'submitTransaction');
        submitTransactionSpy.mockImplementation((transaction) => {
            return Promise.resolve({ transaction });
        });

        prepareAuthenticatedSession(authProvider);

        setTimeout(() => {
            const message = new MessageEvent('worker', {
                data: {
                    id: 0,
                    jsonrpc: '2.0',
                    result: 'foo',
                },
                origin: 'https://www.bitski.com',
            });

            instance.receiveMessage(message);
        }, GET_ACCESS_TOKEN_TIMEOUT);

        return engine.sendAsync(request, (error, value) => {
            expect(error).toBeNull();
            expect(value.result).toBe('foo');
            expect(showModalSpy).toBeCalled();
            const transaction = showModalSpy.mock.calls[0][0];
            expect(transaction).not.toBeUndefined();
            expect(transaction.payload.from).toBe('0x9b2055d370f73ec7d8a03e965129118dc8f5bf83');
            expect(transaction.payload.message).toBe('0xdeadbeaf');
            expect(transaction.kind).toBe(TransactionKind.Sign);
            done();
        });
    });

    test('should properly submit transactions to the server', async () => {
        expect.assertions(6);
        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);

        const transaction = {
            id: 'test-id',
            kind: TransactionKind.Sign,
            payload: {
                from: '0xf00',
                message: '0xb45',
            },
            context: {
                chainId: 1,
            },
        };

        const accessToken = 'test-token';

        // @ts-ignore
        fetch.mockResponse(JSON.stringify({ transaction }), 201);

        // @ts-ignore
        await instance.submitTransaction(transaction, accessToken);

        expect(fetch).toBeCalled();

        // @ts-ignore
        const [url, params] = fetch.mock.calls[0];

        expect(url).toBe('https://api.bitski.com/v1/transactions');
        expect(params.method).toBe('POST');
        expect(params.headers['Content-Type']).toBe('application/json');
        expect(params.headers['Authorization']).toBe('Bearer test-token');

        const parsed = JSON.parse(params.body);
        expect(parsed.transaction).toMatchObject(transaction);
    });

    test('it validates parameters for requests when creating transaction', () => {
        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);

        const noParamsTxn = createRequest('eth_sendTransaction');

        expect(() => {
            // @ts-ignore
            instance.createPayload(noParamsTxn);
        }).toThrow(/Invalid request/);

        const emptyParamsTxn = createRequest('eth_sendTransaction', []);

        expect(() => {
            // @ts-ignore
            instance.createPayload(emptyParamsTxn);
        }).toThrow(/Invalid request/);

        const noParamsMsg = createRequest('eth_sign');

        expect(() => {
            // @ts-ignore
            instance.createPayload(noParamsMsg);
        }).toThrow(/Invalid request/);

        const missingParamsMsg = createRequest('eth_sign', []);

        expect(() => {
            // @ts-ignore
            instance.createPayload(missingParamsMsg);
        }).toThrow(/Invalid request/);

        const noParamsPersonalMsg = createRequest('personal_sign');

        expect(() => {
            // @ts-ignore
            instance.createPayload(noParamsPersonalMsg);
        }).toThrow(/Invalid request/);

        const missingParamsPersonalMsg = createRequest('personal_sign', []);

        expect(() => {
            // @ts-ignore
            instance.createPayload(missingParamsPersonalMsg);
        }).toThrow(/Invalid request/);

        const invalidMethod = createRequest('eth_signTypedData', []);

        expect(() => {
            // @ts-ignore
            instance.createPayload(invalidMethod);
        }).toThrow(/Method not supported/);
    });

    test('it validates method when creating a transaction', (done) => {
        expect.assertions(1);
        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        prepareAuthenticatedSession(authProvider);

        const request = createRequest('invalid_method');

        instance.handleAuthorization(request, (error) => {
            expect(error.message).toMatch(/Method not supported/);
            done();
        });
    });

    test('iframe: should ignore messages when from another host', () => {
        expect.assertions(1);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);

        const responseMock = jest.fn();
        const request = createRequest('eth_sendTransaction', []);

        // @ts-ignore
        instance.currentRequest = [request, responseMock];

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
    });

    test('iframe: should ignore messages when no data is included', () => {
        expect.assertions(1);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);

        const responseMock = jest.fn();
        const request = createRequest('eth_sendTransaction', []);

        // @ts-ignore
        instance.currentRequest = [request, responseMock];

        const message = new MessageEvent('worker', {
            origin: 'https://sign.bitski.com',
        });

        instance.receiveMessage(message);
        expect(responseMock).not.toHaveBeenCalled();
    });

    test('iframe: should ignore messages when from another host', () => {
        expect.assertions(1);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);

        const responseMock = jest.fn();
        const request = createRequest('eth_sendTransaction', []);

        // @ts-ignore Set a current request so that it continues
        instance.currentRequest = [request, jest.fn()];

        // @ts-ignore Set a dialog instead of a current request to assert that it returns
        instance.currentRequestDialog = { dismiss: responseMock };

        const message = new MessageEvent('worker', {
            data: {
                id: 0,
                jsonrpc: '2.0',
                result: 'foo',
            },
            origin: 'http://myetherwallet.com',
        });

        instance.receiveMessage(message);
        expect(responseMock).not.toHaveBeenCalled();
    });

    test('iframe: should ignore messages when from same window', () => {
        expect.assertions(1);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);

        const responseMock = jest.fn();
        const request = createRequest('eth_sendTransaction', []);

        // @ts-ignore Set a current request so that it continues
        instance.currentRequest = [request, jest.fn()];

        // @ts-ignore Set a dialog instead of a current request to assert that it returns
        instance.currentRequestDialog = { dismiss: responseMock };

        const message = new MessageEvent('worker', {
            data: {
                id: 0,
                jsonrpc: '2.0',
                result: 'foo',
            },
            origin: 'https://sign.bitski.com',
            source: window,
        });

        instance.receiveMessage(message);
        expect(responseMock).not.toHaveBeenCalled();
    });

    test('iframe: should dismiss dialog and call callback when message is valid', () => {
        expect.assertions(4);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);

        const responseMock = jest.fn();
        const request = createRequest('eth_sendTransaction', []);

        const mockDialog = { dismiss: jest.fn() };

        // @ts-ignore
        instance.currentRequestDialog = mockDialog;
        // @ts-ignore
        instance.currentRequest = [request, responseMock];

        const message = new MessageEvent('worker', {
            data: {
                id: 0,
                jsonrpc: '2.0',
                result: 'foo',
            },
            origin: 'https://sign.bitski.com',
        });

        instance.receiveMessage(message);

        // @ts-ignore
        expect(instance.currentRequest).toBeUndefined();

        // @ts-ignore
        expect(instance.currentRequestDialog).toBeUndefined();

        expect(responseMock).toHaveBeenCalledWith(undefined, 'foo');
        expect(mockDialog.dismiss).toHaveBeenCalled();
    });

    test('iframe: should close existing dialog if one is already open', (done) => {
        expect.assertions(4);

        const authProvider = createAuthProvider();
        const instance = createInstance(authProvider);
        const engine = new MockEngine();
        engine.addProvider(instance);

        prepareAuthenticatedSession(authProvider);

        const txn = {
            from: '0x',
            to: '0x',
            value: '0x',
            gas: '0x',
            gasPrice: '0x',
        };

        const request = createRequest('eth_sendTransaction', [txn]);

        const dummyDialog = new Dialog('hello world');
        const dismissMock = jest.spyOn(dummyDialog, 'close');
        const newCallback = jest.fn();
        const existingCallback = jest.fn();
        dummyDialog.onClose = existingCallback;

        // @ts-ignore
        const submitTransactionSpy = jest.spyOn(instance, 'submitTransaction');
        submitTransactionSpy.mockImplementation((transaction) => {
            return Promise.resolve({ transaction });
        });

        // @ts-ignore
        instance.currentRequestDialog = dummyDialog;

        // @ts-ignore
        instance.currentRequest = [request, existingCallback];

        instance.handleAuthorization(request, newCallback);

        setTimeout(() => {
            expect(dismissMock).toHaveBeenCalled();
            expect(existingCallback).toHaveBeenCalled();
            expect(newCallback).not.toHaveBeenCalled();

            // @ts-ignore
            instance.currentRequestDialog.close();
            expect(newCallback).toHaveBeenCalled();

            done();
        }, 1000);
    });
});
