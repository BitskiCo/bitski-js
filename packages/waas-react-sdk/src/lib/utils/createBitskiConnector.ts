import { CreateConnectorFn } from 'wagmi';
import { LoginMethod, LoginMethods } from '../components/BitskiWidget/constants';
import { ConfigTypeMap } from '../components/BitskiWidget/types';
import { bitski } from '../connectors';

export function createBitskiConnector({
  configMap,
  loginMethod,
  appId,
  callbackURL,
}: {
  configMap: ConfigTypeMap;
  loginMethod: LoginMethods;
  appId?: string;
  callbackURL?: string;
}): CreateConnectorFn {
  const emptyBitskiConfig = Object.keys(configMap.bitski).length === 0;

  if (emptyBitskiConfig && !appId && !callbackURL) {
    throw new Error(
      'BitskiProvider: Bitski config is required when using Bitski or Social login method without a provided appId or callbackURL. Please pass a valid Bitski config object.',
    );
  }

  const bitskiOptions = configMap.bitski.bitskiOptions;

  if (!appId) {
    throw new Error(
      'BitskiProvider: An appId is required in the config when using the Social or Bitski login method. Please pass a valid appId.',
    );
  }

  if (!callbackURL) {
    throw new Error(
      'BitskiProvider: A callbackURL is required in the config when using the Social or Bitski login method. Please pass a valid callbackURL.',
    );
  }

  if (callbackURL || bitskiOptions?.callbackURL) {
    try {
      new URL(callbackURL ?? bitskiOptions?.callbackURL);
    } catch (_) {
      throw new Error(
        `BitskiProvider: A valid callbackURL is required in the config when using the Social or Bitski login method. Please pass a valid callbackURL. You provided: ${
          callbackURL ?? bitskiOptions?.callbackURL
        }.`,
      );
    }
  }

  switch (loginMethod) {
    case LoginMethod.Bitski:
      return bitski({
        ...configMap.bitski,
        appId,
        bitskiOptions: {
          ...bitskiOptions,
          callbackURL,
        },
      });
    case LoginMethod.Google:
      return bitski({
        ...configMap.bitski,
        appId,
        bitskiOptions: {
          ...bitskiOptions,
          callbackURL,
          includeGoogle: true,
        },
      });
    case LoginMethod.Apple:
      return bitski({
        ...configMap.bitski,
        appId,
        bitskiOptions: {
          ...bitskiOptions,
          callbackURL,
          includeApple: true,
        },
      });
    case LoginMethod.X:
      return bitski({
        ...configMap.bitski,
        appId,
        bitskiOptions: {
          ...bitskiOptions,
          callbackURL,
          includeX: true,
        },
      });
    default:
      throw new Error('Can only create Bitski connectors');
  }
}
