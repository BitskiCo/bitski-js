/**
 * Represents an error that is received from the server
 * You can access the response code via the code property, and the URI from the requestURI property.
 * The retried property will indicate whether or not the request failed after multiple tries.
 */
export class ServerError extends Error {
  public name = 'ServerError';

  // The status code of the request
  public code: number;

  // Whether or not the request was retried
  public retried: boolean;

  // The request URI
  public requestURI: string;

  constructor(message: string, code: number, requestURI: string, retried: boolean = false) {
    super(message);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }
    this.code = code;
    this.requestURI = requestURI;
    this.retried = retried;
  }
}
