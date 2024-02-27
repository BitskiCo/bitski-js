import { truncateAddress } from '../../utils';
import { ConnectionStateKind } from '../../BitskiContext';
import { useBitski } from '../../useBitski';

interface BitskiConnectProps {
  children?: React.ReactNode;
  displayText?: string;
  onClick?: () => void;
}

const DefaultConnect = ({ displayText }: { displayText: string }) => {
  const connectionState = useBitski().connectionState;
  let text: string;
  switch (connectionState.kind) {
    case ConnectionStateKind.Connected:
      text = truncateAddress(connectionState.address);
      break;
    default:
      text = displayText;
  }

  return (
    <p className="text-[color:var(--main-white,color(display-p3_1_1_1))] text-center text-[13px] not-italic font-[590] leading-[13px]">
      {text}
    </p>
  );
};

export default function BitskiConnect({
  children,
  displayText = 'Login',
  onClick,
}: BitskiConnectProps) {
  return (
    <button
      className="bg-[color:var(--main-obsidian)] flex h-11 flex-col justify-center items-center px-5 py-0 rounded-2xl"
      onClick={onClick}
    >
      {children ? children : <DefaultConnect displayText={displayText} />}
    </button>
  );
}
