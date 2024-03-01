export enum LoginMethod {
  Wallet = 'wallet',
  Email = 'email',
  Google = 'google',
  Apple = 'apple',
  X = 'x',
  Sms = 'sms',
}

export type LoginMethods = `${LoginMethod}`;

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
