import { AccessTokenProvider, JSONRPCRequestPayload } from 'bitski-provider';
import JsonRpcError from 'json-rpc-error';
import uuid from 'uuid';
import { Dialog } from '../components/dialog';
import { IFRAME_MESSAGE_ORIGIN_INCLUDES } from '../constants';
import { parseResponse } from '../utils/request-utils';
import { AuthorizationHandler } from './authorization-handler';

type Request = [JSONRPCRequestPayload, JSONRPCResponseHandler];
type JSONRPCResponseHandler = (error?: JsonRpcError, result?: any) => void;

interface TransactionRequest {
  transaction: Transaction;
}

export enum TransactionKind {
  SendTransaction = 'ETH_SEND_TRANSACTION',
  SignTransaction = 'ETH_SIGN_TRANSACTION',
  Sign = 'ETH_SIGN',
}

export interface Transaction {
  id: string;
  kind: TransactionKind;
  payload: TransactionPayload | SignaturePayload;
  context: TransactionContext;
}

export interface TransactionContext {
  chainId: number;
}

export interface SignaturePayload {
  from: string;
  message: string;
}

export interface TransactionPayload {
  from: string;
  to?: string;
  value?: string;
  data?: string;
  nonce?: string;
  gas?: string;
  gasPrice?: string;
}

/*
 * An AuthorizationHandler Subprovider that uses an iframe to get authorization from the user.
 */
export class IFrameSubprovider extends AuthorizationHandler {
  protected webBaseUrl: string;
  protected apiBaseUrl: string;
  protected chainId: number;
  protected tokenProvider: AccessTokenProvider;
  protected defaultHeaders: any;

  private currentRequestDialog?: Dialog;
  private currentRequest?: Request;

  constructor(webBaseUrl: string, apiBaseUrl: string, chainId: number, tokenProvider: AccessTokenProvider, defaultHeaders: any = {}) {
    super();
    this.webBaseUrl = webBaseUrl;
    this.chainId = chainId;
    this.tokenProvider = tokenProvider;
    this.apiBaseUrl = apiBaseUrl;
    this.defaultHeaders = defaultHeaders;
    window.addEventListener('message', this.receiveMessage.bind(this), false);
  }

  /**
   * Called when a payload is received that needs authorization
   * @param payload The JSON-RPC request
   * @param callback The callback to call when the request has been handled
   */
  public handleAuthorization(payload: JSONRPCRequestPayload, callback: JSONRPCResponseHandler): void {
    this.tokenProvider.getAccessToken().then((accessToken) => {
      const transaction = this.createBitskiTransaction(payload);
      return this.submitTransaction(transaction, accessToken).then((persistedTransaction) => {
        this.showAuthorizationModal(persistedTransaction.transaction, [payload, callback]);
      });
    }).catch((error) => {
      callback(error, undefined);
    });
  }

  /**
   * Event listener for callbacks from the iframe
   * @param event MessageEvent received from the browser
   */
  public receiveMessage(event: MessageEvent): void {
    if (!event.origin.includes(IFRAME_MESSAGE_ORIGIN_INCLUDES)) {
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

    const [_, callback] = this.currentRequest;

    // Dismiss current dialog
    if (this.currentRequestDialog) {
      this.currentRequestDialog.dismiss();
    }

    // Call the callback to complete the request
    callback(data.error, data.result);

    // Clear state
    this.currentRequest = undefined;
    this.currentRequestDialog = undefined;
  }

  /**
   * Responsible for creating the Transaction object from a given RPC payload
   * @param payload JSON-RPC payload to extract the values from
   */
  protected createBitskiTransaction(payload: JSONRPCRequestPayload): Transaction {
    const context = { chainId: this.chainId } as TransactionContext;
    const kind = this.kindForMethod(payload.method);
    const transactionPayload = this.createPayload(payload);
    const transaction = {
      id: uuid(),
      kind,
      payload: transactionPayload,
      context,
    };
    return transaction as Transaction;
  }

  /**
   * Responsible for submitting the Transaction object to the API
   * @param transaction The Transaction object to submit
   * @param accessToken The current user's access token
   */
  protected submitTransaction(transaction: Transaction, accessToken: string): Promise<TransactionRequest> {
    const requestBody = { transaction };
    const headers = Object.assign({}, this.defaultHeaders, {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    });
    return fetch(`${this.apiBaseUrl}/transactions`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers,
    }).then((response) => {
      return parseResponse<TransactionRequest>(response);
    });
  }

  /**
   * Displays the authorization form in a modal window
   * @param transaction The transaction that has been submitted
   * @param request The request and callback pair associated with this transaction
   */
  protected showAuthorizationModal(transaction: Transaction, request: Request) {
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

    this.currentRequest = request;
    this.currentRequestDialog = new Dialog(iframe, true);
    this.currentRequestDialog.onClose = () => {
      const [_, callback] = request;
      callback(new Error('The transaction was cancelled'), undefined);
    };
  }

  /**
   * Responsible for creating the payload from a given RPC request
   * @param request JSON-RPC request to extract params from
   */
  private createPayload(request: JSONRPCRequestPayload): TransactionPayload | SignaturePayload {
    switch (request.method) {
      case 'eth_sendTransaction':
      case 'eth_signTransaction':
        if (request.params && request.params.length > 0) {
          return request.params[0] as TransactionPayload;
        } else {
          throw new Error('Invalid request: Could not find transaction values.');
        }
      case 'eth_sign':
        if (request.params && request.params.length > 1) {
          return { from: request.params[0], message: request.params[1] };
        } else {
          throw new Error('Invalid request: Could not find params for signature.');
        }
      case 'personal_sign':
        if (request.params && request.params.length > 1) {
          return { from: request.params[1], message: request.params[0] };
        } else {
          throw new Error('Invalid request: Could not find params for signature.');
        }
      default:
        throw new Error('Method not supported');
    }
  }

  /**
   * Determines a BitskiTransaction.Kind value from a given RPC method name
   * @param method The JSON-RPC method being requested
   */
  private kindForMethod(method: string): TransactionKind {
    switch (method) {
      case 'eth_sendTransaction':
        return TransactionKind.SendTransaction;
      case 'eth_signTransaction':
        return TransactionKind.SignTransaction;
      case 'eth_sign':
      case 'personal_sign':
        return TransactionKind.Sign;
      default:
        throw new Error('Method not supported');
    }
  }
}
