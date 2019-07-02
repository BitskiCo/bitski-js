import { SignerError, SignerErrorCode } from '../src/errors/signer-error';
import { BitskiTransactionSigner } from '../src/signing/transaction-signer';
import { TransactionKind } from '../src/subproviders/signature';

function createInstance() {
  return new BitskiTransactionSigner('test://test.bitski.com', 'https://test-api.bitski.com/v1', {});
}

function triggerMessage(signer, message, timeout = 500) {
  setTimeout(() => {
    signer.receiveMessage(message);
  }, timeout);
}

beforeEach(() => {
  // @ts-ignore
  fetch.resetMocks();
});

test('it should create a signature via iframe', (done) => {
  expect.assertions(7);
  const instance = createInstance();

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

  // @ts-ignore
  fetch.mockResponse(JSON.stringify({ transaction }), 201);

  // @ts-ignore
  instance.sign(transaction, 'test-token').then((signed) => {
    expect(signed).toBe('foo');
    expect(fetch).toBeCalled();
    // @ts-ignore
    const [url, params] = fetch.mock.calls[0];

    expect(url).toBe('https://test-api.bitski.com/v1/transactions');
    expect(params.method).toBe('POST');
    expect(params.headers['Content-Type']).toBe('application/json');
    expect(params.headers.Authorization).toBe('Bearer test-token');

    const parsed = JSON.parse(params.body);
    expect(parsed.transaction).toMatchObject(transaction);
    done();
  });

  const message = new MessageEvent('worker', {
    data: {
        id: 0,
        jsonrpc: '2.0',
        result: 'foo',
    },
    origin: 'https://sign.bitski.com',
  });

  triggerMessage(instance, message);
});

test('it should pass errors from signing', (done) => {
  expect.assertions(2);
  const instance = createInstance();

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
  // @ts-ignore
  fetch.mockResponse(JSON.stringify({ transaction }), 201);

  // @ts-ignore
  instance.sign(transaction, 'test-token').catch((error) => {
    expect(error).toBe('foo');
    expect(fetch).toBeCalled();
    done();
  });

  const message = new MessageEvent('worker', {
    data: {
        id: 0,
        jsonrpc: '2.0',
        error: 'foo',
    },
    origin: 'https://sign.bitski.com',
  });

  triggerMessage(instance, message);
});

test('should ignore messages when there is no current request', () => {
  const instance = createInstance();

  const message = new MessageEvent('worker', {
    data: {
        id: 0,
        jsonrpc: '2.0',
        result: 'foo',
    },
    origin: 'https://sign.bitski.com',
  });

  // @ts-ignore
  instance.receiveMessage(message);
});

test('should ignore messages received from another host', () => {
  expect.assertions(1);
  const instance = createInstance();
  const responseMock = jest.fn();

  // @ts-ignore
  instance.currentRequest = [responseMock, responseMock];

  const message = new MessageEvent('worker', {
      data: {
          id: 0,
          jsonrpc: '2.0',
          result: 'foo',
      },
      origin: 'https://www.foo.com',
  });
  // @ts-ignore
  instance.receiveMessage(message);
  expect(responseMock).not.toHaveBeenCalled();
});

test('should ignore messages received with no data', () => {
  expect.assertions(1);
  const instance = createInstance();
  const responseMock = jest.fn();

  // @ts-ignore
  instance.currentRequest = [responseMock, responseMock];

  const message = new MessageEvent('worker', {
      origin: 'https://sign.bitski.com',
  });
  // @ts-ignore
  instance.receiveMessage(message);
  expect(responseMock).not.toHaveBeenCalled();
});

test('should ignore messages when from same window', () => {
  expect.assertions(1);
  const instance = createInstance();

  // @ts-ignore Set a current request so that it continues
  instance.currentRequest = [jest.fn(), jest.fn()];

  const responseMock = jest.fn();

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
  // @ts-ignore
  instance.receiveMessage(message);
  expect(responseMock).not.toHaveBeenCalled();
});

test('sign() should close existing dialog if one is already open', (done) => {
  expect.assertions(4);
  const instance = createInstance();

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

  // Stub first transaction request
  // @ts-ignore
  fetch.mockResponse(JSON.stringify({ transaction }), 201);

  let dismissSpy;
  // Create the first transaction request to trigger the dialog
  instance.sign(transaction, 'test-access-token').catch((error) => {
    expect(error).toBeInstanceOf(SignerError);
    expect(error.code).toBe(SignerErrorCode.UserCancelled);
    expect(dismissSpy).toBeCalled();
    done();
  });

  setTimeout(() => {
    // @ts-ignore
    expect(instance.currentRequestDialog).toBeDefined();

    // @ts-ignore
    dismissSpy = jest.spyOn(instance.currentRequestDialog, 'close');

    // Stub next request
    // @ts-ignore
    fetch.mockResponse(JSON.stringify({ transaction }), 201);

    // Trigger second request to dismiss original request
    instance.sign(transaction, 'test-access-token');
  }, 500);
});
