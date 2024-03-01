import IdleConnection from './states/Idle';
import { useDialogContext } from '../Dialog';
import { useEffect, useState } from 'react';
import './BitskiAuth.styles.css';
import { ConnectionState, ConnectionStateKind } from '../../BitskiContext';
import {useBitski} from "../../useBitski";
import {ConnectionSessionCard} from "./states/ConnectionSessionCard";

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

function componentForConnectionState(connectionState: ConnectionState, reset: () => void) {
  switch (connectionState.kind) {
    case ConnectionStateKind.Discovering:
      return <IdleConnection />;
    case ConnectionStateKind.NotConnected:
      return <IdleConnection />;
    case ConnectionStateKind.Pending:
    case ConnectionStateKind.Connected:
    case ConnectionStateKind.Error:
     return <ConnectionSessionCard connectionState={connectionState} onBackClick={reset} />
  }
}

export default function BitskiAuth({ collapsed }: BitskiAuthProps) {
  const { connectionState, reset } = useBitski();
  let Component = componentForConnectionState(connectionState, reset);
  return collapsed ? <AuthWrapper>{Component}</AuthWrapper> : Component;
}
