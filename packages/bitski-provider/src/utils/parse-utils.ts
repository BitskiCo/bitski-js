import type BN from 'bn.js';
import { ethErrors } from 'eth-rpc-errors';

/**
 * parseNumber
 * Converts a value that represents a number into a hex value.
 * @param arg {string | number | BN} A number value to convert to hex.
 * Can be a regular number, base-10 string, base-16 string, or BN instance.
 * @returns {BN} BN instance representing the number
 *
 * (Adapted from ethereumjs-abi)
 */
function parseNumber(arg: string | number | BN): bigint {
  const type = typeof arg;
  if (type === 'string' || type === 'number') {
    return BigInt(arg as string | number);
  } else if ((arg as any).toArray) {
    // assume this is a BN
    return BigInt(arg.toString(10));
  } else {
    throw ethErrors.rpc.invalidInput('Argument is not a number');
  }
}

function parseBitWidth(type: string, offset: number): number {
  // default to 256 bit if not specified
  let size = 256;
  // If type string is longer than offset, parse bits from the type string
  if (type.length > offset) {
    size = parseInt(type.substr(offset), 10);
  }
  // bit width must be a multiple of 8, and in the range 8-256.
  if (size % 8 || size < 8 || size > 256) {
    throw ethErrors.rpc.invalidInput(`Invalid bit width ${type}`);
  }
  return size;
}
/**
 * encodeNumber
 * Takes a decimal string, hex string, regular number, or BN instance and returns a hex string in the specified format.
 * Typically these conversions are done in web3, but until web3 adds direct support, this is necessary for normalizing
 * numbers eth_signTypedData payloads.
 * @param num The value to convert
 * @param type The solidity ABI type to format the data as (eg. uint256, int8, etc). Only supports int and uint variants.
 * @param compact boolean (default false). Whether to use compact encoding for uints, or pad with zeroes.
 * @returns {string} A hex string formatted as the specified type.
 */
export function encodeNumber(num: string | number | BN, type: string, compact = false): string {
  if (type.startsWith('uint')) {
    const size = parseBitWidth(type, 4); // start after 'uint'
    const length = size / 4; // length in characters for the string. hex is 1 character for 4 bits.
    const parsed = parseNumber(num);
    // uint can never be negative
    if (parsed < BigInt(0)) {
      throw ethErrors.rpc.invalidInput('Supplied uint is negative');
    }
    // Convert to hex, and prepend 0x
    if (compact) {
      return '0x' + parsed.toString(16);
    }
    return '0x' + parsed.toString(16).padStart(length, '0');
  } else if (type.startsWith('int')) {
    // bit width must be a multiple of 8, and in the range 8-256.
    const size = parseBitWidth(type, 3);
    const length = size / 4; // length in characters for the string. hex is 1 character for 4 bits.
    const parsed = parseNumber(num);
    // Convert to twos complement at the bit size from the type, then convert value to hex
    return '0x' + BigInt.asUintN(size, parsed).toString(16).padStart(length, '0');
  } else {
    throw ethErrors.rpc.invalidInput('Invalid type passed');
  }
}

// A function that takes a number and returns a 0x-prefixed hex string
export const toHex = (num: number): string => `0x${num.toString(16)}`;
