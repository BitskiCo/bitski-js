import useConnectionState from './states/useConnectionState';
import { PendingState, ConnectedState } from './types';
import IdleConnection from './states/Idle';
import PendingConnection from './states/Pending';
import Connected from './states/Connected';
import ConnectionError from './states/ConnectionError';
import { ConnectionState } from './constants';

interface BitskiAuthProps {
  children?: React.ReactNode;
  logoUrl?: string;
  onBack?: () => void;
}

export function BitskiAuth({ children, logoUrl, onBack }: BitskiAuthProps) {
  const { connectionState, connectWallet, disconnectWallet, reset } = useConnectionState();

  const { pendingConnector } = connectionState as PendingState;
  const { connector, address, chain } = connectionState as ConnectedState;

  switch (connectionState.type) {
    case ConnectionState.Idle:
      return <IdleConnection connectWallet={connectWallet} onBack={onBack} logoUrl={logoUrl} />;
    case ConnectionState.Pending:
      return <PendingConnection connector={pendingConnector} reset={reset} />;
    case ConnectionState.Connected:
      return (
        <Connected
          connector={connector}
          chainName={chain}
          address={address}
          disconnect={() => disconnectWallet({ connector })}
        >
          {children}
        </Connected>
      );
    case ConnectionState.Error:
      return <ConnectionError reset={reset} connector={connectionState.connector} />;
    default:
      return <IdleConnection connectWallet={connectWallet} onBack={onBack} logoUrl={logoUrl} />;
  }
}
