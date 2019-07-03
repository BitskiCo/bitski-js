
export enum ParseErrorCode {
  // Could not parse response as JSON
  InvalidJSON = 2000,
  // Received an error response status,
  // but not error body was provided.
  NoErrorBody = 2001,
}

/**
 * Represents an error that is thrown during decoding
 */
export class ParseError extends Error {
  public static InvalidJSON() {
    return new ParseError('Could not decode response as JSON', ParseErrorCode.InvalidJSON);
  }

  public static UnknownError() {
    return new ParseError('An unknown error occurred.', ParseErrorCode.NoErrorBody);
  }

  public name = 'ParseError';
  public code: ParseErrorCode;

  constructor(message: string, code: ParseErrorCode) {
    super(message);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ParseError);
    }
    this.code = code;
  }
}
