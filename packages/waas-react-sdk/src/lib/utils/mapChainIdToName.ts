import { supportedChains } from '../components/BitskiWidget/constants';

export function mapChainIdToName(chainId: number) {
  for (let i = 0; i < supportedChains.length; i++) {
    const supportedChain = supportedChains[i];
    if (supportedChain.id === chainId) {
      return supportedChain.name;
    }
  }
  throw new Error('Unsupported chainId provided.');
}
