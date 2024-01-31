import { createContext, ReactNode, useEffect, useReducer } from 'react';
import {
  TokenActionKind,
  TokenBalance,
  tokensReducer,
  TokensState,
  TokenStateKind,
} from './useTokens';
import { Connection, useConnections } from 'wagmi';
import {
  ActivityActionKind,
  activityReducer,
  ActivityState,
  ActivityStateKind,
  mapActivity,
} from './useActivity';
import { queryActivity, queryTotalBalanceUSD } from './api';

export function BitskiWalletProvider({ children }: { children: ReactNode }) {
  console.log('hahah');
  const connections = useConnections();
  const connection = connections[0];

  const [tokensState, dispatchTokenAction] = useReducer(tokensReducer, {
    kind: TokenStateKind.NoAddress,
  });

  const [activityState, dispatchActivityAction] = useReducer(activityReducer, {
    kind: ActivityStateKind.NoAddress,
  });

  useEffect(() => {
    if (connection) {
      const nextAddress = connection.accounts[0];
      syncTokens(nextAddress, connection.chainId);
      syncActivity(nextAddress, connection.chainId);
    }
  }, [connection]);

  function syncActivity(address: string, chain: number) {
    dispatchActivityAction({
      kind: ActivityActionKind.ActivityStart,
      address: address,
      chain: chain,
    });

    queryActivity(address, chain)
      .then((result) => {
        const { data } = result;
        const activity = mapActivity(data);
        dispatchActivityAction({
          kind: ActivityActionKind.ActivitySuccess,
          address: address,
          chain: chain,
          activity,
        });
      })
      .catch((error) => {
        console.error(error);
        dispatchActivityAction({
          kind: ActivityActionKind.ActivityError,
          address: address,
          chain: chain,
        });
      });
  }

  function syncTokens(address: string, chainId: number) {
    dispatchTokenAction({
      kind: TokenActionKind.FetchStart,
      address: address,
      chainId: chainId,
    });

    queryTotalBalanceUSD(address, chainId)
      .then((result) => {
        const data = result.data;
        const { totalBalanceUSD, connections } = data.currencyBalances;
        const balances: TokenBalance[] = connections.nodes.map((node: Record<string, any>) => {
          return {
            amount: node.amountV2.formatted,
            image: node.currency.image.url,
            amountUSD: node.value.formatted,
            name: node.currency.displayName,
          };
        });
        dispatchTokenAction({
          kind: TokenActionKind.FetchSuccess,
          address: address,
          chainId: chainId,
          tokens: {
            totalBalanceUsd: totalBalanceUSD.formatted,
            balances,
          },
        });
      })
      .catch((error) => {
        console.error(error);
        dispatchTokenAction({
          kind: TokenActionKind.FetchError,
          address: address,
          chainId: chainId,
        });
      });
  }

  return (
    <WalletViewerContext.Provider
      value={{ connection, activityState, tokensState, syncActivity, syncTokens }}
    >
      {children}
    </WalletViewerContext.Provider>
  );
}

export const WalletViewerContext = createContext<{
  connection: Connection | undefined;
  activityState: ActivityState;
  tokensState: TokensState;
  syncActivity: (address: string, chainId: number) => void;
  syncTokens: (address: string, chainId: number) => void;
}>({
  connection: undefined,
  activityState: { kind: ActivityStateKind.NoAddress },
  tokensState: { kind: TokenStateKind.NoAddress },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  syncActivity: (address: string, chainId: number) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  syncTokens: (address: string, chainId: number) => {},
});
