import { Connector, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { useContext } from 'react';
import { CONNECTOR_TYPE_BITSKI } from '../../connectors/bitski';
import { UserRejectedRequestError } from 'viem';
import { BitskiContext, ConnectionActionKind } from '../../BitskiContext';

export function useBitski() {
  const { connectionState, dispatchConnectionAction, signMessageOnConnect } =
    useContext(BitskiContext);
  const { signMessageAsync } = useSignMessage();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const disconnect = async (connector: Connector) => {
    try {
      await disconnectAsync({ connector });
      dispatchConnectionAction({
        kind: ConnectionActionKind.Disconnected,
      });
    } catch (e) {
      dispatchConnectionAction({
        kind: ConnectionActionKind.Error,
        connector: connector,
      });
    }
  };

  return {
    connectionState,
    connect: async (connector: Connector) => {
      dispatchConnectionAction({
        kind: ConnectionActionKind.Pending,
        connector,
      });
      try {
        const newConnection = await connectAsync({ connector });
        const needsSignMessage = connector.type !== CONNECTOR_TYPE_BITSKI;
        if (!needsSignMessage) {
          dispatchConnectionAction({
            kind: ConnectionActionKind.NewConnection,
            chainId: newConnection.chainId,
            address: newConnection.accounts[0],
            connector,
          });
          return;
        }

        try {
          await signMessageAsync({ connector: connector, message: 'Welcome to Bitski WaaS' });
          dispatchConnectionAction({
            kind: ConnectionActionKind.SignedNewConnection,
            chainId: newConnection.chainId,
            address: newConnection.accounts[0],
            connector,
          });
        } catch (e) {
          if (!(e as UserRejectedRequestError)) {
            console.error('Error Signing Message', e);
          }
          await disconnect(connector);
          dispatchConnectionAction({
            kind: ConnectionActionKind.Error,
            connector,
          });
        }
      } catch (e) {
        console.error(e);
        dispatchConnectionAction({
          kind: ConnectionActionKind.Error,
          connector,
        });
      }
    },
    disconnect,
    reset: () => {
      // TODO This should make sure all connections are disconnected
      dispatchConnectionAction({
        kind: ConnectionActionKind.Reset,
      });
    },
  };
}
