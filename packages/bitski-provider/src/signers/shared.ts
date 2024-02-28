import { InternalBitskiProviderConfig } from '../types';

export const getSignerUrl = (
  transactionId: string,
  config: InternalBitskiProviderConfig,
  isIframe = false,
): string => {
  const searchParams = config.signerQueryParams ?? new URLSearchParams();

  if (config.transactionCallbackUrl) {
    searchParams.set('redirectURI', config.transactionCallbackUrl);
  }

  if (config.waas?.enabled || config.waas?.userId) {
    const appId = config.appId ?? config.clientId;
    let federatedId = btoa(`${appId}`);

    if (config.waas?.userId) {
      federatedId = btoa(`${appId}:${config.waas?.userId}`);
    }

    searchParams.set('login_hint', `fa_${federatedId}`);
  }

  if (isIframe) {
    searchParams.set('isIframe', 'true');
  }

  const searchParamsSerialized = searchParams.toString();
  const searchParamsString = searchParamsSerialized !== '' ? `?${searchParamsSerialized}` : '';

  return `${config.signerBaseUrl}/transactions/${transactionId}${searchParamsString}`;
};
