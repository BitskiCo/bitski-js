import useConnectionState from './states/useConnectionState';
import { PendingState, ConnectedState } from './types';
import IdleConnection from './states/Idle';
import PendingConnection from './states/Pending';
import Connected from './states/Connected';
import ConnectionError from './states/ConnectionError';
import { ConnectionState } from './constants';

export function BitskiAuth(props: { logoUrl?: string }) {
  const { connectionState, connectWallet, disconnectWallet, reset } = useConnectionState();

  const { pendingConnector } = connectionState as PendingState;
  const { connector, address, chain } = connectionState as ConnectedState;

  switch (connectionState.type) {
    case ConnectionState.Idle:
      return <IdleConnection connectWallet={connectWallet} logoUrl={props.logoUrl} />;
    case ConnectionState.Pending:
      return <PendingConnection connector={pendingConnector} reset={reset} />;
    case ConnectionState.Connected:
      return (
        <Connected
          connector={connector}
          chainName={chain}
          address={address}
          disconnect={() => disconnectWallet({ connector })}
        />
      );
    case ConnectionState.Error:
      return <ConnectionError reset={reset} connector={connectionState.connector} />;
    default:
      return <IdleConnection connectWallet={connectWallet} />;
  }
}
