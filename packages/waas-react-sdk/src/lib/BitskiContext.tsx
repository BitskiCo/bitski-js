import { createContext } from 'react';
import { Connector } from 'wagmi';
import { LoginMethod } from './components/BitskiWidget/constants';
import { Tab } from './components/BitskiWalletViewer';

export enum ConnectionStateKind {
  Discovering = 'discovering',
  NotConnected = 'notConnected',
  Pending = 'pending',
  SignMessage = 'signMessage',
  Connected = 'connected',
  Error = 'error',
}

export type ConnectionState =
  | {
      kind: ConnectionStateKind.Discovering;
    }
  | {
      kind: ConnectionStateKind.NotConnected;
    }
  | {
      kind: ConnectionStateKind.Pending;
      pendingConnector: Connector;
    }
  | {
      kind: ConnectionStateKind.Connected;
      connector: Connector;
      chainId: number;
      address: string;
    }
  | {
      kind: ConnectionStateKind.Error;
      connector: Connector;
    };

export enum ConnectionActionKind {
  ConnectedDetected = 'connectedDetected',
  NewConnection = 'newConnection',
  SignedNewConnection = 'signedNewConnection',
  Pending = 'pending',
  Error = 'error',
  Reset = 'reset',
  Disconnected = 'disconnected',
}

export type ConnectionAction =
  | {
      kind: ConnectionActionKind.NewConnection;
      connector: Connector;
      address: string;
      chainId: number;
    }
  | {
      kind: ConnectionActionKind.SignedNewConnection;
      connector: Connector;
      address: string;
      chainId: number;
    }
  | {
      kind: ConnectionActionKind.ConnectedDetected;
      connector: Connector;
      address: string;
      chainId: number;
    }
  | {
      kind: ConnectionActionKind.Pending;
      connector: Connector;
    }
  | {
      kind: ConnectionActionKind.Error;
      connector: Connector;
    }
  | {
      kind: ConnectionActionKind.Reset;
    }
  | {
      kind: ConnectionActionKind.Disconnected;
      connector?: Connector;
    };

export const BitskiContext = createContext<{
  appId?: string;
  loginMethods: LoginMethod[];
  tabs: Tab[];
  connectionState: ConnectionState;
  dispatchConnectionAction: (action: ConnectionAction) => void;
  logoUrl?: string;
  signMessageOnConnect?: boolean;
}>({
  appId: undefined,
  loginMethods: [],
  tabs: [],
  connectionState: { kind: ConnectionStateKind.Discovering },
  dispatchConnectionAction: (action: ConnectionAction) => {},
  logoUrl: undefined,
  signMessageOnConnect: undefined,
});

export function connectionStateReducer(
  connectionState: ConnectionState,
  action: ConnectionAction,
): ConnectionState {
  switch (action.kind) {
    case ConnectionActionKind.NewConnection:
    case ConnectionActionKind.SignedNewConnection:
      return {
        kind: ConnectionStateKind.Connected,
        address: action.address,
        chainId: action.chainId,
        connector: action.connector,
      };
    case ConnectionActionKind.ConnectedDetected:
      return {
        kind: ConnectionStateKind.Connected,
        address: action.address,
        chainId: action.chainId,
        connector: action.connector,
      };
    case ConnectionActionKind.Pending:
      return {
        kind: ConnectionStateKind.Pending,
        pendingConnector: action.connector,
      };
    case ConnectionActionKind.Error:
      return {
        kind: ConnectionStateKind.Error,
        connector: action.connector,
      };
    case ConnectionActionKind.Reset:
      return {
        kind: ConnectionStateKind.NotConnected,
      };
    case ConnectionActionKind.Disconnected:
      return {
        kind: ConnectionStateKind.NotConnected,
      };
  }
}
