import { Chain } from 'viem/chains';
import { supportedChains } from '../components/BitskiWidget/constants';

export const validateChains = (chains: readonly [Chain, ...Chain[]]) => {
  chains.forEach((chain) => {
    if (
      supportedChains.map((chain) => chain.id).filter((chainId) => chainId == chain.id).length === 0
    ) {
      throw new Error(`BitskiProvider: ${chain.name} is not supported by BitskiProvider`);
    }
  });

  return chains;
};
