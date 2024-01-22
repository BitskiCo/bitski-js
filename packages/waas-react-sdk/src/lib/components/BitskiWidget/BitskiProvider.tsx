import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { WagmiProvider } from 'wagmi';

import { createBitskiConfig, validateChains, validateConnectors } from '../../utils';

import { LoginMethods } from './constants';
import { Chain } from 'viem/chains';
import { ConnectorConfig } from './types';

interface BitskiProviderProps {
  children: ReactNode;
  appId?: string;
  callbackURL?: string;
  chains: readonly [Chain, ...Chain[]];
  loginMethods: LoginMethods[];
  config?: ConnectorConfig | ConnectorConfig[];
}

function BitskiProvider({
  children,
  chains,
  appId,
  callbackURL,
  loginMethods,
  config,
}: BitskiProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  const bitskiWidgetConfig = createBitskiConfig({
    chains: validateChains(chains),
    connectors: validateConnectors({ appId, callbackURL, loginMethods, config }),
  });

  return (
    <WagmiProvider config={bitskiWidgetConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default BitskiProvider;
