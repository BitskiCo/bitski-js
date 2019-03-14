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

export class PopupRequestHandler extends AuthorizationRequestHandler {

  protected pendingRequest?: AuthorizationRequest;
  protected popupWindow: Window | null = null;
  protected id?: string;
  protected responseUrl?: Location;
  protected closedTimer?: number;
  protected error?: Error;

  constructor(utils = new BasicQueryStringUtils(), crypto = new DefaultCrypto()) {
    super(utils, crypto);
  }

  public performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest) {
    const url = this.buildRequestUrl(configuration, request);
    this.pendingRequest = request;
    this.id = request.state;
    window[`popupCallback_${request.state}`] = this.callback.bind(this);
    this.closedTimer = window.setInterval(this.checkPopup.bind(this), CHECK_FOR_POPUP_CLOSE_INTERVAL);
    this.popupWindow = window.open(url, '_blank', DEFAULT_POPUP_FEATURES);
    if (this.popupWindow) {
      this.popupWindow.focus();
    }
  }

  public callback(url: Location) {
    this.responseUrl = url;
    this.completeAuthorizationRequestIfPossible();
  }

  public completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null> {
    const request = this.pendingRequest;

    // Assert there is a pending request
    if (!request) {
      return Promise.resolve(null);
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

  protected respondWithError(
    request: AuthorizationRequest,
    errorMessage: string,
    errorDescription?: string,
    errorUri?: string): Promise<AuthorizationRequestResponse> {
    const error = new AuthorizationError({ error: errorMessage, error_description: errorDescription, error_uri: errorUri,  state: request.state });
    const response = { error, request } as AuthorizationRequestResponse;
    this.cleanup();
    return Promise.resolve(response);
  }

  protected respondWithCode(request: AuthorizationRequest, code?: string): Promise<AuthorizationRequestResponse> {
    let authorizationResponse: AuthorizationResponse | null = null;
    if (code) {
      authorizationResponse = new AuthorizationResponse({ code, state: request.state });
    }
    const response = { response: authorizationResponse, request } as AuthorizationRequestResponse;
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
      this.error = new Error('Popup window closed');
      this.completeAuthorizationRequestIfPossible();
    }
  }

}
