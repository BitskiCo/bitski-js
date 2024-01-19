import useConnectionState from './states/useConnectionState';
import { PendingState, ConnectedState } from './types';
import IdleConnection from './states/Idle';
import PendingConnection from './states/Pending';
import Connected from './states/Connected';
import ConnectionError from './states/ConnectionError';
import { ConnectionState } from './constants';

export function BitskiAuth() {
  const { connectionState, connectWallet, disconnectWallet, reset } = useConnectionState();
  switch (connectionState.type) {
    case ConnectionState.Idle:
      return <IdleConnection connectWallet={connectWallet} />;
    // @ts-ignore
    case ConnectionState.Pending:
      const { pendingConnector } = connectionState as PendingState;
      return <PendingConnection connector={pendingConnector} reset={reset} />;
    case ConnectionState.Connected:
      const { connector, address, chain } = connectionState as ConnectedState;
      return (
        <Connected
          connector={connector}
          chainName={chain}
          address={address}
          disconnect={() => disconnectWallet({ connector })}
        />
      );
    // @ts-ignore
    case ConnectionStateType.Error:
      // @ts-ignore
      return <ConnectionError reset={reset} connector={connectionState.connector} />;
    default:
      return <IdleConnection connectWallet={connectWallet} />;
  }
}
