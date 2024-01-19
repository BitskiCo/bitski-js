import { CreateConnectorFn } from 'wagmi';
import { LoginMethod, LoginMethods } from '../components/BitskiWidget/constants';
import { ConfigTypeMap } from '../components/BitskiWidget/types';
import { bitski } from '../connectors';

export function createBitskiConnector(
  configMap: ConfigTypeMap,
  loginMethod: LoginMethods,
): CreateConnectorFn {
  const emptyBitskiConfig = Object.keys(configMap.bitski).length === 0;
  if (emptyBitskiConfig) {
    throw new Error(
      'BitskiProvider: Bitski config is required when using Social login method. Please pass a valid Bitski config object.',
    );
  }

  const bitskiOptions = configMap.bitski.bitskiOptions;
  if (!configMap.bitski.appId) {
    throw new Error(
      'BitskiProvider: An appId is required in the config when using the Social login method. Please pass a valid appId.',
    );
  }

  switch (loginMethod) {
    case LoginMethod.Bitski:
      return bitski(configMap.bitski);
    case LoginMethod.Google:
      return bitski({
        ...configMap.bitski,
        bitskiOptions: {
          ...bitskiOptions,
          includeGoogle: true,
        },
      });
    case LoginMethod.Apple:
      return bitski({
        ...configMap.bitski,
        bitskiOptions: {
          ...bitskiOptions,
          includeApple: true,
        },
      });
    case LoginMethod.X:
      return bitski({
        ...configMap.bitski,
        bitskiOptions: {
          ...bitskiOptions,
          includeX: true,
        },
      });
    default:
      throw new Error('Can only create Bitski connectors');
  }
}
