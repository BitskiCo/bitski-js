import {
  CoinbaseWalletParameters,
  injected,
  InjectedParameters,
  MetaMaskParameters,
  walletConnect,
  WalletConnectParameters,
} from 'wagmi/connectors';
import { bitski, BitskiParameters } from '../connectors';
import { LoginMethod } from '../components/BitskiWidget/constants';

import { ConfigTypeMap, ConnectorConfig } from '../components/BitskiWidget/types';
import { CreateConnectorFn } from 'wagmi';
import { hasWindowProvider, isMobile } from './index';

export const validateConnectors = ({
  loginMethods,
  config,
  appId,
  callbackURL,
}: {
  loginMethods: LoginMethod[];
  config?: ConnectorConfig | ConnectorConfig[];
  appId: string;
  callbackURL?: string;
}) => {
  const configConnectors: CreateConnectorFn[] = [];
  if (loginMethods.includes(LoginMethod.Sms)) {
    throw new Error(
      `SMS not yet supported for App ID ${appId}.  Please turn off until a future release.`,
    );
  }

  const configMap: ConfigTypeMap = {
    injected: {} as InjectedParameters,
    phantom: {} as InjectedParameters,
    walletConnect: {} as WalletConnectParameters,
    metaMask: {} as MetaMaskParameters,
    coinbaseWallet: {} as CoinbaseWalletParameters,
    bitski: {} as BitskiParameters,
  };

  if (Array.isArray(config)) {
    config.forEach((connector) => {
      if (connector.wallet in configMap) {
        const walletType = connector.wallet as keyof ConfigTypeMap;
        switch (walletType) {
          case 'injected':
          case 'phantom':
            configMap.injected = connector.options as InjectedParameters;
            break;
          case 'walletConnect':
            configMap.walletConnect = connector.options as WalletConnectParameters;
            break;
          case 'metaMask':
            configMap.metaMask = connector.options as MetaMaskParameters;
            break;
          case 'coinbaseWallet':
            configMap.coinbaseWallet = connector.options as CoinbaseWalletParameters;
            break;
          case 'bitski':
            configMap.bitski = connector.options as BitskiParameters;
            break;
          default:
            throw new Error(`Invalid options provided for wallet type: ${walletType}`);
        }
      }
    });
  } else if (config) {
    const walletType = config.wallet as keyof ConfigTypeMap;
    switch (walletType) {
      case 'injected':
      case 'phantom':
        configMap.injected = config.options as InjectedParameters;
        break;
      case 'walletConnect':
        configMap.walletConnect = config.options as WalletConnectParameters;
        break;
      case 'metaMask':
        configMap.metaMask = config.options as MetaMaskParameters;
        break;
      case 'coinbaseWallet':
        configMap.coinbaseWallet = config.options as CoinbaseWalletParameters;
        break;
      case 'bitski':
        configMap.bitski = config.options as BitskiParameters;
        break;
      default:
        throw new Error(`Invalid options provided for wallet type: ${walletType}`);
    }
  }

  if (loginMethods.includes(LoginMethod.Wallet)) {
    /*
     * If a user is using a mobile app with a Dapp browser or a mobile browser with an extension,
     * multi-discovery does not work due to its injection timing. So instead, manually
     * push the injected provider so that it recognizes the window provider.
     */
    if (isMobile() && hasWindowProvider()) {
      configConnectors.push(injected());
    }

    configConnectors.push(
      walletConnect({
        projectId: '0b416ed746cf3516ca4f65b89e6e99f8',
      }),
    );
  }

  if (!callbackURL) {
    throw new Error(
      'BitskiProvider: A callbackURL is required in the config when using the Social or Bitski login method. Please pass a valid callbackURL.',
    );
  }

  const bitskiConnectors = loginMethods
    .filter((method) => method != LoginMethod.Wallet)
    .map((loginMethod) => {
      return bitski({ appId, callbackUrl: callbackURL, loginMethod });
    });
  configConnectors.push(...bitskiConnectors);

  return configConnectors;
};
