// tslint:disable max-classes-per-file

import {
  AuthorizationError,
  AuthorizationRequest,
  AuthorizationRequestHandler,
  AuthorizationRequestResponse,
  AuthorizationResponse,
  AuthorizationServiceConfiguration,
  BasicQueryStringUtils,
  DefaultCrypto,
} from '@openid/appauth';
import { CHECK_FOR_POPUP_CLOSE_INTERVAL, DEFAULT_POPUP_FEATURES } from '../constants';
import { parseUrlParams } from '../utils/callback';
import { PopupValidator } from '../utils/popup-validator';

// Intermediate errors, since AuthorizationRequestHandler must return an AuthorizationError instance.
// These should not be user visible.

export class PopupClosedError extends AuthorizationError {
  constructor() {
    super({ error: 'The popup was dismissed.'});
  }
}

export class PopupBlockedError extends AuthorizationError {
  constructor() {
    super({ error: 'The popup was blocked.'});
  }
}

// Create a popup feature string from an object with keys and values
function createPopupFeatureString(features): string {
  // Convert to array of strings
  const featuresArray = Object.keys(features).reduce((arr, key) => {
    const value = features[key];
    // convert to feature string format: top=100
    arr.push(`${key}=${value}`);
    return arr;
  }, Array<string>());
  // Join strings with ',' and finish with ';'
  return featuresArray.join(',') + ';';
}

// Returns a set of attributes for a centered popup based on
// the default values from constants.ts
function createCenteredPopupFeatures(): any {
  const windowFeatures = DEFAULT_POPUP_FEATURES;
  const w = windowFeatures.width;
  const h = windowFeatures.height;
  // Fixes dual-screen position
  const dualScreenLeft = window.screenLeft || window.screenX;
  const dualScreenTop = window.screenTop || window.screenY;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
  const left = (windowWidth / 2) - (w / 2);
  const top = (windowHeight / 2) - (h / 2);
  windowFeatures.left = left + dualScreenLeft;
  windowFeatures.top = top + dualScreenTop;
  return windowFeatures;
}

export class PopupRequestHandler extends AuthorizationRequestHandler {

  protected pendingRequest?: AuthorizationRequest;
  protected popupWindow: Window | null = null;
  protected id?: string;
  protected responseUrl?: Location;
  protected closedTimer?: number;
  protected isCancelled: boolean = false;
  protected isBlocked: boolean = false;
  protected error?: Error;
  protected validator: PopupValidator;

  constructor(utils = new BasicQueryStringUtils(), crypto = new DefaultCrypto()) {
    super(utils, crypto);
    // Watch for the popup being blocked
    this.validator = new PopupValidator(() => {
      // Return a specific error if blocked, so that we can handle it appropriately.
      this.isBlocked = true;
      this.completeAuthorizationRequestIfPossible();
    });
  }

  public performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest) {
    const url = this.buildRequestUrl(configuration, request);
    this.pendingRequest = request;
    this.id = request.state;
    // Set a unique handler on the main window
    window[`popupCallback_${request.state}`] = this.callback.bind(this);
    // Start monitoring to see if the popup has been closed
    this.closedTimer = window.setInterval(this.checkPopup.bind(this), CHECK_FOR_POPUP_CLOSE_INTERVAL);
    // Create features for popup
    const windowFeatures = createCenteredPopupFeatures();
    // Create popup window
    this.popupWindow = window.open(url, '_blank', createPopupFeatureString(windowFeatures));
    // Check if the popup we just created was blocked.
    this.validator.check(this.popupWindow);
    // Focus the popup to bring it to the front
    if (this.popupWindow) {
      this.popupWindow.focus();
    }
  }

  public callback(url: Location) {
    this.responseUrl = url;
    this.completeAuthorizationRequestIfPossible();
  }

  // Custom implementation to remove excess log spam
  public completeAuthorizationRequestIfPossible(): Promise<void> {
    return this.completeAuthorizationRequest().then((result) => {
      if (result && this.notifier) {
        this.notifier.onAuthorizationComplete(result.request, result.response, result.error);
      }
    });
  }

  public completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null> {
    const request = this.pendingRequest;

    // Assert there is a pending request
    if (!request) {
      return Promise.resolve(null);
    }

    // Assert the request wasn't cancelled
    if (this.isCancelled === true) {
      return this.respondWithCancelled(request);
    }

    if (this.isBlocked === true) {
      return this.respondWithBlocked(request);
    }

    // Assert there is no error
    if (this.error) {
      return this.respondWithError(request, this.error.message);
    }

    // Assert there is a response url to parse
    if (!this.responseUrl) {
      return Promise.resolve(null);
    }

    // Parse the url into data
    const data = parseUrlParams(this.responseUrl);

    // Extra the state
    const state: string | undefined = data.state;

    // Validate state is same as request
    if (request.state !== state) {
      return Promise.resolve(null);
    }

    // Check for an error response
    const error: string | undefined = data.error;
    if (error) {
      // get additional optional info.
      const errorUri = data.error_uri;
      const errorDescription = data.error_description;
      return this.respondWithError(request, error, errorDescription, errorUri);
    }

    // Respond with a code
    const code: string | undefined = data.code;
    return this.respondWithCode(request, code);
  }

  protected respondWithBlocked(request: AuthorizationRequest): Promise<AuthorizationRequestResponse> {
    const error = new PopupBlockedError();
    const response = { request, error, response: null };
    this.cleanup();
    return Promise.resolve(response);
  }

  protected respondWithCancelled(request: AuthorizationRequest): Promise<AuthorizationRequestResponse> {
    const error = new PopupClosedError();
    const response = { request, error, response: null };
    this.cleanup();
    return Promise.resolve(response);
  }

  protected respondWithError(
    request: AuthorizationRequest,
    errorMessage: string,
    errorDescription?: string,
    errorUri?: string): Promise<AuthorizationRequestResponse> {
    const error = new AuthorizationError({ error: errorMessage, error_description: errorDescription, error_uri: errorUri, state: request.state });
    const response = { request, error, response: null };
    this.cleanup();
    return Promise.resolve(response);
  }

  protected respondWithCode(request: AuthorizationRequest, code?: string): Promise<AuthorizationRequestResponse> {
    let authorizationResponse: AuthorizationResponse | null = null;
    if (code) {
      authorizationResponse = new AuthorizationResponse({ code, state: request.state });
    }
    const response = { request, response: authorizationResponse, error: null };
    this.cleanup();
    return Promise.resolve(response);
  }

  protected cleanup() {
    window.clearInterval(this.closedTimer);
    delete window[`popupCallback_${this.id}`];
    if (this.popupWindow) {
      this.popupWindow.close();
    }
    this.popupWindow = null;
    this.pendingRequest = undefined;
    this.error = undefined;
    this.id = undefined;
    this.responseUrl = undefined;
  }

  protected checkPopup() {
    if (this.popupWindow && this.popupWindow.closed) {
      // Stop checking
      window.clearInterval(this.closedTimer);
      this.isCancelled = true;
      this.completeAuthorizationRequestIfPossible();
    }
  }

}
