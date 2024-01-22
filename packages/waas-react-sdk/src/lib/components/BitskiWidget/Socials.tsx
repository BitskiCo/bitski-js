import { Connector, useConnect } from 'wagmi';
import { Social } from './constants';
import appleIcon from '../../assets/apple.svg';
import googleIcon from '../../assets/google.svg';
import xIcon from '../../assets/x.svg';

interface SocialProps {
  name: string;
  icon: string;
  onSocialClick: () => void;
}

const SocialBtn = ({ name, icon, onSocialClick }: SocialProps) => {
  return (
    <button
      onClick={onSocialClick}
      className="flex flex-col justify-center items-center flex-[1_0_0] self-stretchh px-8 py-3 rounded-xl bg-[color:var(--aux-light-grey)]"
    >
      <img className="w-6 h-6" src={icon} alt={name} />
    </button>
  );
};

function useSocials(): Social[] {
  return [Social.Apple, Social.Google, Social.X];
}

function socialRow(
  social: Social,
  connector: Connector,
): { name: string; icon: string; social: Social; connector: Connector } {
  switch (social) {
    case Social.Apple:
      return {
        name: 'Apple',
        icon: appleIcon,
        social,
        connector,
      };
    case Social.Google:
      return {
        name: 'Google',
        icon: googleIcon,
        social,
        connector,
      };
    case Social.X:
      return {
        name: 'X',
        icon: xIcon,
        social,
        connector,
      };
    default:
      throw new Error('Invalid social');
  }
}

interface ConnectableSocial {
  social: Social;
  connector: Connector;
}

export default function Socials(props: {
  onSocialClick: (connectableSocial: ConnectableSocial) => void;
}) {
  const socials = useSocials();
  const { connectors } = useConnect();

  const connectableSocials = socials
    .map((social) => {
      const connector = connectors.filter((connector) => {
        return connector.id === social;
      })[0];

      return { social, connector };
    })
    .filter(({ connector }) => connector);

  const rows = connectableSocials.map(({ social, connector }) => socialRow(social, connector));

  return (
    <div className="flex items-start gap-3 self-stretch w-full">
      {rows.map(({ name, icon, social, connector }) => (
        <SocialBtn
          key={social}
          name={name}
          icon={icon}
          onSocialClick={() => props.onSocialClick({ social, connector })}
        />
      ))}
    </div>
  );
}
