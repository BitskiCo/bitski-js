import { ethErrors } from 'eth-rpc-errors';
import { IFRAME_MESSAGE_ORIGIN_ENDS_WITH } from '../constants';
import { InternalBitskiProviderConfig, RequestContext, SignFn } from '../types';
import { fetchJsonWithRetry } from '../utils/fetch';
import { Dialog } from '../components/dialog';
import { createBitskiTransaction, Transaction } from '../utils/transaction';

// Global state, this manages the currently open signer popup.
interface SignRequestState {
  dialog: Dialog;
  promise: Promise<string>;
  resolve: (v: string | PromiseLike<string>) => void;
  reject: (e: unknown) => void;
}

const SIGN_REQUEST_QUEUE: SignRequestState[] = [];

if (typeof window !== 'undefined') {
  window.addEventListener('message', (event: MessageEvent) => {
    // Ignore messages from the current window, and from frames that aren't on Bitski.com
    if (event.source === window || !event.origin.endsWith(IFRAME_MESSAGE_ORIGIN_ENDS_WITH)) {
      return;
    }

    const data = event.data;

    // Ignore message events that don't actually have data
    if (data === undefined || data === null) {
      return;
    }

    handleCallback(data);
  });
}

/**
 * Responsible for submitting the Transaction object to the API
 * @param transaction The Transaction object to submit
 * @param accessToken The current user's access token
 */
const submitTransaction = async (
  transaction: Transaction,
  config: InternalBitskiProviderConfig,
): Promise<Transaction> => {
  const headers = { ...config.additionalHeaders };

  if (config.getAccessToken) {
    headers['Authorization'] = `Bearer ${await config.getAccessToken()}`;
  }

  const response = (await fetchJsonWithRetry(config.fetch, 5, `${config.apiBaseUrl}/transactions`, {
    method: 'POST',
    body: { transaction },
    headers,
  })) as { transaction: Transaction };

  return response.transaction;
};

const redirectToCallbackURL = (
  transaction: Transaction,
  config: InternalBitskiProviderConfig,
): Promise<string> => {
  const url = `${config.signerBaseUrl}/transactions/${transaction.id}?redirectURI=${config.transactionCallbackUrl}`;
  window.location.href = url;

  // return a non-resolving promise so we block until redirect
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return new Promise(() => {});
};

const showIframe = (
  transaction: Transaction,
  context: RequestContext<unknown>,
): Promise<string> => {
  let resolve, reject;
  const promise = new Promise<string>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const url = `${context.config.signerBaseUrl}/transactions/${transaction.id}`;

  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.frameBorder = '0';
  iframe.src = url;

  const dialog = new Dialog(iframe, true);

  if (SIGN_REQUEST_QUEUE.length > 0) {
    const lastRequest = SIGN_REQUEST_QUEUE[SIGN_REQUEST_QUEUE.length - 1];

    lastRequest.promise.then(() => {
      dialog.open();
    });
  } else {
    dialog.open();
  }

  SIGN_REQUEST_QUEUE.push({
    resolve,
    reject,
    promise,
    dialog,
  });

  return promise;
};

const handleCallback = (callback: any): void => {
  const currentRequest = SIGN_REQUEST_QUEUE.shift();

  if (!currentRequest) {
    return;
  }

  const { resolve, reject, dialog } = currentRequest;

  // Dismiss current dialog
  dialog.close();

  // Call the callback to complete the request
  if (callback.error) {
    reject(ethErrors.rpc.internal(callback.error));
  } else {
    resolve(callback.result);
  }
};

export interface BrowserSignerConfig {
  showPopup: (transaction: Transaction, context: RequestContext<unknown>) => Promise<string>;
}

export default function createBrowserSigner(signerConfig?: BrowserSignerConfig): SignFn {
  const showPopup = signerConfig?.showPopup ?? showIframe;

  return async (method, params, requestContext): Promise<string> => {
    const { config } = requestContext;
    const transaction = await createBitskiTransaction(
      method,
      params,
      requestContext.chain,
      requestContext.config.additionalSigningContext,
    );

    // If we have a callback URL, use the redirect flow
    if (config.transactionCallbackUrl) {
      const persisted = await submitTransaction(transaction, config);
      return redirectToCallbackURL(persisted, config);
    } else {
      // We can submit the transaction and show our authorization modal at the
      // same time, so they load in parallel
      submitTransaction(transaction, config).catch((error) => handleCallback({ error }));

      // Show the modal (await response)
      return showPopup(transaction, requestContext);
    }
  };
}
