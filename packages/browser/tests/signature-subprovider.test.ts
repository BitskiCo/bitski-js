
import { OpenidAuthProvider } from '../src/auth/openid-auth-provider';
import { Mainnet } from '../src/bitski';
import { SignerError, SignerErrorCode } from '../src/errors/signer-error';
import { SignatureSubprovider, TransactionKind } from '../src/subproviders/signature';
import { MockEngine } from './util/mock-engine';
import { MockSigner } from './util/mock-signer';
import { createRequest } from './util/rpc-utils';

function createProvider() {
  const authProvider = new OpenidAuthProvider('test-client-id', 'http://localhost/callback');
  jest.spyOn(authProvider, 'getAccessToken').mockResolvedValue('test-token');
  const instance = new SignatureSubprovider(Mainnet, new MockSigner('0xf00b4r'), authProvider);
  const provider = new MockEngine();
  provider.addProvider(instance);
  provider.start();
  return { instance, provider };
}

test('should ignore requests that dont require signatures', (done) => {
  const { provider, instance } = createProvider();
  const spy = jest.spyOn(instance, 'handleSignatureRequest');
  const request = createRequest('eth_sendRawTransaction');
  provider.sendAsync(request, () => {
    expect(spy).not.toHaveBeenCalled();
    done();
  });
});

test('should sign and submit transaction when eth_sendTransaction is called', (done) => {
    expect.assertions(8);
    const { provider, instance } = createProvider();

    const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
    };

    const request = createRequest('eth_sendTransaction', [txn]);

    // @ts-ignore
    const signSpy = jest.spyOn(instance.signer, 'sign');
    const sendSpy = jest.spyOn(instance, 'emitPayload');

    return provider.sendAsync(request, (error, value) => {
        expect(error).toBeNull();
        expect(value.result).toBe('0x');
        expect(signSpy).toBeCalled();
        const transaction = signSpy.mock.calls[0][0];
        expect(transaction).not.toBeUndefined();
        expect(transaction.payload).toMatchObject(request.params[0]);
        expect(transaction.kind).toBe(TransactionKind.SignTransaction);
        expect(sendSpy).toBeCalled();
        expect(sendSpy.mock.calls[0][0].method).toBe('eth_sendRawTransaction');
        done();
    });
});

test('should handle errors when forwarding a signed transaction fails', (done) => {
    expect.assertions(2);
    const { provider, instance } = createProvider();

    const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
    };

    const request = createRequest('eth_sendTransaction', [txn]);

    // @ts-ignore
    const signSpy = jest.spyOn(instance.signer, 'sign');
    const sendSpy = jest.spyOn(instance, 'emitPayload');
    sendSpy.mockImplementation((_, callback) => {
        callback(new Error('Service Unavailable'));
    });

    return provider.sendAsync(request, (error) => {
        // @ts-ignore
        expect(error.message).toMatch(/Service Unavailable/);
        expect(signSpy).toBeCalled();
        done();
    });
});

test('should sign transaction when eth_signTransaction is called', (done) => {
  expect.assertions(7);
  const { provider, instance } = createProvider();

  const txn = {
      from: '0x',
      to: '0x',
      value: '0x',
      gas: '0x',
      gasPrice: '0x',
  };

  const request = createRequest('eth_signTransaction', [txn]);

  // @ts-ignore
  const signSpy = jest.spyOn(instance.signer, 'sign');
  const sendSpy = jest.spyOn(instance, 'emitPayload');

  return provider.sendAsync(request, (error, value) => {
      expect(error).toBeNull();
      expect(value.result).toBe('0xf00b4r');
      expect(signSpy).toBeCalled();
      const transaction = signSpy.mock.calls[0][0];
      expect(transaction).not.toBeUndefined();
      expect(transaction.payload).toMatchObject(request.params[0]);
      expect(transaction.kind).toBe(TransactionKind.SignTransaction);
      expect(sendSpy).not.toBeCalled();
      done();
  });
});

