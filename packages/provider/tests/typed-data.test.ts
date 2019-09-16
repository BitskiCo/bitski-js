import { ProviderError, ProviderErrorCode } from '../src/errors/provider-error';
import { createTypeMapping, sanitizeDomain, sanitizeMessage, TypedDataSanitizerSubprovider } from '../src/subproviders/typed-data';

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
        TestNestedStruct: [
          { name: 'name', type: 'string' },
        ],
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
    expect.assertions(2);
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
      // @ts-ignore
      createTypeMapping(typedData);
    } catch (error) {
      expect(error).toBeInstanceOf(ProviderError);
      expect(error.code).toBe(ProviderErrorCode.InvalidRequest);
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
        TestNestedStruct: [
          { name: 'name', type: 'string' },
        ],
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
    expect.assertions(4);
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
        TestNestedStruct: [
          { name: 'name', type: 'string' },
        ],
      },
    };
    const mapping = {};

    try {
      // @ts-ignore
      sanitizeDomain(noDomainObject, mapping);
    } catch (error) {
      expect(error).toBeInstanceOf(ProviderError);
      expect(error.code).toBe(ProviderErrorCode.InvalidRequest);
    }

    // Missing type definition for EIP712Domain
    const noDomainTypeObject = {
      types: {
        TestStruct: [
          { name: 'title', type: 'string' },
          { name: 'value', type: 'string' },
        ],
      },
      domain: {
        name: 'Test Domain',
        chainId: 1,
      },
      primaryType: 'TestStruct',
      message: {
        title: 'Hello World',
        value: 'Foo',
      },
    };
    try {
      // @ts-ignore
      sanitizeDomain(noDomainTypeObject, mapping);
    } catch (error) {
      expect(error).toBeInstanceOf(ProviderError);
      expect(error.code).toBe(ProviderErrorCode.InvalidRequest);
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
          { name: 'favNumber', type: 'int16'},
          { name: 'value', type: 'TestNestedStruct' },
        ],
        TestNestedStruct: [
          { name: 'name', type: 'string' },
        ],
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
        TestNestedStruct: [
          { name: 'favNumber', type: 'uint16'},
        ],
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
        TestNestedStruct: [
          { name: 'favNumber', type: 'uint16'},
        ],
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
    expect.assertions(4);
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
      // @ts-ignore
      sanitizeMessage(noMessageData, mapping);
    } catch (error) {
      expect(error).toBeInstanceOf(ProviderError);
      expect(error.code).toBe(ProviderErrorCode.InvalidRequest);
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
      // @ts-ignore
      sanitizeMessage(noPrimaryTypeData, mapping);
    } catch (error) {
      expect(error).toBeInstanceOf(ProviderError);
      expect(error.code).toBe(ProviderErrorCode.InvalidRequest);
    }
  });
});

describe('handling JSON-RPC requests', () => {

  const provider = new TypedDataSanitizerSubprovider();

  test('it ignores requests that are not for typed data', () => {
    const payload = { jsonrpc: '2.0', id: 0, method: 'eth_blockNumber', params: [] };
    const next = jest.fn();
    const end = jest.fn();
    // @ts-ignore
    const spy = jest.spyOn(provider, 'sanitizePayload');
    provider.handleRequest(payload, next, end);
    expect(next).toBeCalled();
    expect(end).not.toBeCalled();
    expect(spy).not.toBeCalled();
  });

  test('it handles typed data requests', () => {
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
    const payload = { jsonrpc: '2.0', id: 0, method: 'eth_signTypedData', params: ['0xf00', typedData] };
    const next = jest.fn();
    const end = jest.fn();
    // @ts-ignore
    const spy = jest.spyOn(provider, 'sanitizePayload');
    provider.handleRequest(payload, next, end);
    expect(next).toBeCalled();
    expect(end).not.toBeCalled();
    expect(spy).toBeCalled();
    expect(typedData.message.value).toBe('0x2a');
  });

  test('it handles v3 suffix', () => {
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
    const payload = { jsonrpc: '2.0', id: 0, method: 'eth_signTypedData_v3', params: ['0xf00', typedData] };
    const next = jest.fn();
    const end = jest.fn();
    // @ts-ignore
    const spy = jest.spyOn(provider, 'sanitizePayload');
    provider.handleRequest(payload, next, end);
    expect(next).toBeCalled();
    expect(end).not.toBeCalled();
    expect(spy).toBeCalled();
    expect(typedData.message.value).toBe('0x2a');
  });

  test('it handles strings passed in for params', () => {
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
    const payload = { jsonrpc: '2.0', id: 0, method: 'eth_signTypedData', params: ['0xf00', JSON.stringify(typedData)] };
    const next = jest.fn();
    const end = jest.fn();
    // @ts-ignore
    const spy = jest.spyOn(provider, 'sanitizePayload');
    provider.handleRequest(payload, next, end);
    expect(next).toBeCalled();
    expect(end).not.toBeCalled();
    expect(spy).toBeCalled();
    // @ts-ignore
    expect(payload.params[1].message.value).toBe('0x2a');
  });

  test('it throws errors when params are missing', () => {
    const payload = { jsonrpc: '2.0', id: 0, method: 'eth_signTypedData_v3', params: ['0xf00'] };
    const next = jest.fn();
    const end = jest.fn();
    // @ts-ignore
    const spy = jest.spyOn(provider, 'sanitizePayload');
    provider.handleRequest(payload, next, end);
    expect(next).not.toBeCalled();
    expect(end).toBeCalled();
    const error = end.mock.calls[0][0];
    expect(error).toBeInstanceOf(ProviderError);
    expect(error.code).toBe(ProviderErrorCode.InvalidRequest);
    expect(spy).toBeCalled();
  });
});
