import { InternalBitskiProviderConfig } from '../types';

export const getSignerUrl = (
  transactionId: string,
  config: InternalBitskiProviderConfig,
): string => {
  const searchParams = config.signerQueryParams ?? new URLSearchParams();

  if (config.transactionCallbackUrl) {
    searchParams.set('redirectURI', config.transactionCallbackUrl);
  }

  if (config.waas?.enabled) {
    let federatedId = btoa(`${config.appId}`);

    if (config.waas?.userId) {
      federatedId = btoa(`${config.appId}:${config.waas?.userId}`);
    }

    searchParams.set('loginHint', `fa_${federatedId}`);
  }

  const searchParamsSerialized = searchParams.toString();
  const searchParamsString = searchParamsSerialized !== '' ? `?${searchParamsSerialized}` : '';

  return `${config.signerBaseUrl}/transactions/${transactionId}${searchParamsString}`;
};
