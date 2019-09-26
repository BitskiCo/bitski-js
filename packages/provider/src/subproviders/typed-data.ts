import { Subprovider } from '@bitski/provider-engine';
import { ProviderError } from '../errors/provider-error';
import { JSONRPCRequestPayload } from '../index';
import { encodeNumber } from '../utils/parse-utils';

interface PropertyDef {
  name: string;
  type: string;
}

type TypeDefinition = PropertyDef[];

interface TypedDataTypes {
  EIP712Domain: TypeDefinition;
  [typeName: string]: TypeDefinition;
}

interface TypedData {
  types: TypedDataTypes;
  domain: any;
  primaryType: string;
  message: any;
}

interface TypeMapping {
  [typeName: string]: {
    [propertyName: string]: string;
  };
}

export class TypedDataSanitizerSubprovider extends Subprovider {

  public handleRequest(payload: JSONRPCRequestPayload, next: () => void, end: (error, response) => void) {
    if (payload.method === 'eth_signTypedData' || payload.method === 'eth_signTypedData_v3') {
      try {
        this.sanitizePayload(payload);
      } catch (err) {
        return end(err, undefined);
      }
    }
    next();
  }

  protected sanitizePayload(payload) {
    const typedData = this.extractTypedData(payload);
    // create map of types
    const typeMapping = createTypeMapping(typedData);
    // sanitize domain
    sanitizeDomain(typedData, typeMapping);
    // sanitize message
    sanitizeMessage(typedData, typeMapping);
    // Re-assign typed data to params in case it has been parsed
    // from a string.
    payload.params[1] = typedData;
  }

  // Given a JSON-RPC request, extract the typed data from the params
  protected extractTypedData(payload: JSONRPCRequestPayload): TypedData {
    if (!payload.params || payload.params.length < 2) {
      throw ProviderError.InvalidRequest('Missing params for typed data');
    }
    // Some implementations pass typed data as a string
    if (typeof payload.params[1] === 'string') {
      return JSON.parse(payload.params[1]);
    }
    return payload.params[1];
  }

}

/**
 * Sanitizes the `domain` values from the TypedData
 *
 * @param typedData TypedData payload
 * @param typeMapping a TypeMapping pre-generated from the TypedData
 */
export function sanitizeDomain(typedData: TypedData, typeMapping: TypeMapping) {
  if (typeof typedData.domain === 'undefined') {
    throw ProviderError.InvalidRequest('Missing domain for typed data');
  }
  if (typeof typedData.types.EIP712Domain === 'undefined') {
    throw ProviderError.InvalidRequest('Missing type definition for domain');
  }
  sanitizeType('EIP712Domain', typedData.domain, typeMapping);
}

/**
 * Sanitizes the `message` values from the TypedData
 *
 * @param typedData TypedData payload
 * @param typeMapping a TypeMapping pre-generated from the TypedData
 */
export function sanitizeMessage(typedData: TypedData, typeMapping: TypeMapping) {
  if (typeof typedData.message === 'undefined') {
    throw ProviderError.InvalidRequest('Missing message in typed data');
  }
  if (typeof typedData.primaryType !== 'string') {
    throw ProviderError.InvalidRequest('Missing primary type in typed data');
  }
  sanitizeType(typedData.primaryType, typedData.message, typeMapping);
}

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
export function sanitizeType(typeName: string, values: any, typeMapping: TypeMapping) {
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
}

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
    throw ProviderError.InvalidRequest('Missing type definitions for typed data');
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
