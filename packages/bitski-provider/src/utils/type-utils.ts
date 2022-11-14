import { ethErrors } from 'eth-rpc-errors';

export function expect<T>(value: T | undefined | null, message: string): T {
  if (value === undefined || value === null) {
    throw ethErrors.rpc.invalidInput(message);
  }

  return value;
}

export function assert(predicate: boolean, message: string): asserts predicate {
  if (!predicate) {
    throw ethErrors.rpc.invalidInput(message);
  }
}

export const isError = (value: unknown): value is Error => value instanceof Error;
