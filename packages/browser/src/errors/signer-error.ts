
export enum SignerErrorCode {
  // The signer module received a request to sign via an unsupported RPC method
  UnsupportedMethod = 3000,
  // The user cancelled or rejected the transaction
  UserCancelled = 3001,
  // The request is missing params for the transaction.
  // Check that params is an array, and the transaction is the first object.
  MissingTransaction = 3002,
  // The message signature request is missing expected params.
  // Check that params is an array, and that they include both a from address, and a message to sign.
  MissingMessage = 3003,
  // Missing from address in typed data request
  MissingFrom = 3004,
  // Missing typed data params. Make sure params is an array and includes
  // both a from address, and a typed data payload.
  MissingTypedData = 3005,
}

export class SignerError extends Error {

  public static UnsupportedMethod() {
    return new SignerError('The method requested is not currently supported.', SignerErrorCode.UnsupportedMethod);
  }

  public static UserCancelled() {
    return new SignerError('The user cancelled this transaction', SignerErrorCode.UserCancelled);
  }

  public static MissingTransaction() {
    return new SignerError('Could not find transaction in request', SignerErrorCode.MissingTransaction);
  }

  public static MissingMessage() {
    return new SignerError('Could not find message params in request', SignerErrorCode.MissingMessage);
  }

  public static MissingFrom() {
    return new SignerError('Could not find from address in request params.', SignerErrorCode.MissingFrom);
  }

  public static MissingTypedData() {
    return new SignerError('Could not find data to sign in request params.', SignerErrorCode.MissingTypedData);
  }

  public name: string = 'TransactionError';
  public code: SignerErrorCode;

  constructor(message: string, code: SignerErrorCode) {
    super(message);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SignerError);
    }
    this.code = code;
  }
}
