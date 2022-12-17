import { EthMethod } from 'eth-provider-types';
import createBrowserSigner from '../../src/signers/browser';
import { createBitskiTransaction } from '../../src/utils/transaction';
import { createTestProvider } from '../util/create-provider';
import { fireEvent } from '@testing-library/dom';
import { sleep } from '../util/async';
import { Mainnet } from '../../src/constants';

const getAccessToken = async () => 'test-access-token';

describe('signature middleware', () => {
  describe('basic signing functionality', () => {
    test('should send transaction when eth_sendTransaction is called', async () => {
      expect.assertions(3);
      const provider = createTestProvider();

      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      fetchMock.mockResponse(async (req) => {
        const { method, params } = await req.json();
        expect(method).toEqual(EthMethod.eth_sendTransaction);
        expect(params[0]).toEqual(txn);

        return JSON.stringify({ result: '0x123' });
      });

      const result = await provider.request({
        method: EthMethod.eth_sendTransaction,
        params: [txn],
      });

      expect(result).toBe('0x123');
    });

    test('should send transaction with access token if available', async () => {
      expect.assertions(4);
      const provider = createTestProvider({ getAccessToken });

      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      fetchMock.mockResponse(async (req) => {
        const { method, params } = await req.json();
        expect(req.headers.get('Authorization')).toBe('Bearer test-access-token');
        expect(method).toEqual(EthMethod.eth_sendTransaction);
        expect(params[0]).toEqual(txn);

        return JSON.stringify({ result: '0x123' });
      });

      const result = await provider.request({
        method: EthMethod.eth_sendTransaction,
        params: [txn],
      });

      expect(result).toBe('0x123');
    });

    test('should send transaction after it is signed when eth_sendTransaction is called with an unsupported network', async () => {
      expect.assertions(7);
      const provider = createTestProvider();

      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      fetchMock
        .mockResponseOnce(async (req) => {
          const { method, params } = await req.json();
          expect(req.url).toEqual('https://www.example.com/rpc');
          expect(method).toEqual(EthMethod.eth_signTransaction);
          expect(params[0]).toEqual(txn);

          return JSON.stringify({ result: '0x123' });
        })
        .mockResponseOnce(async (req) => {
          const { method, params } = await req.json();
          expect(req.url).toEqual('https://www.example.com/rpc');
          expect(method).toEqual(EthMethod.eth_sendRawTransaction);
          expect(params[0]).toEqual('0x123');

          return JSON.stringify({ result: '0x123' });
        });

      await provider.request({
        method: EthMethod.wallet_addEthereumChain,
        params: [{ chainId: '0x12345', rpcUrls: ['https://www.example.com/rpc'] }],
      });
      await provider.request({
        method: EthMethod.wallet_switchEthereumChain,
        params: [{ chainId: '0x12345' }],
      });

      const result = await provider.request({
        method: EthMethod.eth_sendTransaction,
        params: [txn],
      });

      expect(result).toBe('0x123');
    });

    test('should handle errors when forwarding a signed transaction fails', async () => {
      expect.assertions(5);
      const provider = createTestProvider();

      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      fetchMock
        .mockResponseOnce(async (req) => {
          const { method, params } = await req.json();
          expect(method).toEqual(EthMethod.eth_signTransaction);
          expect(params[0]).toEqual(txn);

          return JSON.stringify({ result: '0x123' });
        })
        .mockResponseOnce(async (req) => {
          const { method, params } = await req.json();
          expect(method).toEqual(EthMethod.eth_sendRawTransaction);
          expect(params[0]).toEqual('0x123');

          return {
            status: 500,
            body: JSON.stringify({ error: 'Service unavailable' }),
          };
        });

      await provider.request({
        method: EthMethod.wallet_addEthereumChain,
        params: [{ chainId: '0x12345', rpcUrls: ['https://www.example.com/rpc'] }],
      });
      await provider.request({
        method: EthMethod.wallet_switchEthereumChain,
        params: [{ chainId: '0x12345' }],
      });

      try {
        await provider.request({ method: EthMethod.eth_sendTransaction, params: [txn] });
      } catch (e) {
        expect((e as Error).message).toEqual('Service unavailable');
      }
    });

    test('should sign transaction when eth_signTransaction is called', async () => {
      expect.assertions(3);
      const provider = createTestProvider();

      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      fetchMock.mockResponseOnce(async (req) => {
        const { method, params } = await req.json();
        expect(method).toEqual(EthMethod.eth_signTransaction);
        expect(params[0]).toEqual(txn);

        return JSON.stringify({ result: '0x123' });
      });

      const result = await provider.request({
        method: EthMethod.eth_signTransaction,
        params: [txn],
      });

      expect(result).toBe('0x123');
    });

    test('should sign typed data', async () => {
      expect.assertions(4);
      const provider = createTestProvider();

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

      fetchMock.mockResponseOnce(async (req) => {
        const { method, params } = await req.json();
        expect(method).toEqual(EthMethod.eth_signTypedData);
        expect(params[0]).toBe('0xf00');
        expect(params[1]).toEqual(typedData);

        return JSON.stringify({ result: '0x123' });
      });

      const result = await provider.request({
        method: EthMethod.eth_signTypedData,
        params: ['0xf00', typedData],
      });

      expect(result).toBe('0x123');
    });

    test('should sign messages with eth_sign', async () => {
      expect.assertions(4);
      const provider = createTestProvider();

      fetchMock.mockResponseOnce(async (req) => {
        const { method, params } = await req.json();
        expect(method).toEqual(EthMethod.eth_sign);
        expect(params[0]).toBe('0xf00');
        expect(params[1]).toBe('0x123');

        return JSON.stringify({ result: '0x123' });
      });

      const result = await provider.request({
        method: EthMethod.eth_sign,
        params: ['0xf00', '0x123'],
      });

      expect(result).toBe('0x123');
    });

    test('should sign messages with personal_sign', async () => {
      expect.assertions(4);
      const provider = createTestProvider();

      fetchMock.mockResponseOnce(async (req) => {
        const { method, params } = await req.json();
        expect(method).toEqual('personal_sign');
        expect(params[0]).toBe('0x123');
        expect(params[1]).toBe('0xf00');

        return JSON.stringify({ result: '0x123' });
      });

      const result = await provider.request({
        method: 'personal_sign' as any,
        params: ['0x123', '0xf00'],
      });

      expect(result).toBe('0x123');
    });
  });

  describe('Bitski transaction model creation', () => {
    test('it validates parameters for requests when creating transaction', () => {
      try {
        createBitskiTransaction(EthMethod.eth_sendTransaction, undefined as any, {
          chain: Mainnet,
        });
      } catch (error) {
        expect(error).toMatchObject({ message: 'Missing transaction' });
      }

      try {
        createBitskiTransaction(EthMethod.eth_sendTransaction, [] as any, { chain: Mainnet });
      } catch (error) {
        expect(error).toMatchObject({ message: 'Missing transaction' });
      }

      try {
        createBitskiTransaction(EthMethod.eth_sign, undefined as any, { chain: Mainnet });
      } catch (error) {
        expect(error).toMatchObject({ message: 'Missing message' });
      }

      try {
        createBitskiTransaction(EthMethod.eth_sign, [] as any, { chain: Mainnet });
      } catch (error) {
        expect(error).toMatchObject({ message: 'Missing message' });
      }

      try {
        createBitskiTransaction('personal_sign', undefined as any, { chain: Mainnet });
      } catch (error) {
        expect(error).toMatchObject({ message: 'Missing message' });
      }

      try {
        createBitskiTransaction('personal_sign', [] as any, { chain: Mainnet });
      } catch (error) {
        expect(error).toMatchObject({ message: 'Missing message' });
      }

      try {
        createBitskiTransaction(EthMethod.eth_signTypedData_v3, undefined as any, {
          chain: Mainnet,
        });
      } catch (error) {
        expect(error).toMatchObject({ message: 'Missing from' });
      }

      try {
        createBitskiTransaction(EthMethod.eth_signTypedData_v4, undefined as any, {
          chain: Mainnet,
        });
      } catch (error) {
        expect(error).toMatchObject({ message: 'Missing from' });
      }

      try {
        createBitskiTransaction(EthMethod.eth_signTypedData, [] as any, { chain: Mainnet });
      } catch (error) {
        expect(error).toMatchObject({ message: 'Missing from' });
      }

      try {
        createBitskiTransaction(EthMethod.eth_signTypedData_v1, [] as any, { chain: Mainnet });
      } catch (error) {
        expect(error).toMatchObject({ message: 'Missing from' });
      }
    });

    test('it works with basic transaction', async () => {
      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      const transaction = createBitskiTransaction(EthMethod.eth_sendTransaction, [txn], {
        chain: Mainnet,
      });

      expect(transaction).toMatchObject({
        context: {
          chainId: 1,
        },
        kind: 'ETH_SEND_TRANSACTION',
        payload: {
          from: '0x',
          gas: '0x',
          gasPrice: '0x',
          to: '0x',
          value: '0x',
        },
      });
    });

    test('it includes the transaction RPC url when using a custom network', async () => {
      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      const transaction = createBitskiTransaction(EthMethod.eth_sendTransaction, [txn], {
        chain: {
          chainId: '0x12345',
          rpcUrls: ['https://custom.rpc'],
        },
      });

      expect(transaction).toMatchObject({
        context: {
          chainId: 74565,
          rpcUrl: 'https://custom.rpc',
        },
        kind: 'ETH_SEND_TRANSACTION',
        payload: {
          from: '0x',
          gas: '0x',
          gasPrice: '0x',
          to: '0x',
          value: '0x',
        },
      });
    });

    test('it includes correct from and to for personal_sign', async () => {
      const transaction = createBitskiTransaction(
        'personal_sign',
        ['0x12312312312312312312312312312312312312', '0xf00'],
        { chain: Mainnet },
      );

      expect(transaction).toMatchObject({
        context: {
          chainId: 1,
        },
        kind: 'ETH_SIGN',
        payload: {
          from: '0xf00',
          message: '0x12312312312312312312312312312312312312',
        },
      });
    });
  });

  describe('browser signer', () => {
    function triggerMessage(event: MessageEvent, timeout = 10) {
      return new Promise((resolve) => {
        setTimeout(() => {
          fireEvent(window, event);
          resolve(undefined);
        }, timeout);
      });
    }

    test('it should create a signature via iframe', async () => {
      expect.assertions(5);
      const provider = createTestProvider({ sign: createBrowserSigner(), getAccessToken });

      fetchMock.mockResponse(async (req) => {
        expect(req.headers.get('Authorization')).toBe('Bearer test-access-token');
        expect(req.method).toBe('POST');
        expect(req.url).toBe('https://api.bitski.com/v1/transactions');

        const { transaction } = await req.json();

        expect(transaction).toMatchObject({
          context: {
            chainId: 1,
          },
          kind: 'ETH_SIGN_TRANSACTION',
          payload: {
            from: '0x',
            gas: '0x',
            gasPrice: '0x',
            to: '0x',
            value: '0x',
          },
        });

        return JSON.stringify({ transaction });
      });

      triggerMessage(
        new MessageEvent('message', {
          data: {
            id: 0,
            jsonrpc: '2.0',
            result: '0x123',
          },
          origin: 'https://sign.bitski.com',
        }),
      );

      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      const result = await provider.request({
        method: EthMethod.eth_signTransaction,
        params: [txn],
      });

      expect(result).toBe('0x123');
    });

    test('it should pass errors from signing', async () => {
      expect.assertions(4);
      const provider = createTestProvider({ sign: createBrowserSigner() });

      fetchMock.mockResponse(async (req) => {
        expect(req.method).toBe('POST');
        expect(req.url).toBe('https://api.bitski.com/v1/transactions');

        const { transaction } = await req.json();

        expect(transaction).toMatchObject({
          context: {
            chainId: 1,
          },
          kind: 'ETH_SIGN_TRANSACTION',
          payload: {
            from: '0x',
            gas: '0x',
            gasPrice: '0x',
            to: '0x',
            value: '0x',
          },
        });

        return JSON.stringify({ transaction });
      });

      triggerMessage(
        new MessageEvent('message', {
          data: {
            id: 0,
            jsonrpc: '2.0',
            error: 'Transaction denied',
          },
          origin: 'https://sign.bitski.com',
        }),
      );

      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      try {
        await provider.request({
          method: EthMethod.eth_signTransaction,
          params: [txn],
        });
      } catch (e) {
        expect(e).toMatchObject({ message: 'Transaction denied' });
      }
    });

    test('should ignore messages when there is no current request', () => {
      expect.assertions(0);
      createTestProvider({ sign: createBrowserSigner() });

      // Nothing should happen, no errors, etc
      triggerMessage(
        new MessageEvent('message', {
          data: {
            id: 0,
            jsonrpc: '2.0',
            result: '0x123',
          },
          origin: 'https://sign.bitski.com',
        }),
      );
    });

    test('should ignore messages received from another host', async () => {
      expect.assertions(4);
      const provider = createTestProvider({ sign: createBrowserSigner() });

      fetchMock.mockResponse(async (req) => {
        expect(req.method).toBe('POST');
        expect(req.url).toBe('https://api.bitski.com/v1/transactions');

        const { transaction } = await req.json();

        expect(transaction).toMatchObject({
          context: {
            chainId: 1,
          },
          kind: 'ETH_SIGN_TRANSACTION',
          payload: {
            from: '0x',
            gas: '0x',
            gasPrice: '0x',
            to: '0x',
            value: '0x',
          },
        });

        return JSON.stringify({ transaction });
      });

      triggerMessage(
        new MessageEvent('message', {
          data: {
            id: 0,
            jsonrpc: '2.0',
            result: '0x456',
          },
          origin: 'https://another.site.com',
        }),
      );

      triggerMessage(
        new MessageEvent('message', {
          data: {
            id: 0,
            jsonrpc: '2.0',
            result: '0x123',
          },
          origin: 'https://sign.bitski.com',
        }),
        100,
      );

      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      const result = await provider.request({
        method: EthMethod.eth_signTransaction,
        params: [txn],
      });

      expect(result).toBe('0x123');
    });

    test('should ignore messages received with no data', async () => {
      expect.assertions(4);
      const provider = createTestProvider({ sign: createBrowserSigner() });

      fetchMock.mockResponse(async (req) => {
        expect(req.method).toBe('POST');
        expect(req.url).toBe('https://api.bitski.com/v1/transactions');

        const { transaction } = await req.json();

        expect(transaction).toMatchObject({
          context: {
            chainId: 1,
          },
          kind: 'ETH_SIGN_TRANSACTION',
          payload: {
            from: '0x',
            gas: '0x',
            gasPrice: '0x',
            to: '0x',
            value: '0x',
          },
        });

        return JSON.stringify({ transaction });
      });

      triggerMessage(
        new MessageEvent('message', {
          data: undefined,
          origin: 'https://sign.bitski.com',
        }),
      );

      triggerMessage(
        new MessageEvent('message', {
          data: {
            id: 0,
            jsonrpc: '2.0',
            result: '0x123',
          },
          origin: 'https://sign.bitski.com',
        }),
        100,
      );

      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      const result = await provider.request({
        method: EthMethod.eth_signTransaction,
        params: [txn],
      });

      expect(result).toBe('0x123');
    });

    test('should ignore messages when from same window', async () => {
      expect.assertions(4);
      const provider = createTestProvider({ sign: createBrowserSigner() });

      fetchMock.mockResponse(async (req) => {
        expect(req.method).toBe('POST');
        expect(req.url).toBe('https://api.bitski.com/v1/transactions');

        const { transaction } = await req.json();

        expect(transaction).toMatchObject({
          context: {
            chainId: 1,
          },
          kind: 'ETH_SIGN_TRANSACTION',
          payload: {
            from: '0x',
            gas: '0x',
            gasPrice: '0x',
            to: '0x',
            value: '0x',
          },
        });

        return JSON.stringify({ transaction });
      });

      triggerMessage(
        new MessageEvent('message', {
          data: {
            id: 0,
            jsonrpc: '2.0',
            result: '0x456',
          },
          origin: 'https://sign.bitski.com',
          source: window,
        }),
      );

      triggerMessage(
        new MessageEvent('message', {
          data: {
            id: 0,
            jsonrpc: '2.0',
            result: '0x123',
          },
          origin: 'https://sign.bitski.com',
        }),
        100,
      );

      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      const result = await provider.request({
        method: EthMethod.eth_signTransaction,
        params: [txn],
      });

      expect(result).toBe('0x123');
    });

    test('sign() should close existing dialog if one is already open', async () => {
      expect.assertions(8);
      const provider = createTestProvider({ sign: createBrowserSigner() });

      fetchMock.mockResponse(async (req) => {
        expect(req.method).toBe('POST');
        expect(req.url).toBe('https://api.bitski.com/v1/transactions');

        const { transaction } = await req.json();

        expect(transaction).toMatchObject({
          context: {
            chainId: 1,
          },
          kind: 'ETH_SIGN_TRANSACTION',
          payload: {
            from: '0x',
            gas: '0x',
            gasPrice: '0x',
            to: '0x',
            value: '0x',
          },
        });

        return JSON.stringify({ transaction });
      });

      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      provider
        .request({
          method: EthMethod.eth_signTransaction,
          params: [txn],
        })
        .catch((e) =>
          expect(e).toMatchObject({
            message: 'Another signing request was made before this one was completed',
          }),
        );

      await sleep(0);

      triggerMessage(
        new MessageEvent('message', {
          data: {
            id: 0,
            jsonrpc: '2.0',
            result: '0x123',
          },
          origin: 'https://sign.bitski.com',
        }),
      );

      const result = await provider.request({
        method: EthMethod.eth_signTransaction,
        params: [txn],
      });

      expect(result).toBe('0x123');
    });

    test('it should redirect to signer if a transaction callback url is included in config', async () => {
      expect.assertions(5);
      const provider = createTestProvider({
        sign: createBrowserSigner(),
        transactionCallbackUrl: 'https://test.com/callback',
      });

      const { location } = window;

      const win = window as any;

      delete win.location;
      win.location = {
        href: 'https://test.com/original',
      };

      fetchMock.mockResponse(async (req) => {
        expect(req.method).toBe('POST');
        expect(req.url).toBe('https://api.bitski.com/v1/transactions');

        // make sure we have not redirected yet
        expect(win.location.href).toBe('https://test.com/original');

        const { transaction } = await req.json();

        expect(transaction).toMatchObject({
          context: {
            chainId: 1,
          },
          kind: 'ETH_SIGN_TRANSACTION',
          payload: {
            from: '0x',
            gas: '0x',
            gasPrice: '0x',
            to: '0x',
            value: '0x',
          },
        });

        return JSON.stringify({ transaction });
      });

      const txn = {
        from: '0x',
        to: '0x',
        value: '0x',
        gas: '0x',
        gasPrice: '0x',
      };

      provider
        .request({
          method: EthMethod.eth_signTransaction,
          params: [txn],
        })
        .then(() => {
          // this should never run
          expect(true).toBe(false);
        });

      await sleep(10);

      expect(window.location.href).toMatch(
        /https:\/\/sign\.bitski.com\/transactions\/.+\?redirectURI=https:\/\/test.com\/callback/,
      );

      window.location = location;
    });
  });
});
