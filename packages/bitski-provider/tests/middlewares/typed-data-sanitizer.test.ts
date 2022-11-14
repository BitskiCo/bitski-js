import { EthMethod } from 'eth-provider-types';
import {
  createTypeMapping,
  sanitizeDomain,
  sanitizeMessage,
} from '../../src/middleware/typed-data-sanitizer';
import { createTestProvider } from '../util/create-provider';

describe('typedDataSanitizer middleware', () => {
  describe('creating a mapping schema', () => {
    test('Can create a simple schema', () => {
      expect(6);
      const typedData = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'chainId', type: 'uint256' },
          ],
          TestStruct: [
            { name: 'title', type: 'string' },
            { name: 'value', type: 'bytes32' },
          ],
        },
        domain: {
          name: 'Test Domain',
          chainId: 1,
        },
        primaryType: 'TestStruct',
        message: {
          title: 'Hello World',
          value: '0xf00',
        },
      };
      const mapping = createTypeMapping(typedData);
      expect(mapping.EIP712Domain).toBeDefined();
      expect(mapping.EIP712Domain.name).toBe('string');
      expect(mapping.EIP712Domain.chainId).toBe('uint256');
      expect(mapping.TestStruct).toBeDefined();
      expect(mapping.TestStruct.title).toBe('string');
      expect(mapping.TestStruct.value).toBe('bytes32');
    });

    test('can create a schema with nested structs', () => {
      expect(5);
      const typedData = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'chainId', type: 'uint256' },
          ],
          TestStruct: [
            { name: 'title', type: 'string' },
            { name: 'value', type: 'TestNestedStruct' },
          ],
          TestNestedStruct: [{ name: 'name', type: 'string' }],
        },
        domain: {
          name: 'Test Domain',
          chainId: 1,
        },
        primaryType: 'TestStruct',
        message: {
          title: 'Hello World',
          value: {
            name: 'Foo',
          },
        },
      };
      const mapping = createTypeMapping(typedData);
      expect(mapping.TestStruct).toBeDefined();
      expect(mapping.TestStruct.title).toBe('string');
      expect(mapping.TestStruct.value).toBe('TestNestedStruct');
      expect(mapping.TestNestedStruct).toBeDefined();
      expect(mapping.TestNestedStruct.name).toBe('string');
    });

    test('it throws an error if missing data', () => {
      expect.assertions(1);
      const typedData = {
        domain: {
          name: 'Test Domain',
          chainId: 1,
        },
        primaryType: 'TestStruct',
        message: {
          title: 'Hello World',
          value: {
            name: 'Foo',
          },
        },
      };

      try {
        createTypeMapping(typedData as any);
      } catch (error) {
        expect((error as Error).message).toMatch(/Missing type definitions/);
      }
    });
  });

  describe('sanitizing the domain object', () => {
    test('it sanitizes numbers in domain into hex strings', () => {
      expect(2);
      const typedData = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'chainId', type: 'uint256' },
          ],
          TestStruct: [
            { name: 'title', type: 'string' },
            { name: 'value', type: 'TestNestedStruct' },
          ],
          TestNestedStruct: [{ name: 'name', type: 'string' }],
        },
        domain: {
          name: 'Test Domain',
          chainId: 1,
        },
        primaryType: 'TestStruct',
        message: {
          title: 'Hello World',
          value: {
            name: 'Foo',
          },
        },
      };
      const mapping = createTypeMapping(typedData);
      sanitizeDomain(typedData, mapping);
      expect(typedData.domain.name).toBe('Test Domain');
      expect(typedData.domain.chainId).toBe('0x1');
    });

    test('it throws errors if required data is not present', () => {
      expect.assertions(1);
      // Missing domain values
      const noDomainObject = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'chainId', type: 'uint256' },
          ],
          TestStruct: [
            { name: 'title', type: 'string' },
            { name: 'value', type: 'TestNestedStruct' },
          ],
          TestNestedStruct: [{ name: 'name', type: 'string' }],
        },
      };
      const mapping = {};

      try {
        sanitizeDomain(noDomainObject as any, mapping);
      } catch (error) {
        expect((error as Error).message).toMatch(/Missing domain/);
      }
    });
  });

  describe('sanitizing the message object', () => {
    test('it sanitizes numbers in message into hex strings', () => {
      expect(2);
      const typedData = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'chainId', type: 'uint256' },
          ],
          TestStruct: [
            { name: 'title', type: 'string' },
            { name: 'favNumber', type: 'int16' },
            { name: 'value', type: 'TestNestedStruct' },
          ],
          TestNestedStruct: [{ name: 'name', type: 'string' }],
        },
        domain: {
          name: 'Test Domain',
          chainId: 1,
        },
        primaryType: 'TestStruct',
        message: {
          title: 'Hello World',
          favNumber: 42,
          value: {
            name: 'Foo',
          },
        },
      };
      const mapping = createTypeMapping(typedData);
      sanitizeMessage(typedData, mapping);
      expect(typedData.message.favNumber).toBe('0x002a');
      expect(typedData.message.title).toBe('Hello World');
    });

    test('it sanitizes numbers in nested struct into hex strings', () => {
      expect(2);
      const typedData = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'chainId', type: 'uint256' },
          ],
          TestStruct: [
            { name: 'title', type: 'string' },
            { name: 'value', type: 'TestNestedStruct' },
          ],
          TestNestedStruct: [{ name: 'favNumber', type: 'uint16' }],
        },
        domain: {
          name: 'Test Domain',
          chainId: 1,
        },
        primaryType: 'TestStruct',
        message: {
          title: 'Hello World',
          value: {
            favNumber: 42,
          },
        },
      };
      const mapping = createTypeMapping(typedData);
      sanitizeMessage(typedData, mapping);
      expect(typedData.message.value.favNumber).toBe('0x2a');
      expect(typedData.message.title).toBe('Hello World');
    });

    test('it sanitizes numbers in arrays of custom structs', () => {
      expect(3);
      const typedData = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'chainId', type: 'uint256' },
          ],
          TestStruct: [
            { name: 'title', type: 'string' },
            { name: 'value', type: 'TestNestedStruct[]' },
          ],
          TestNestedStruct: [{ name: 'favNumber', type: 'uint16' }],
        },
        domain: {
          name: 'Test Domain',
          chainId: 1,
        },
        primaryType: 'TestStruct',
        message: {
          title: 'Hello World',
          value: [
            {
              favNumber: 42,
            },
            {
              favNumber: 128,
            },
          ],
        },
      };

      const mapping = createTypeMapping(typedData);
      sanitizeMessage(typedData, mapping);
      expect(typedData.message.value[0].favNumber).toBe('0x2a');
      expect(typedData.message.value[1].favNumber).toBe('0x80');
      expect(typedData.message.title).toBe('Hello World');
    });

    test('it sanitizes arrays of numbers', () => {
      expect(3);
      const typedData = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'chainId', type: 'uint256' },
          ],
          TestStruct: [
            { name: 'title', type: 'string' },
            { name: 'values', type: 'uint256[]' },
          ],
        },
        domain: {
          name: 'Test Domain',
          chainId: 1,
        },
        primaryType: 'TestStruct',
        message: {
          title: 'Hello World',
          values: ['1000', 200, '0x0'],
        },
      };

      const mapping = createTypeMapping(typedData);
      sanitizeMessage(typedData, mapping);
      expect(typedData.message.values[0]).toBe('0x3e8');
      expect(typedData.message.values[1]).toBe('0xc8');
      expect(typedData.message.values[2]).toBe('0x0');
      expect(typedData.message.title).toBe('Hello World');
    });

    test('it throws errors when sanitizing bad data', () => {
      expect.assertions(2);
      const mapping = {};

      // Missing `message` key
      const noMessageData = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'chainId', type: 'uint256' },
          ],
          TestStruct: [
            { name: 'title', type: 'string' },
            { name: 'value', type: 'bytes32' },
          ],
        },
        domain: {
          name: 'Test Domain',
          chainId: 1,
        },
        primaryType: 'TestStruct',
      };

      try {
        sanitizeMessage(noMessageData as any, mapping);
      } catch (error) {
        expect((error as Error).message).toMatch(/Missing message/);
      }

      // Missing `primaryType` key
      const noPrimaryTypeData = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'chainId', type: 'uint256' },
          ],
          TestStruct: [
            { name: 'title', type: 'string' },
            { name: 'value', type: 'bytes32' },
          ],
        },
        domain: {
          name: 'Test Domain',
          chainId: 1,
        },
        message: {
          title: 'Hello World',
          value: '0xf00',
        },
      };
      try {
        sanitizeMessage(noPrimaryTypeData as any, mapping);
      } catch (error) {
        expect((error as Error).message).toMatch(/Missing primary type/);
      }
    });
  });

  describe('middleware integration', () => {
    test('it handles typed data requests for all suffixes', async () => {
      const provider = createTestProvider();

      for (const method of [
        EthMethod.eth_signTypedData,
        EthMethod.eth_signTypedData_v1,
        EthMethod.eth_signTypedData_v3,
        EthMethod.eth_signTypedData_v4,
      ]) {
        fetchMock.mockResponseOnce(async (req) => {
          const { method: reqMethod, params } = await req.json();
          expect(reqMethod).toEqual(method);
          expect(params[0]).toBe('0xf00');
          expect(params[1].message.value).toBe('0x2a');

          return JSON.stringify({ result: '0x123' });
        });

        const typedData = {
          types: {
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'chainId', type: 'uint256' },
            ],
            TestStruct: [
              { name: 'title', type: 'string' },
              { name: 'value', type: 'uint16' },
            ],
          },
          domain: {
            name: 'Test Domain',
            chainId: 1,
          },
          primaryType: 'TestStruct',
          message: {
            title: 'Hello World',
            value: 42,
          },
        };

        const result = await provider.request({
          method,
          params: ['0xf00', typedData],
        });

        expect(result).toBe('0x123');
      }
    });

    test('it handles strings passed in for params', async () => {
      const provider = createTestProvider();

      for (const method of [
        EthMethod.eth_signTypedData,
        EthMethod.eth_signTypedData_v1,
        EthMethod.eth_signTypedData_v3,
        EthMethod.eth_signTypedData_v4,
      ]) {
        fetchMock.mockResponseOnce(async (req) => {
          const { method: reqMethod, params } = await req.json();
          expect(reqMethod).toEqual(method);
          expect(params[0]).toBe('0xf00');
          expect(params[1].message.value).toBe('0x2a');

          return JSON.stringify({ result: '0x123' });
        });

        const typedData = {
          types: {
            EIP712Domain: [
              { name: 'name', type: 'string' },
              { name: 'chainId', type: 'uint256' },
            ],
            TestStruct: [
              { name: 'title', type: 'string' },
              { name: 'value', type: 'uint16' },
            ],
          },
          domain: {
            name: 'Test Domain',
            chainId: 1,
          },
          primaryType: 'TestStruct',
          message: {
            title: 'Hello World',
            value: 42,
          },
        };

        const result = await provider.request({
          method,
          params: ['0xf00', JSON.stringify(typedData)],
        });

        expect(result).toBe('0x123');
      }
    });

    test('it throws errors when params are missing', async () => {
      const provider = createTestProvider();

      try {
        await provider.request({
          method: EthMethod.eth_signTypedData_v3,
          params: ['0xf00'] as any,
        });
      } catch (err) {
        expect((err as Error).message).toMatch(/Missing params/);
      }
    });
  });
});
