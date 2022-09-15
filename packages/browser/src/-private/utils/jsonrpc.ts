import { JSONRPCResponse } from '@bitski/provider-engine';

// gotta keep it within MAX_SAFE_INTEGER
const extraDigits = 3;
function createRandomId() {
  // 13 time digits
  const datePart = new Date().getTime() * Math.pow(10, extraDigits);
  // 3 random digits
  const extraPart = Math.floor(Math.random() * Math.pow(10, extraDigits));
  // 16 digits
  return datePart + extraPart;
}

export function createResponse(error: unknown, result?: unknown): JSONRPCResponse {
  return {
    id: createRandomId(),
    jsonrpc: '2.0',
    error,
    result,
  };
}
