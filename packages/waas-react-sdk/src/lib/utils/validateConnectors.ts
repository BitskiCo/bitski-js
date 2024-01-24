import {
  walletConnect,
  CoinbaseWalletParameters,
  MetaMaskParameters,
  WalletConnectParameters,
  InjectedParameters,
  injected,
} from 'wagmi/connectors';
import { BitskiParameters } from '../connectors';
import { LoginMethod } from '../components/BitskiWidget/constants';

import { ConfigTypeMap, ConnectorConfig } from '../components/BitskiWidget/types';
import { CreateConnectorFn } from 'wagmi';
import { createBitskiConnector } from './createBitskiConnector';
import { LoginMethods } from '../components/BitskiWidget/types';
import { hasWindowProvider, isMobile } from '.';

export const validateConnectors = ({
  loginMethods,
  config,
  appId,
  callbackURL,
}: {
  loginMethods: LoginMethods[];
  config?: ConnectorConfig | ConnectorConfig[];
  appId?: string;
  callbackURL?: string;
}) => {
  const configConnectors: CreateConnectorFn[] = [];

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

  const bitskiConnectors = loginMethods
    .filter((method) => method != LoginMethod.Wallet)
    .map((method) => createBitskiConnector({ configMap, loginMethod: method, appId, callbackURL }));
  configConnectors.push(...bitskiConnectors);

  return configConnectors;
};
