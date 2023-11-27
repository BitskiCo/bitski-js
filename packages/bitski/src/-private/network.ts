export interface Network {
  rpcUrl: string;
  chainId: number;
}

export const Mainnet: Network = {
  chainId: 1,
  rpcUrl: 'https://api.bitski.com/v1/web3/mainnet',
};

export const Goerli: Network = {
  chainId: 5,
  rpcUrl: 'https://api.bitski.com/v1/web3/goerli',
};

export const Sepolia: Network = {
  chainId: 5,
  rpcUrl: 'https://api.bitski.com/v1/web3/sepolia',
};

export const Base: Network = {
  chainId: 8453,
  rpcUrl: 'https://api.bitski.com/v1/web3/base',
};

export const BaseGoerli: Network = {
  chainId: 84531,
  rpcUrl: 'https://api.bitski.com/v1/web3/basegor',
};

export const Polygon: Network = {
  chainId: 137,
  rpcUrl: 'https://api.bitski.com/v1/web3/polygon',
};

export const Mumbai: Network = {
  chainId: 80001,
  rpcUrl: 'https://api.bitski.com/v1/web3/mumbai',
};

export const BinanceSmartChain: Network = {
  chainId: 56,
  rpcUrl: 'https://api.bitski.com/v1/web3/bsc',
};

export const BinanceSmartChainTestnet: Network = {
  chainId: 97,
  rpcUrl: 'https://api.bitski.com/v1/web3/bnbt',
};
