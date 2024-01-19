import { Connector } from 'wagmi';

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

const DEFAULT_CONNECTOR_ICON = 'waas-logo.png';

export function iconForConnector(connector: Connector | undefined): string {
  if (!connector) {
    return `/images/${DEFAULT_CONNECTOR_ICON}`;
  }
  const icon = getIcon(connector.id) ?? DEFAULT_CONNECTOR_ICON;
  return '/images/' + icon;
}

const getIcon = (type: string): string | undefined => {
  switch (type) {
    case 'apple':
      return 'apple.png';
    case 'google':
      return 'google.png';
    case 'phantom':
      return 'phantom.svg';
    case 'coinbaseWalletSDK':
      return 'coinbase-wallet.svg';
    case 'metaMaskSDK':
      return 'metamask.svg';
    case 'injected':
      return 'injected-wallet.svg';
    case 'walletConnect':
      return 'waas-logo.png';
    case 'bitskiSDK':
      return 'email.svg';
    case 'x':
      return 'x.svg';
    default:
      return undefined;
  }
};
