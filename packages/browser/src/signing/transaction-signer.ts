import { Dialog } from '../components/dialog';
import { IFRAME_MESSAGE_ORIGIN_INCLUDES } from '../constants';
import { SignerError } from '../errors/signer-error';
import { Transaction } from '../subproviders/signature';
import { parseResponse } from '../utils/request-utils';

// JSON representation of a transaction
interface JSONTransactionObject {
  transaction: Transaction;
}

/**
 * This class is responsible for signing transactions. It only knows about Bitski's proprietary transaction objects.
 * It is also the only class that knows about the iframe signing implementation.
 */
export class BitskiTransactionSigner {
  // The base URL for bitski's web signer interface
  protected webBaseUrl: string;

  // The base url for bitski's transaction API
  protected apiBaseUrl: string;

  // The HTTP headers to include in each request
  protected defaultHeaders: any;

  // Current Dialog instance
  private currentRequestDialog?: Dialog;

  // App Callback URL
  private callbackURL?: string;

  // Cache of the current request's callbacks
  private currentRequest?: [(signed: any) => void, (error: Error) => void];

  constructor(webBaseUrl: string, apiBaseUrl: string, defaultHeaders: any, callbackURL: string | undefined) {
    this.webBaseUrl = webBaseUrl;
    this.apiBaseUrl = apiBaseUrl;
    this.defaultHeaders = defaultHeaders;
    this.callbackURL = callbackURL;

    // Watch for new messages on the window.
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  public async sign(transaction: Transaction, accessToken: string): Promise<string> {
    // Submit transaction to API
    const persisted = await this.submitTransaction(transaction, accessToken);

    // If we have a callback URL, use the redirect flow
    if (this.callbackURL) {
      return this.redirectToCallbackURL(persisted.transaction);
    }

    // Show the modal (await response)
    return this.showAuthorizationModal(persisted.transaction);
  }

  /**
   * Event listener for callbacks from the iframe
   * @param event MessageEvent received from the browser
   */
  protected receiveMessage(event: MessageEvent): void {
    // Ignore messages from the current window, and from frames that aren't on Bitski.com
    if (event.source === window || !event.origin.includes(IFRAME_MESSAGE_ORIGIN_INCLUDES)) {
      return;
    }

    const data = event.data;

    // Ignore message events that don't actually have data
    if (data === undefined || data === null) {
      return;
    }

    // Ignore messages when we don't have a current request in flight
    if (this.currentRequest === undefined) {
      return;
    }

    const [fulfill, reject] = this.currentRequest;

    // Dismiss current dialog
    if (this.currentRequestDialog) {
      this.currentRequestDialog.dismiss();
    }

    // Call the callback to complete the request
    if (data.error) {
      reject(data.error);
    } else {
      fulfill(data.result);
    }

    // Clear state
    this.currentRequest = undefined;
    this.currentRequestDialog = undefined;
  }

  /**
   * Responsible for submitting the Transaction object to the API
   * @param transaction The Transaction object to submit
   * @param accessToken The current user's access token
   */
  protected async submitTransaction(transaction: Transaction, accessToken: string): Promise<JSONTransactionObject> {
    const requestBody = { transaction };
    const headers = Object.assign({}, this.defaultHeaders, {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });
    const response = await fetch(`${this.apiBaseUrl}/transactions`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers,
    });
    return parseResponse<JSONTransactionObject>(response);
  }

  /**
   * Displays the authorization form in a modal window
   * @param transaction The transaction that has been submitted
   */
  protected showAuthorizationModal(transaction: Transaction): Promise<any> {
    return new Promise((fulfill, reject) => {
      const url = `${this.webBaseUrl}/transactions/${transaction.id}`;

      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.frameBorder = '0';
      iframe.src = url;

      // Dismiss any existing dialogs to prevent UI glitches.
      if (this.currentRequestDialog) {
        this.currentRequestDialog.close();
      }

      this.currentRequest = [fulfill, reject];
      this.currentRequestDialog = new Dialog(iframe, true);
      this.currentRequestDialog.onClose = () => {
        // Capture reject callback
        reject(SignerError.UserCancelled());
      };
    });
  }

  protected redirectToCallbackURL(transaction: Transaction): Promise<string> {
    const url = `${this.webBaseUrl}/transactions/${transaction.id}?redirectURI=${this.callbackURL}`;
    window.location.href = url;
    return Promise.resolve('');
  }
}
