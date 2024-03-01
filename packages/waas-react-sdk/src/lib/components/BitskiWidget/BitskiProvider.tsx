import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactNode, useReducer, useState} from 'react';
import {WagmiProvider} from 'wagmi';

import {createBitskiConfig, validateChains, validateConnectors} from '../../utils';

import {LoginMethod} from './constants';
import {Chain} from 'viem/chains';
import {ConnectorConfig} from './types';
import {BitskiContext, ConnectionStateKind, connectionStateReducer} from '../../BitskiContext';
import {Tab} from '../BitskiWalletViewer';
import {BitskiWalletProvider} from '../BitskiWalletProvider';

interface BitskiProviderProps {
  children: ReactNode;
  appId: string;
  callbackURL?: string;
  chains: readonly [Chain, ...Chain[]];
  loginMethods: LoginMethod[];
  tabs?: Tab[]
  config?: ConnectorConfig | ConnectorConfig[];
  logoUrl?: string;
  signMessageOnConnect?: boolean;
}

function BitskiProvider({
  children,
  chains,
  appId,
  callbackURL,
  loginMethods,
  config,
  logoUrl,
  signMessageOnConnect,
    tabs
}: BitskiProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [connectionState, dispatchConnectionAction] = useReducer(connectionStateReducer, {
    kind: ConnectionStateKind.Discovering,
  });

  const wagmiConfig = createBitskiConfig({
    chains: validateChains(chains),
    connectors: validateConnectors({ appId, callbackURL, loginMethods, config }),
  });

  const resolvedTabs = tabs ? tabs : [Tab.Tokens]

  return (
    <BitskiContext.Provider
      value={{
        appId,
        loginMethods,
        tabs: resolvedTabs,
        connectionState,
        dispatchConnectionAction,
        logoUrl,
        signMessageOnConnect,
      }}
    >
      <WagmiProvider config={wagmiConfig} reconnectOnMount={true}>
        <QueryClientProvider client={queryClient}>
          <BitskiWalletProvider>{children}</BitskiWalletProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BitskiContext.Provider>
  );
}

export default BitskiProvider;
