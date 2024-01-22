import {
  CoinbaseWalletParameters,
  MetaMaskParameters,
  WalletConnectParameters,
  InjectedParameters,
} from 'wagmi/connectors';
import { BitskiParameters } from '../../../connectors/bitski';

export interface ConnectorConfig {
  wallet: 'injected' | 'phantom' | 'coinbaseWallet' | 'metaMask' | 'walletConnect' | 'bitski';
  options?:
    | CoinbaseWalletParameters
    | MetaMaskParameters
    | WalletConnectParameters
    | InjectedParameters
    | BitskiParameters;
}

export type ConfigTypeMap = {
  injected: InjectedParameters;
  phantom: InjectedParameters;
  walletConnect: WalletConnectParameters;
  metaMask: MetaMaskParameters;
  coinbaseWallet: CoinbaseWalletParameters;
  bitski: BitskiParameters;
};
