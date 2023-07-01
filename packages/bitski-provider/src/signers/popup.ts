import { ethErrors } from 'eth-rpc-errors';
import { IFRAME_MESSAGE_ORIGIN_ENDS_WITH } from '../constants';
import { getSignerUrl } from './shared';
import { ShowSignerPopupFn } from './browser';

// Global state, this manages the currently open signer popup.
interface SignRequestState {
  popupWindow: () => Window | null;
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

const POPUP_HEIGHT = 620;
const POPUP_WIDTH = 390;

const openPopup = (url) => {
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - POPUP_WIDTH) / 2 / systemZoom + dualScreenLeft;
  const top = (height - POPUP_HEIGHT) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    url,
    '_blank',
    `
      width=${POPUP_WIDTH / systemZoom},
      height=${POPUP_HEIGHT / systemZoom},
      top=${top},
      left=${left}
      `,
  );

  if (!newWindow) {
    throw new Error('Could not open the signer window, please enable popups.');
  }

  newWindow.focus();

  return newWindow;
};

export const showPopup: ShowSignerPopupFn = (
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

  let popupWindow: Window | null;

  if (SIGN_REQUEST_QUEUE.length > 0) {
    const lastRequest = SIGN_REQUEST_QUEUE[SIGN_REQUEST_QUEUE.length - 1];

    lastRequest.promise.then(() => {
      popupWindow = openPopup(url);
    });
  } else {
    popupWindow = openPopup(url);
  }

  SIGN_REQUEST_QUEUE.push({
    popupWindow: () => popupWindow,
    resolve,
    reject,
    promise,
  });

  return promise;
};

const handleCallback = async (callback: any): Promise<void> => {
  const currentRequest = SIGN_REQUEST_QUEUE.shift();

  if (!currentRequest) {
    return;
  }

  const { resolve, reject, popupWindow } = currentRequest;

  // Dismiss current dialog
  popupWindow()?.close();

  // Call the callback to complete the request
  if (callback.error) {
    reject(ethErrors.rpc.internal(callback.error));
  } else {
    resolve(callback.result);
  }
};
