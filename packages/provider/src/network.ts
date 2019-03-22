export interface Network {
  chainId: number;
  name: string;
  rpcUrl: string;
}

export const Mainnet: Network = {
  chainId: 1,
  name: 'mainnet',
  rpcUrl: 'https://api.bitski.com/v1/web3/mainnet',
};

export const Rinkeby: Network = {
  chainId: 4,
  name: 'rinkeby',
  rpcUrl: 'https://api.bitski.com/v1/web3/rinkeby',
};

export const Kovan: Network = {
  chainId: 42,
  name: 'kovan',
  rpcUrl: 'https://api.bitski.com/v1/web3/kovan',
};
