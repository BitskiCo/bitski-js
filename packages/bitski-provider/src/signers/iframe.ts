import { ethErrors } from 'eth-rpc-errors';
import { IFRAME_MESSAGE_ORIGIN_ENDS_WITH } from '../constants';
import { Dialog } from '../components/dialog';
import { getSignerUrl } from './shared';
import { ShowSignerPopupFn } from './browser';

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

export const showIframe: ShowSignerPopupFn = (
  transaction,
  context,
  submitTransaction,
): Promise<string> => {
  // We can submit the transaction and show our authorization modal at the
  // same time, so they load in parallel
  submitTransaction().catch((error) => handleCallback({ error }));

  let resolve, reject;
  const promise = new Promise<string>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  const url = getSignerUrl(transaction.id, context.config);

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

const handleCallback = async (callback: any): Promise<void> => {
  const currentRequest = SIGN_REQUEST_QUEUE.shift();

  if (!currentRequest) {
    return;
  }

  const { resolve, reject, dialog } = currentRequest;

  // Dismiss current dialog
  await dialog.close();

  // Call the callback to complete the request
  if (callback.error) {
    reject(ethErrors.rpc.internal(callback.error));
  } else {
    resolve(callback.result);
  }
};
