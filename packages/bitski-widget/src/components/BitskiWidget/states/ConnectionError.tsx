import { Connector } from 'wagmi';
import DEFAULT_CONNECTOR_ICON from '../../../assets/waas-logo.png';
import apple from '../../../assets/apple.png';
import google from '../../../assets/google.png';
import phantom from '../../../assets/phantom.svg';
import coinbaseWalletSDK from '../../../assets/coinbase-wallet.svg';
import metaMaskSDK from '../../../assets/metamask.svg';
import injected from '../../../assets/injected-wallet.svg';
import walletConnect from '../../../assets/waas-logo.png';
import bitskiSDK from '../../../assets/email.svg';
import x from '../../../assets/x.svg';

export default function ConnectionError(props: {
  connector: Connector | undefined;
  reset: () => void;
}) {
  return (
    <div className="flex w-[350px] relative flex-col items-center gap-6 shadow-[0px_4px_12px_0px_color(display-p3_0_0_0_/_0.12)] p-8 rounded-3xl bg-white">
      <div className="w-6 h-6 absolute left-6 top-[23.5px]">
        <button onClick={props.reset}>
          <img src="/images/chevron-left-small.svg" alt="Back" />
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
          <img src="/images/arrow-rotate-right-left.svg" alt="Retry" />
        </div>
      </button>
    </div>
  );
}

export function iconForConnector(connector: Connector | undefined): string {
  if (!connector) {
    return DEFAULT_CONNECTOR_ICON;
  }
  const icon = getIcon(connector.id) ?? DEFAULT_CONNECTOR_ICON;
  return icon;
}

const getIcon = (type: string): string | undefined => {
  switch (type) {
    case 'apple':
      return apple;
    case 'google':
      return google;
    case 'phantom':
      return phantom;
    case 'coinbaseWalletSDK':
      return coinbaseWalletSDK;
    case 'metaMaskSDK':
      return metaMaskSDK;
    case 'injected':
      return injected;
    case 'walletConnect':
      return walletConnect;
    case 'bitskiSDK':
      return bitskiSDK;
    case 'x':
      return x;
    default:
      return undefined;
  }
};
