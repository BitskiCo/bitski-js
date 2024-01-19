import { Connector } from 'wagmi';
import EmailInput from '../EmailInput';
import { useConfig } from 'wagmi';
import { ExternalWallet, Social } from '../constants';
import Wallets from '../Wallets';
import TOS from '../TOS';
import Socials from '../Socials';
import dappIcon from '../../../assets/dapp-icon.svg';

export default function IdleConnection(props: {
  connectWallet: ({
    connector,
    parameters,
  }: {
    connector: Connector;
    parameters?: Record<string, unknown>;
  }) => void;
}) {
  const config = useConfig();

  const connectors = config.connectors;

  const bitskiConnector = connectors.find((connector) => connector.name === 'bitski');
  const walletConnectors = connectors.filter((connector) => connector.name in ExternalWallet);
  const socialConnectors = connectors.filter((connector) => connector.name in Social);

  const showOrDivider = (bitskiConnector || socialConnectors.length) && walletConnectors.length;

  return (
    <div className="flex w-[350px] flex-col items-center gap-6 shadow-[0px_10px_40px_0px_color(display-p3_0_0.0667_0.2_/_0.10)] pt-7 pb-0 px-8 rounded-3xl bg-white">
      <p className="text-[color:var(--main-grey)] text-sm not-italic font-[590] leading-[17px] tracking-[-0.28px]">
        Login or Sign Up
      </p>
      <img className="w-12 h-12" src={dappIcon} alt="Logo" />
      {bitskiConnector ? (
        <div className="flex flex-col items-center gap-3 self-stretch">
          <EmailInput connector={bitskiConnector} connect={props.connectWallet} />
        </div>
      ) : null}

      {socialConnectors.length ? (
        <Socials onSocialClick={(social) => props.connectWallet({ connector: social.connector })} />
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
        <Wallets onWalletClick={(wallet) => props.connectWallet({ connector: wallet.connector })} />
      ) : null}
      <TOS />
    </div>
  );
}