test('should sign typed data', () => {
    expect.assertions(6);
    const { provider, instance } = createProvider();

    const typedData = {
        types: {
            EIP712Domain: [
                { name: 'name', type: 'string' },
                { name: 'version', type: 'string' },
                { name: 'chainId', type: 'uint256' },
                { name: 'verifyingContract', type: 'address' },
            ],
            Person: [
                { name: 'name', type: 'string' },
                { name: 'wallet', type: 'address' },
            ],
            Mail: [
                { name: 'from', type: 'Person' },
                { name: 'to', type: 'Person' },
                { name: 'contents', type: 'string' },
            ],
        },
        primaryType: 'Mail',
        domain: {
            name: 'Ether Mail',
            version: '1',
            chainId: 1,
            verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        },
        message: {
            from: {
                name: 'Cow',
                wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            },
            to: {
                name: 'Bob',
                wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
            },
            contents: 'Hello, Bob!',
        },
    };

    // @ts-ignore
    const signSpy = jest.spyOn(instance.signer, 'sign');

    return provider.send('eth_signTypedData', ['0xbbbb', typedData]).then((signedData) => {
        expect(signedData).toBe('0xf00b4r');
        expect(signSpy).toBeCalled();
        const transaction = signSpy.mock.calls[0][0];
        expect(transaction).not.toBeUndefined();
        expect(transaction.payload).toMatchObject(typedData);
        expect(transaction.kind).toBe(TransactionKind.SignTypedData);
        expect(transaction.context.from).toBe('0xbbbb');
    });
  });

test('should sign messages', (done) => {
  expect.assertions(8);
  const { provider, instance } = createProvider();
  const request = createRequest('eth_sign', ['0x9b2055d370f73ec7d8a03e965129118dc8f5bf83', '0xdeadbeaf']);

  // @ts-ignore
  const signSpy = jest.spyOn(instance.signer, 'sign');
  const sendSpy = jest.spyOn(instance, 'emitPayload');

  return provider.sendAsync(request, (error, value) => {
      expect(error).toBeNull();
      expect(value.result).toBe('0xf00b4r');
      expect(signSpy).toBeCalled();
      const transaction = signSpy.mock.calls[0][0];
      expect(transaction).not.toBeUndefined();
      expect(transaction.payload.from).toBe('0x9b2055d370f73ec7d8a03e965129118dc8f5bf83');
      expect(transaction.payload.message).toBe('0xdeadbeaf');
      expect(transaction.kind).toBe(TransactionKind.Sign);
      expect(sendSpy).not.toBeCalled();
      done();
  });
});

test('should sign messages with personal_sign', (done) => {
  expect.assertions(8);
  const { provider, instance } = createProvider();
  const request = createRequest('personal_sign', ['0xdeadbeaf', '0x9b2055d370f73ec7d8a03e965129118dc8f5bf83']);

  // @ts-ignore
  const signSpy = jest.spyOn(instance.signer, 'sign');
  const sendSpy = jest.spyOn(instance, 'emitPayload');

  return provider.sendAsync(request, (error, value) => {
    expect(error).toBeNull();
    expect(value.result).toBe('0xf00b4r');
    expect(signSpy).toBeCalled();
    const transaction = signSpy.mock.calls[0][0];
    expect(transaction).not.toBeUndefined();
    expect(transaction.payload.from).toBe('0x9b2055d370f73ec7d8a03e965129118dc8f5bf83');
    expect(transaction.payload.message).toBe('0xdeadbeaf');
    expect(transaction.kind).toBe(TransactionKind.Sign);
    expect(sendSpy).not.toBeCalled();
    done();
  });
});

