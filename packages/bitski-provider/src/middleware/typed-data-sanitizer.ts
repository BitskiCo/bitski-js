import { EthMethod, TypedData } from 'eth-provider-types';
import { ethErrors } from 'eth-rpc-errors';
import { JsonRpcMiddleware, JsonRpcRequest } from 'json-rpc-engine';

import { encodeNumber } from '../utils/parse-utils';

interface TypeMapping {
  [typeName: string]: {
    [propertyName: string]: string;
  };
}

export const createTypedDataSanitizerMiddleware = (): JsonRpcMiddleware<
  [string, string],
  unknown
> => {
  return (req, _res, next, end) => {
    if (
      req.method === EthMethod.eth_signTypedData ||
      req.method === EthMethod.eth_signTypedData_v1 ||
      req.method === EthMethod.eth_signTypedData_v3 ||
      req.method === EthMethod.eth_signTypedData_v4
    ) {
      try {
        sanitizeRequest(req);
      } catch (err) {
        return end(err as Error);
      }
    }
    next();
  };
};

const sanitizeRequest = (payload: JsonRpcRequest<[string, string | TypedData]>) => {
  const { params } = payload;

  if (!params || params.length < 2) {
    throw ethErrors.provider.userRejectedRequest(
      `Missing params for ${payload.method}. The first parameter should be the address of the account to sign with, and the second parameter should be the data to sign.`,
    );
  }

  const typedData = extractTypedData(params);
  // create map of types
  const typeMapping = createTypeMapping(typedData);
  // sanitize domain if available
  if (typedData.domain || typedData.types.EIP712Domain) {
    sanitizeDomain(typedData, typeMapping);
  }
  // sanitize message
  sanitizeMessage(typedData, typeMapping);
  // Re-assign typed data to params in case it has been parsed
  // from a string.
  params[1] = typedData;
};

const extractTypedData = (params: [string, string | TypedData]): TypedData => {
  // Some implementations pass typed data as a string
  if (typeof params[1] === 'string') {
    return JSON.parse(params[1]);
  }

  return params[1];
};

/**
 * Sanitizes the `domain` values from the TypedData
 *
 * @param typedData TypedData payload
 * @param typeMapping a TypeMapping pre-generated from the TypedData
 */
export const sanitizeDomain = (typedData: TypedData, typeMapping: TypeMapping): void => {
  if (typeof typedData.domain === 'undefined') {
    throw ethErrors.provider.userRejectedRequest('Missing domain for typed data');
  }
  sanitizeType('EIP712Domain', typedData.domain, typeMapping);
};

/**
 * Sanitizes the `message` values from the TypedData
 *
 * @param typedData TypedData payload
 * @param typeMapping a TypeMapping pre-generated from the TypedData
 */
export const sanitizeMessage = (typedData: TypedData, typeMapping: TypeMapping): void => {
  if (typeof typedData.message === 'undefined') {
    throw ethErrors.provider.userRejectedRequest('Missing message in typed data');
  }
  if (typeof typedData.primaryType !== 'string') {
    throw ethErrors.provider.userRejectedRequest('Missing primary type in typed data');
  }
  sanitizeType(typedData.primaryType, typedData.message, typeMapping);
};

/**
 * Recursively examines each value and determines type from the type mapping to
 * format and sanitize the value if needed.
 *
 * Currently this will only convert number values into a consistent hex format,
 * but in the future additional transformations may be necessary.
 *
 * @param typeName Name of the type we are starting from
 * @param values The root object containing the keys and values
 * @param typeMapping The type mapping that represents this data
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const sanitizeType = (typeName: string, values: any, typeMapping: TypeMapping): void => {
  // For each key in the 'values' object...
  Object.keys(values).forEach((key) => {
    // Find the type name associated from the mapping
    const type = typeMapping[typeName][key];
    if (type === undefined) {
      // Do nothing if we don't have a type for this key
    } else if (isArray(type)) {
      // find the base type (left side of the brackets)
      const baseType = type.split('[')[0];
      if (typeof values[key].length === 'undefined') {
        throw new TypeError(`Could not parse ${values[key]} for type ${type}. Expected array.`);
      }
      // If base type is a struct, iterate through each instance of struct
      if (typeMapping[baseType]) {
        // values[key] is expected to be an array, where each element
        // is an object that represents the struct named baseType.
        values[key].forEach((itemValues) => {
          sanitizeType(baseType, itemValues, typeMapping);
        });
      } else if (baseType.startsWith('uint') || baseType.startsWith('int')) {
        // If we have an array of primitive types that are numbers, we need to encode the numbers as hex
        const numberValues = values[key].map((numberValue) => {
          return encodeNumber(numberValue, baseType, true);
        });
        values[key] = numberValues;
      } else {
        // Do nothing with regular array values
        // int8[], etc should already be strings
      }
    } else if (typeMapping[type]) {
      // If type name is a custom struct, it should live in the type mapping
      // We need to recursively check the custom types until we get to primitive values
      sanitizeType(type, values[key], typeMapping);
    } else if (type.startsWith('uint') || type.startsWith('int')) {
      // Finally, if we have a primitive type that is a number, we need to encode the numbers as hex
      values[key] = encodeNumber(values[key], type, true);
    }
  });
};

/**
 * Returns true if type name indicates that an array
 * @param typeName solidity type name
 */
function isArray(typeName: string): boolean {
  if (typeName.includes('[') && typeName.includes(']')) {
    return true;
  }
  return false;
}

/**
 * Maps the type definitions from the typed data for easy look-up.
 * Top level keys represent the structs defined, while top-level values
 * are an object keyed by property with string values of the type name.
 *
 * For example:
 * {
 *    EIP712Domain: {
 *      name: 'string',
 *      version: 'string',
 *      chainId: 'uint256'
 *    }
 * }
 * @param typedData The TypedData to map
 * @returns {TypeMapping} the mapped data schema
 */
export function createTypeMapping(typedData: TypedData): TypeMapping {
  if (typeof typedData.types === 'undefined') {
    throw ethErrors.provider.userRejectedRequest('Missing type definitions for typed data');
  }

  // Go through each of the top level keys. These represent the custom types.
  return Object.keys(typedData.types).reduce((acc, current) => {
    // Reduce into a new single object
    // Set a key for each type, reduce array of property names and types to an object
    acc[current] = typedData.types[current].reduce((acc2, typeDef) => {
      // For each type, set the key as the property name, and the value as the type name
      acc2[typeDef.name] = typeDef.type;
      return acc2;
    }, {});
    return acc;
  }, {});
}
