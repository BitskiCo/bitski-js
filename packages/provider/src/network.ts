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

export const Polygon: Network = {
  chainId: 137,
  rpcUrl: 'https://api.bitski.com/v1/web3/polygon',
};

export const Mumbai: Network = {
  chainId: 80001,
  rpcUrl: 'https://api.bitski.com/v1/web3/mumbai',
};
