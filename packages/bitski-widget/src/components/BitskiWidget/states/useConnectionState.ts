import { useEffect, useState } from 'react';
import { Connector, useAccount, useDisconnect, useConnect, useConnections } from 'wagmi';
import { ConnectionStateType } from '../types';
import { ConnectionState } from '../constants';
import { mapChainIdToName } from '../../../utils';

export default function useConnectionState() {
  const { connector, address, chainId } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectAsync } = useConnect();
  const connections = useConnections();

  const [connectionState, setConnectionState] = useState<ConnectionStateType>({
    type: ConnectionState.Idle,
  });

  useEffect(() => {
    if (connections.length && connector && address && chainId) {
      const activeConnection = connections.find((c) => c.connector.name === connector?.name);

      if (activeConnection) {
        setConnectionState({
          type: ConnectionState.Connected,
          address,
          chain: mapChainIdToName(chainId),
          connector: activeConnection.connector,
        });
      } else {
        disconnect({ connector });
      }
    }
  }, [connections]);

  async function connectWallet({
    connector,
    parameters,
  }: {
    connector: Connector;
    parameters?: Record<string, unknown>;
  }) {
    await disconnectWallet({ connector });
    setConnectionState({ type: ConnectionState.Pending, pendingConnector: connector });
    try {
      const { accounts, chainId } = await connectAsync({
        connector,
        chainId: parameters?.chainId as number,
      });

      setConnectionState({
        type: ConnectionState.Connected,
        address: accounts[0],
        chain: mapChainIdToName(chainId),
        connector: connector,
      });
    } catch (e) {
      console.error(e);
      setConnectionState({ type: ConnectionState.Error, connector });
    }
  }

  async function disconnectWallet({ connector }: { connector: Connector }) {
    try {
      disconnect({ connector });
      setConnectionState({ type: ConnectionState.Idle });
    } catch (e) {
      setConnectionState({ type: ConnectionState.Error, connector });
      console.error(e);
    }
  }

  function reset() {
    connections.forEach((c) => disconnectWallet({ connector: c.connector }));
  }

  return {
    connectionState,
    connectWallet,
    disconnectWallet,
    reset,
  };
}
