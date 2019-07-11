
export enum AuthenticationErrorCode {
  // The user is not currently signed in
  NotSignedIn = 1000,
  // The user cancelled the auth request
  UserCancelled = 1001,
  // Either you did not request offline access, or the user did not approve your app for offline access
  NoRefreshToken = 1002,
  // You requested silent sign in, which is deprecated
  UnsupportedAuthenticationMethod = 1003,
  // We received an error from the oauth server
  ServerError = 1004,
  // The SDK is configured incorrectly
  InvalidConfiguration = 1005,
  // Popup blocked
  PopupBlocked = 1006,
}

/**
 * Represents an error that is thrown during the authentication process
 */
export class AuthenticationError extends Error {

  // throw AuthenticationError.NotSignedIn()
  public static NotSignedIn() {
    return new AuthenticationError('Not signed in.', AuthenticationErrorCode.NotSignedIn);
  }

  // throw AuthenticationError.UserCancelled()
  public static UserCancelled() {
    return new AuthenticationError('Sign in request was cancelled.', AuthenticationErrorCode.UserCancelled);
  }

  // throw AuthenticationError.NoRefreshToken()
  public static NoRefreshToken() {
    return new AuthenticationError('Refresh token is not available.', AuthenticationErrorCode.NoRefreshToken);
  }

  // throw AuthenticationError.UnsupportedAuthenticationMethod()
  public static UnsupportedAuthenticationMethod() {
    return new AuthenticationError('Sign in method not supported.', AuthenticationErrorCode.UnsupportedAuthenticationMethod);
  }

  // throw AuthenticationError.PopupBlocked()
  public static PopupBlocked(baseUrl: string) {
    const msg = `The popup was blocked. Please make sure ${baseUrl} is allowed to open popups.`;
    return new AuthenticationError(msg, AuthenticationErrorCode.PopupBlocked);
  }

  // throw Authentication Error.ServerError(message, description)
  public static ServerError(message: string, description?: string) {
    const err = new AuthenticationError(`Error from the server: ${message}`, AuthenticationErrorCode.ServerError);
    err.description = description;
    return err;
  }

  // throw AuthenticationError.InvalidConfiguration()
  public static InvalidConfiguration(reason: string) {
    return new AuthenticationError(`The OAuth Configuration is invalid: ${reason}`, AuthenticationErrorCode.InvalidConfiguration);
  }

  public name = 'AuthenticationError';
  public code: AuthenticationErrorCode;
  public description?: string;

  constructor(message: string, code: AuthenticationErrorCode) {
    super(message);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AuthenticationError);
    }
    this.code = code;
  }
}
