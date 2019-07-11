export enum ProviderErrorCode {
  // Thrown when accessing subscription features when they are disabled.
  SubscriptionsUnavailable = 4000,
  // Thrown when request is missing required params or data
  InvalidRequest = 4001,
}

export class ProviderError extends Error {

  public static SubscriptionsUnavailable() {
    return new ProviderError('Subscriptions are disabled. Enable block polling to use this feature.', ProviderErrorCode.SubscriptionsUnavailable);
  }

  public static InvalidRequest(reason: string) {
    return new ProviderError(`Invalid request: ${reason}`, ProviderErrorCode.InvalidRequest);
  }

  public name: string = 'ProviderError';
  public code: ProviderErrorCode;

  constructor(message: string, code: ProviderErrorCode) {
    super(message);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ProviderError);
    }
    this.code = code;
  }

}
