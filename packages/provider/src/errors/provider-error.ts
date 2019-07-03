export enum ProviderErrorCode {
  // Thrown when accessing subscription features when they are disabled.
  SubscriptionsUnavailable = 4000,
}

export class ProviderError extends Error {

  public static SubscriptionsUnavailable() {
    return new ProviderError('Subscriptions are disabled. Enable block polling to use this feature.', ProviderErrorCode.SubscriptionsUnavailable);
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
