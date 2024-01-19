import { Connector } from 'wagmi';
import { ConnectionState } from '../constants';

export type IdleState = { type: ConnectionState.Idle };
export type PendingState = { type: ConnectionState.Pending; pendingConnector: Connector };
export type ConnectedState = {
  type: ConnectionState.Connected;
  connector: Connector;
  address: string;
  chain: string;
};
export type ErrorState = { type: ConnectionState.Error; connector: Connector | undefined };

export type ConnectionStateType = IdleState | PendingState | ConnectedState | ErrorState;