test('it validates parameters for requests when creating transaction', () => {
    expect.assertions(18);

    const { instance } = createProvider();

    const noParamsTxn = createRequest('eth_sendTransaction');
    try {
        // @ts-ignore
        instance.createPayload(noParamsTxn);
    } catch (error) {
        expect(error).toBeInstanceOf(SignerError);
        expect(error.code).toBe(SignerErrorCode.MissingTransaction);
    }

    const emptyParamsTxn = createRequest('eth_sendTransaction', []);
    try {
        // @ts-ignore
        instance.createPayload(emptyParamsTxn);
    } catch (error) {
        expect(error).toBeInstanceOf(SignerError);
        expect(error.code).toBe(SignerErrorCode.MissingTransaction);
    }

    const noParamsMsg = createRequest('eth_sign');
    try {
        // @ts-ignore
        instance.createPayload(noParamsMsg);
    } catch (error) {
        expect(error).toBeInstanceOf(SignerError);
        expect(error.code).toBe(SignerErrorCode.MissingMessage);
    }

    const missingParamsMsg = createRequest('eth_sign', []);
    try {
        // @ts-ignore
        instance.createPayload(missingParamsMsg);
    } catch (error) {
        expect(error).toBeInstanceOf(SignerError);
        expect(error.code).toBe(SignerErrorCode.MissingMessage);
    }

    const noParamsPersonalMsg = createRequest('personal_sign');
    try {
        // @ts-ignore
        instance.createPayload(noParamsPersonalMsg);
    } catch (error) {
        expect(error).toBeInstanceOf(SignerError);
        expect(error.code).toBe(SignerErrorCode.MissingMessage);
    }

    const missingParamsPersonalMsg = createRequest('personal_sign', []);
    try {
        // @ts-ignore
        instance.createPayload(missingParamsPersonalMsg);
    } catch (error) {
        expect(error).toBeInstanceOf(SignerError);
        expect(error.code).toBe(SignerErrorCode.MissingMessage);
    }

    const noParamsTypedData = createRequest('eth_signTypedData_v3');
    try {
        // @ts-ignore
        instance.createPayload(noParamsTypedData);
    } catch (error) {
        expect(error).toBeInstanceOf(SignerError);
        expect(error.code).toBe(SignerErrorCode.MissingTypedData);
    }

    const missingParamsTypedData = createRequest('eth_signTypedData', []);
    try {
        // @ts-ignore
        instance.createPayload(missingParamsTypedData);
    } catch (error) {
        expect(error).toBeInstanceOf(SignerError);
        expect(error.code).toBe(SignerErrorCode.MissingTypedData);
    }

    const invalidMethod = createRequest('eth_signTypedData_v1', []);
    try {
        // @ts-ignore
        instance.createPayload(invalidMethod);
    } catch (error) {
        expect(error).toBeInstanceOf(SignerError);
        expect(error.code).toBe(SignerErrorCode.UnsupportedMethod);
    }
});

test('it validates method when creating a transaction', (done) => {
    expect.assertions(2);
    const { instance } = createProvider();

    const request = createRequest('invalid_method');

    instance.handleSignatureRequest(request, (error) => {
        expect(error).toBeInstanceOf(SignerError);
        expect(error.code).toBe(SignerErrorCode.UnsupportedMethod);
        done();
    });
});

test('it loads balance when using a custom RPC endpoint', (done) => {
    expect.assertions(4);
    const { provider, instance } = createProvider();
    // @ts-ignore
    instance.network.rpcUrl = 'https://custom.rpc.com';

    const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
    };

    const request = createRequest('eth_sendTransaction', [txn]);
    // @ts-ignore
    const signSpy = jest.spyOn(instance.signer, 'sign');
    const emitPayloadSpy = jest.spyOn(instance, 'emitPayload');

    provider.sendAsync(request, () => {
        expect(emitPayloadSpy).toBeCalled();
        expect(signSpy).toBeCalled();
        expect(signSpy.mock.calls[0][0].context.currentBalance).toBe('0x1'); // Default value from MockEngine
        const payload = emitPayloadSpy.mock.calls[0][0];
        expect(payload.method).toBe('eth_getBalance');
        done();
    });
});
