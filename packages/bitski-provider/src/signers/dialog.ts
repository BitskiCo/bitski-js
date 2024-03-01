import { ethErrors } from 'eth-rpc-errors';
import { getSignerUrl } from './shared';
import { ShowSignerPopupFn } from './browser';
import { PromiseQueue } from '../utils/promise-queue';
import { OpenDialog } from '../dialogs';

// Global state, this manages the currently open signer popup.
interface SignRequestItem {
  url: string;
  openDialog: OpenDialog;
}

const SIGN_REQUEST_QUEUE = new PromiseQueue(({ url, openDialog }: SignRequestItem) => {
  return openDialog({
    url,
    handleMessage(message: { result?: string; error?: string }) {
      if (message.error) {
        throw new Error(message.error);
      } else {
        return message.result!;
      }
    },
    handleClose() {
      throw ethErrors.provider.userRejectedRequest();
    },
  });
});

export const createDialogSigner =
  (openDialog: OpenDialog, isIframe: boolean): ShowSignerPopupFn =>
  (transaction, context, submitTransaction): Promise<string> => {
    const url = getSignerUrl(transaction.id, context.config, isIframe);

    const signRequest = {
      url,
      openDialog,
    };

    // We can submit the transaction and show our authorization modal at the
    // same time, so they load in parallel
    submitTransaction().catch((error) => SIGN_REQUEST_QUEUE.cancel(signRequest, error));

    return SIGN_REQUEST_QUEUE.push(signRequest);
  };
