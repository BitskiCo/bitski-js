import { Mainnet, Mumbai, Network, Polygon, Rinkeby } from 'bitski-provider';

import { ProviderOptions } from '../bitski';
import { SUPPORTED_CHAIN_IDS } from '../constants';

export const networkFromProviderOptions = (
  options: ProviderOptions | string | undefined,
): Network => {
  if (!options) {
    return Mainnet;
  }
  if (typeof options === 'string') {
    return networkFromName(options);
  }
  if (options.network) {
    return options.network;
  }
  if (options.networkName) {
    return networkFromName(options.networkName);
  }
  return Mainnet;
};

export const isSupportedNetworkId = (networkId: number): boolean => {
  return SUPPORTED_CHAIN_IDS.includes(networkId);
};

export const networkNameFromId = (networkId: number): string => {
  switch (networkId) {
    case 1:
      return 'mainnet';
    case 4:
      return 'rinkeby';
    case 137:
      return 'polygon';
    case 80001:
      return 'mumbai';
    default:
      throw new Error(
        `Unsupported chain id ${networkId}. Try passing a \`network\` in the options instead.`,
      );
  }
};

export const networkFromId = (networkId: number): Network => {
  switch (networkId) {
    case 1:
      return Mainnet;
    case 4:
      return Rinkeby;
    case 137:
      return Polygon;
    case 80001:
      return Mumbai;
    default:
      throw new Error(
        `Unsupported chain id ${networkId}. Try passing a \`network\` in the options instead.`,
      );
  }
};

const networkFromName = (networkName: string): Network => {
  switch (networkName) {
    case '':
    case 'mainnet':
      return Mainnet;
    case 'rinkeby':
      return Rinkeby;
    case 'polygon':
      return Polygon;
    case 'mumbai':
      return Mumbai;
    default:
      throw new Error(
        `Unsupported network name ${networkName}. Try passing a \`network\` in the options instead.`,
      );
  }
};
