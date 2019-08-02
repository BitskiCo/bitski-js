// JSON-RPC methods that require Authorization header
export const AUTHENTICATED_METHODS = [
  'eth_accounts',
  'eth_sendTransaction',
  'eth_signTransaction',
  'eth_signTypedData',
  'personal_sign',
  'eth_sign',
];

// Error messages that are usually transient and should be retried
export const RETRIABLE_ERRORS = [
  // ignore server overload errors
  'Gateway timeout',
  'ETIMEDOUT',
  'ENOTFOUND', // DNS error
  // ignore server sent html error pages
  // or truncated json responses
  'SyntaxError',
  'ECONNRESET',
  'EHOSTUNREACH',
  'Timeout out while waiting for response', // Actix timeout
];

// Errors that indicate the access token is not valid
export const UNAUTHORIZED_ERRORS = [
  'Missing auth', // No token sent
  'Invalid client id', // Wrong client id, or invalid access token
  'Not Authorized',
];
