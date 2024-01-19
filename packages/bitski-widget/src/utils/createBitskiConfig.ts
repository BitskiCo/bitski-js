import type { Transport } from 'viem';
import { http, createConfig, CreateConnectorFn } from 'wagmi';
import { type Chain } from 'wagmi/chains';

interface BitskiWagmiConfigOptions {
  chains: readonly [Chain, ...Chain[]];
  connectors: CreateConnectorFn[];
}

export const createBitskiConfig = ({ chains, connectors }: BitskiWagmiConfigOptions) => {
  const transports: Record<number, Transport> = {};

  for (const chain of chains) {
    transports[chain.id] = http();
  }

  return createConfig({
    chains,
    connectors,
    ssr: false,
    transports,
    multiInjectedProviderDiscovery: true,
  });
};

declare module 'wagmi' {
  interface Register {
    config: typeof createBitskiConfig;
  }
}
