export interface Network {
  rpcUrl: string;
  chainId: number;
}

export const Mainnet: Network = {
  chainId: 1,
  rpcUrl: 'https://api.bitski.com/v1/web3/mainnet',
};

export const Rinkeby: Network = {
  chainId: 4,
  rpcUrl: 'https://api.bitski.com/v1/web3/rinkeby',
};

export const Kovan: Network = {
  chainId: 42,
  rpcUrl: 'https://api.bitski.com/v1/web3/kovan',
};
