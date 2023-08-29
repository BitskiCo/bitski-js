import { InternalBitskiProviderConfig, RequestContext, SignFn } from '../types';
import { fetchJsonWithRetry } from '../utils/fetch';
import { createBitskiTransaction, Transaction } from '../utils/transaction';
import { showIframe } from './iframe';
import { getSignerUrl } from './shared';

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

  const transactionApiUrl = config.waas?.transactionProxyUrl ?? `${config.apiBaseUrl}/transactions`;

  const response = (await fetchJsonWithRetry(config.fetch, 5, transactionApiUrl, {
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
  window.location.href = getSignerUrl(transaction.id, config);

  // return a non-resolving promise so we block until redirect
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return new Promise(() => {});
};

export type ShowSignerPopupFn = (
  transaction: Transaction,
  context: RequestContext<unknown>,
  submitTransaction: () => Promise<Transaction>,
) => Promise<string>;
export interface BrowserSignerConfig {
  showPopup?: ShowSignerPopupFn;
}

export default function createBrowserSigner({ showPopup }: BrowserSignerConfig = {}): SignFn {
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
      if (!showPopup) {
        throw new Error('You must provide a showPopup function when using the popup sign method');
      }

      // Show the modal (await response)
      return showPopup(transaction, requestContext, () => submitTransaction(transaction, config));
    }
  };
}
