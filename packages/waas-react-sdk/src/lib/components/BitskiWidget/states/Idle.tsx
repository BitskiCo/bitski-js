import { Connector, useConnectors } from 'wagmi';
import EmailInput from '../EmailInput';
import { LoginMethod, Social } from '../constants';
import Wallets from '../Wallets';
import Socials from '../Socials';
import { SmsInput } from '../SmsInput';
import { useContext } from 'react';
import { BitskiContext } from '../../../BitskiContext';
import TOS from '../TOS';
import { useBitski } from '../../hooks/useBitski';

export default function IdleConnection() {
  const { loginMethods, logoUrl } = useContext(BitskiContext);
  const connectors = useConnectors();
  const { connect, reset } = useBitski();

  const emailConnector = connectors.find((connector) => connector.id === LoginMethod.Email);
  const smsConnector: Connector | undefined = connectors.find(
    (connector) => connector.id === LoginMethod.Sms,
  );
  const socialConnectors = connectors.filter((connector) => connector.name in Social);

  return (
    <div className="flex w-[350px] flex-col items-center gap-6 shadow-[0px_10px_40px_0px_color(display-p3_0_0.0667_0.2_/_0.10)] pt-7 pb-0 px-8 rounded-3xl bg-white">
      <p className="text-[color:var(--main-grey)] text-sm not-italic font-[590] leading-[17px] tracking-[-0.28px]">
        Login or Sign Up
      </p>
      {logoUrl ? <img className="w-12 h-12" src={logoUrl} alt="Logo" /> : null}

      <div className="flex flex-col items-center gap-3 self-stretch">
        {emailConnector ? (
          <EmailInput connector={emailConnector} connect={async () => connect(emailConnector)} />
        ) : null}

        {smsConnector ? (
          <SmsInput connector={smsConnector} connect={async () => connect(smsConnector)} />
        ) : null}

        {socialConnectors.length ? (
          <Socials onSocialClick={async (social) => await connect(social.connector)} />
        ) : null}
      </div>

      <Or loginMethods={loginMethods} />
      {loginMethods.includes(LoginMethod.Wallet) ? (
        <Wallets onWalletClick={async (wallet) => await connect(wallet.connector)} />
      ) : null}

      <TOS />
    </div>
  );
}

function Or({ loginMethods }: { loginMethods: LoginMethod[] }) {
  return loginMethods.includes(LoginMethod.Wallet) && loginMethods.length > 1 ? (
    <div className="flex justify-center items-center gap-4 self-stretch">
      <span className="h-[1.5px] flex-[1_0_0] rounded-[10px] bg-[color:var(--aux-grey)]"></span>
      <span className="text-[color:var(--main-grey)] text-xs not-italic font-[590] leading-[15px] tracking-[-0.24px]">
        OR
      </span>
      <span className="h-[1.5px] flex-[1_0_0] rounded-[10px] bg-[color:var(--aux-grey)]"></span>
    </div>
  ) : null;
}
