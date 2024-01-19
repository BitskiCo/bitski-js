import { Connector, useConnect } from 'wagmi';
import { ExternalWallet } from './constants';
import phantom from '../../assets/phantom.svg';
import coinbaseWalletSDK from '../../assets/coinbase-wallet.svg';
import metaMaskSDK from '../../assets/metamask.svg';
import injected from '../../assets/injected-wallet.svg';
import walletConnect from '../../assets/other-wallets.svg';
import bitskiSDK from '../../assets/email.svg';

interface WalletProps {
  key: string;
  name: string;
  icon: string;
  onWalletClick: () => void;
}

const BITSKI_CONNECTORS = ['apple', 'x', 'bitkiSDK', 'google', 'email'];

const Wallet = ({ name, icon, onWalletClick }: WalletProps) => {
  return (
    <button
      onClick={onWalletClick}
      className="flex justify-between items-center self-stretch p-3 rounded-xl bg-[color:var(--aux-light-grey)]"
    >
      <div className="flex items-center gap-4">
        <img className="w-7 h-7" src={icon} alt={name} />
        <p className="text-[color:var(--main-black,color(display-p3_0.2_0.2_0.2))] text-base not-italic font-bold leading-[22px] tracking-[-0.32px]">
          {name}
        </p>
      </div>
      <img className="w-5 h-5" src="/images/chevron-right-small.svg" alt="More" />
    </button>
  );
};

function useExternalWallets(): ExternalWallet[] {
  return [
    ExternalWallet.Phantom,
    ExternalWallet.CoinbaseWallet,
    ExternalWallet.MetaMask,
    ExternalWallet.WalletConnect,
  ];
}

interface ConnectableWallet {
  wallet: ExternalWallet;
  connector: Connector;
}

function walletRow(
  wallet: ExternalWallet,
  connector: Connector,
): { name: string; icon: string; wallet: ExternalWallet; connector: Connector } {
  switch (wallet) {
    case ExternalWallet.Phantom:
      return {
        name: 'Phantom',
        icon: phantom,
        wallet,
        connector,
      };
    case ExternalWallet.CoinbaseWallet:
      return {
        name: 'Coinbase Wallet',
        icon: coinbaseWalletSDK,
        wallet,
        connector,
      };
    case ExternalWallet.MetaMask:
      return {
        name: 'MetaMask',
        icon: metaMaskSDK,
        wallet,
        connector,
      };
    case ExternalWallet.Injected:
      return {
        name: 'Injected Wallet',
        icon: injected,
        wallet,
        connector,
      };
    case ExternalWallet.WalletConnect:
      return {
        name: 'Other wallets',
        icon: walletConnect,
        wallet,
        connector,
      };
    default:
      if (connector.name === ExternalWallet.MetaMask) {
        return {
          name: 'MetaMask',
          icon: metaMaskSDK,
          wallet,
          connector,
        };
      }

      if (connector.name === ExternalWallet.Phantom) {
        return {
          name: 'Phantom',
          icon: phantom,
          wallet,
          connector,
        };
      }

      if (connector.name === ExternalWallet.CoinbaseWallet) {
        return {
          name: 'Coinbase Wallet',
          icon: coinbaseWalletSDK,
          wallet,
          connector,
        };
      }

      if (connector.name === 'bitski') {
        return {
          name: 'WalletConnect',
          icon: bitskiSDK,
          wallet,
          connector,
        };
      }

      return {
        name: connector.name,
        icon: connector.icon || injected,
        wallet,
        connector,
      };
  }
}

export default function Wallets(props: {
  onWalletClick: (connectableWallet: ConnectableWallet) => void;
}) {
  const wallets = useExternalWallets();
  const { connectors } = useConnect();

  const connectableWallets = connectors.flatMap((connector) => {
    if (BITSKI_CONNECTORS.includes(connector.id)) {
      return [];
    }

    const wallet = wallets.filter((wallet) => {
      return connector.id === wallet;
    })[0];

    return [{ wallet, connector }];
  });

  // Move 'Other Wallets' to the end
  connectableWallets.push(connectableWallets.splice(0, 1)[0]);

  const rows = connectableWallets.map(({ wallet, connector }) => walletRow(wallet, connector));
  return (
    <div className="flex flex-col items-center gap-2 self-stretch pb-4">
      {rows.map(({ name, icon, wallet, connector }) => (
        <Wallet
          key={name}
          name={name}
          icon={icon}
          onWalletClick={() => props.onWalletClick({ wallet, connector })}
        />
      ))}
    </div>
  );
}
