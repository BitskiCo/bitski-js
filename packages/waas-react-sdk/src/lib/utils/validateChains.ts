import { Chain } from 'viem/chains';

export const validateChains = (chains: readonly [Chain, ...Chain[]]) => {
  // Allow all Chains, will error downstream if we don't support it
  return chains;
};
