import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import {
  TokenActionKind,
  TokenBalance,
  tokensReducer,
  TokensState,
  TokenStateKind,
} from './hooks/useTokens';
import { useConfig } from 'wagmi';
import { GetAccountReturnType, watchAccount } from '@wagmi/core';
import {
  ActivityActionKind,
  activityReducer,
  ActivityState,
  ActivityStateKind,
  mapActivity,
} from './hooks/useActivity';
import { queryActivity, queryTotalBalanceUSD } from '../api';
import { BitskiContext, ConnectionActionKind, ConnectionStateKind } from '../BitskiContext';

export function BitskiWalletProvider({ children }: { children: ReactNode }) {
  const { dispatchConnectionAction, connectionState } = useContext(BitskiContext);
  const config = useConfig();

  const unwatch = watchAccount(config, {
    onChange(account: GetAccountReturnType, prevAccount: GetAccountReturnType): void {
      switch (account.status) {
        case 'connected':
          // This also changes on network/chain change
          syncTokens(account.address, account.chainId);
          syncActivity(account.address, account.chainId);

          if (connectionState.kind !== ConnectionStateKind.Discovering) {
            return;
          }
          dispatchConnectionAction({
            kind: ConnectionActionKind.ConnectedDetected,
            address: account.address,
            chainId: account.chainId,
            connector: account.connector,
          });
          break;
        case 'reconnecting':
          break;
        case 'connecting':
          break;
        case 'disconnected':
          if (connectionState.kind !== ConnectionStateKind.Discovering) {
            return;
          }
          dispatchConnectionAction({
            kind: ConnectionActionKind.Disconnected,
          });
          break;
      }
    },
  });

  useEffect(() => {
    return () => {
      unwatch();
    };
  }, []);

  const [tokensState, dispatchTokenAction] = useReducer(tokensReducer, {
    kind: TokenStateKind.NoAddress,
  });

  const [activityState, dispatchActivityAction] = useReducer(activityReducer, {
    kind: ActivityStateKind.NoAddress,
  });

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
        // @ts-ignore
        const balances: TokenBalance[] = connections.nodes.map((node) => {
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
    <WalletViewerContext.Provider value={{ activityState, tokensState, syncActivity, syncTokens }}>
      {children}
    </WalletViewerContext.Provider>
  );
}

export const WalletViewerContext = createContext<{
  activityState: ActivityState;
  tokensState: TokensState;
  syncActivity: (address: string, chainId: number) => void;
  syncTokens: (address: string, chainId: number) => void;
}>({
  activityState: { kind: ActivityStateKind.NoAddress },
  tokensState: { kind: TokenStateKind.NoAddress },
  syncActivity: (address: string, chainId: number) => {},
  syncTokens: (address: string, chainId: number) => {},
});
