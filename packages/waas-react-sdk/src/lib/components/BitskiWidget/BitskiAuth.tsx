import useConnectionState from './states/useConnectionState';
import { PendingState, ConnectedState } from './types';
import IdleConnection from './states/Idle';
import PendingConnection from './states/Pending';
import Connected from './states/Connected';
import ConnectionError from './states/ConnectionError';
import { ConnectionState } from './constants';
import { useDialogContext } from '../Dialog';
import { useEffect, useState } from 'react';
import './BitskiAuth.styles.css';

interface BitskiAuthProps {
  children?: React.ReactNode;
  logoUrl?: string;
  collapsed?: boolean;
}

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const { context: floatingContext } = useDialogContext();
  const [contentAnimationState, setContentAnimationState] = useState('exited');
  useEffect(() => {
    if (floatingContext.open) {
      setContentAnimationState('entering');
      setTimeout(() => setContentAnimationState('entered'), 300);
    } else {
      setContentAnimationState('exiting');
      setTimeout(() => setContentAnimationState('exited'), 300);
    }
  }, [floatingContext.open]);

  return <div className={`Dialog-content Dialog-content-${contentAnimationState}`}>{children}</div>;
};

export function BitskiAuth({ children, logoUrl, collapsed }: BitskiAuthProps) {
  const { connectionState, connectWallet, disconnectWallet, reset } = useConnectionState();

  const { pendingConnector } = connectionState as PendingState;
  const { connector, address, chain } = connectionState as ConnectedState;

  let Component;

  switch (connectionState.type) {
    case ConnectionState.Idle:
      Component = (
        <IdleConnection connectWallet={connectWallet} collapsed={collapsed} logoUrl={logoUrl} />
      );
      break;
    case ConnectionState.Pending:
      Component = <PendingConnection connector={pendingConnector} reset={reset} />;
      break;
    case ConnectionState.Connected:
      Component = (
        <Connected
          connector={connector}
          chainName={chain}
          address={address}
          disconnect={() => disconnectWallet({ connector })}
        >
          {children}
        </Connected>
      );
      break;
    case ConnectionState.Error:
      Component = <ConnectionError reset={reset} connector={connectionState.connector} />;
      break;
    default:
      Component = (
        <IdleConnection connectWallet={connectWallet} collapsed={collapsed} logoUrl={logoUrl} />
      );
  }

  return collapsed ? <AuthWrapper>{Component}</AuthWrapper> : Component;
}
