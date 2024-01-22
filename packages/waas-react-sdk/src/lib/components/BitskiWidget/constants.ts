import {
  arbitrum,
  base,
  baseGoerli,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonMumbai,
  sepolia,
} from 'viem/chains';

export enum LoginMethod {
  Wallet = 'wallet',
  Bitski = 'bitski',
  Google = 'google',
  Apple = 'apple',
  X = 'x',
}

export type LoginMethods = `${LoginMethod}`;
export const supportedChains = [
  mainnet,
  sepolia,
  polygon,
  polygonMumbai,
  base,
  baseGoerli,
  optimism,
  optimismSepolia,
  arbitrum,
];

export enum ExternalWallet {
  Phantom = 'phantom',
  MetaMask = 'metaMaskSDK',
  Injected = 'injected',
  CoinbaseWallet = 'coinbaseWalletSDK',
  WalletConnect = 'walletConnect',
}

export enum Social {
  Apple = 'apple',
  Google = 'google',
  X = 'x',
}

export enum ConnectionState {
  Idle = 'idle',
  Pending = 'pending',
  Connected = 'connected',
  Error = 'error',
}
