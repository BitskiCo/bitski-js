import { Connector } from 'wagmi';
import EmailInput from '../EmailInput';
import { useConfig } from 'wagmi';
import { ExternalWallet, Social } from '../constants';
import Wallets from '../Wallets';
import TOS from '../TOS';
import Socials from '../Socials';
import chevronLeftSmall from '../../../assets/chevron-left-small.svg';

interface IdleConnectionProps {
  connectWallet: ({
    connector,
    parameters,
  }: {
    connector: Connector;
    parameters?: Record<string, unknown>;
  }) => void;
  onBack?: () => void;
  logoUrl?: string;
}

export default function IdleConnection({ connectWallet, onBack, logoUrl }: IdleConnectionProps) {
  const config = useConfig();

  const connectors = config.connectors;

  const bitskiConnector = connectors.find((connector) => connector.name === 'bitski');
  const walletConnectors = connectors.filter((connector) => connector.name in ExternalWallet);
  const socialConnectors = connectors.filter((connector) => connector.name in Social);

  const showOrDivider = (bitskiConnector || socialConnectors.length) && walletConnectors.length;

  return (
    <div className="relative flex w-[350px] flex-col items-center gap-6 shadow-[0px_10px_40px_0px_color(display-p3_0_0.0667_0.2_/_0.10)] pt-7 pb-0 px-8 rounded-3xl bg-white">
      {onBack ? (
        <div className="w-6 h-6 absolute left-6 top-[23.5px]">
          <button onClick={onBack}>
            <img src={chevronLeftSmall} alt="Back" />
          </button>
        </div>
      ) : null}
      <p className="text-[color:var(--main-grey)] text-sm not-italic font-[590] leading-[17px] tracking-[-0.28px]">
        Login or Sign Up
      </p>
      {logoUrl ? <img className="w-12 h-12" src={logoUrl} alt="Logo" /> : null}
      {bitskiConnector ? (
        <div className="flex flex-col items-center gap-3 self-stretch">
          <EmailInput connector={bitskiConnector} connect={connectWallet} />
        </div>
      ) : null}

      {socialConnectors.length ? (
        <Socials onSocialClick={(social) => connectWallet({ connector: social.connector })} />
      ) : null}

      {showOrDivider ? (
        <div className="flex justify-center items-center gap-4 self-stretch">
          <span className="h-[1.5px] flex-[1_0_0] rounded-[10px] bg-[color:var(--aux-grey)]"></span>
          <span className="text-[color:var(--main-grey)] text-xs not-italic font-[590] leading-[15px] tracking-[-0.24px]">
            OR
          </span>
          <span className="h-[1.5px] flex-[1_0_0] rounded-[10px] bg-[color:var(--aux-grey)]"></span>
        </div>
      ) : null}

      {walletConnectors.length ? (
        <Wallets onWalletClick={(wallet) => connectWallet({ connector: wallet.connector })} />
      ) : null}
      <TOS />
    </div>
  );
}
