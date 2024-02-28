import { Connector } from 'wagmi';
import iconWalletConnect from '../../../assets/icon-walletconnect.svg';

export function iconForConnector(connector: Connector): string | undefined {
  if (connector.icon) {
    return connector.icon;
  }
  switch (connector.id) {
    case 'walletConnect':
      return iconWalletConnect;
    default:
      return undefined;
  }
}
