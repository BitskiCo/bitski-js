import { Connector } from 'wagmi';
import defaultConnectorIcon from '../../../assets/waas-logo.png';
import appleIcon from '../../../assets/apple.svg';
import googleIcon from '../../../assets/google.svg';
import phantomIcon from '../../../assets/phantom.svg';
import coinbaseWalletIcon from '../../../assets/coinbase-wallet.svg';
import metaMaskIcon from '../../../assets/metamask.svg';
import injectedIcon from '../../../assets/injected-wallet.svg';
import walletConnectIcon from '../../../assets/other-wallets.svg';
import emailIcon from '../../../assets/email.svg';
import xIcon from '../../../assets/x.svg';
import arrowRotateIcon from '../../../assets/arrow-rotate-right-left.svg';
import chevronLeftIcon from '../../../assets/chevron-left-small.svg';

export default function ConnectionError(props: {
  connector: Connector | undefined;
  reset: () => void;
}) {
  return (
    <div className="flex w-[350px] relative flex-col items-center gap-6 shadow-[0px_4px_12px_0px_color(display-p3_0_0_0_/_0.12)] p-8 rounded-3xl bg-white">
      <div className="w-6 h-6 absolute left-6 top-[23.5px]">
        <button onClick={props.reset}>
          <img src={chevronLeftIcon} alt="Back" />
        </button>
      </div>
      <img src={iconForConnector(props.connector)} />
      <div className="flex flex-col items-center gap-3 self-stretch">
        <h3 className="text-red-600 text-lg not-italic font-bold leading-[23px] tracking-[-0.45px]">
          Connection Failed!
        </h3>
        <p className="self-stretch text-[color:var(--main-grey,color(display-p3_0.5961_0.5922_0.6118))] text-center text-base not-italic font-normal leading-[22px] tracking-[-0.096px]">
          Please try connecting again
        </p>
      </div>
      <button
        onClick={props.reset}
        className="flex h-11 flex-col justify-center items-center self-stretch px-5 py-0 bg-gray-200 bg-opacity-33 rounded-2xl"
      >
        <div className="flex items-center gap-1">
          <p className="text-[color:var(--main-black,color(display-p3_0.2_0.2_0.2))] text-center text-[13px] not-italic font-[590] leading-[13px]">
            Retry
          </p>
          <img src={arrowRotateIcon} alt="Retry" />
        </div>
      </button>
    </div>
  );
}

export function iconForConnector(connector: Connector | undefined): string {
  if (!connector) {
    return defaultConnectorIcon;
  }

  const icon = getIcon(connector.id) ?? defaultConnectorIcon;
  return icon;
}

const getIcon = (type: string): string | undefined => {
  switch (type) {
    case 'apple':
      return appleIcon;
    case 'google':
      return googleIcon;
    case 'phantom':
      return phantomIcon;
    case 'coinbaseWalletSDK':
      return coinbaseWalletIcon;
    case 'metaMaskSDK':
      return metaMaskIcon;
    case 'injected':
      return injectedIcon;
    case 'walletConnect':
      return walletConnectIcon;
    case 'bitskiSDK':
      return emailIcon;
    case 'x':
      return xIcon;
    default:
      return undefined;
  }
};
