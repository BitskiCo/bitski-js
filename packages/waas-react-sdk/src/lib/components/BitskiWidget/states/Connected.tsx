import { Connector, useSignMessage } from 'wagmi';
import { useState } from 'react';
import dappIcon from '../../../assets/dapp-icon.svg';

enum SignedMessageStateType {
  Rest,
  Signing,
  Signed,
}

type SignedMessageState =
  | { type: SignedMessageStateType.Rest }
  | { type: SignedMessageStateType.Signing }
  | { type: SignedMessageStateType.Signed; message: string };

export default function Connected(props: {
  connector: Connector;
  chainName: string;
  address: string;
  disconnect: () => void;
}) {
  const { signMessageAsync } = useSignMessage();
  const [signedMessageState, setSignedMessageState] = useState<SignedMessageState>({
    type: SignedMessageStateType.Rest,
  });

  async function signMessage() {
    setSignedMessageState({ type: SignedMessageStateType.Signing });
    try {
      const signedMessage = await signMessageAsync({
        message: 'Welcome to Bitski WaaS',
        connector: props.connector,
      });
      setSignedMessageState({
        type: SignedMessageStateType.Signed,
        message: signedMessage,
      });
    } catch (e) {
      console.error(e);
      setSignedMessageState({ type: SignedMessageStateType.Rest });
    }
  }

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="flex w-[375px] flex-col items-start gap-6 shadow-[0px_10px_40px_0px_color(display-p3_0_0.0667_0.2_/_0.10)] p-6 rounded-2xl bg-white">
        <div className="flex h-[150px] flex-col justify-center items-center gap-2.5 self-stretch rounded-xl bg-[var(--aux-light-grey)]">
          <div className="flex justify-center items-center gap-2 pl-2.5 pr-3 py-2 rounded-xl bg-[var(--aux-grey)]">
            <img
              className="w-6 h-6 fill-[radial-gradient(69.05%_69.05%_at_59.52%_33.33%,color(display-p3_0.851_0.851_0.851)_0%,color(display-p3_0.16_0.6201_1)_100%)]"
              src={dappIcon}
              alt="Dapp"
            />
            {props.address ? (
              <p className="text-[color:var(--main-black,color(display-p3_0.2_0.2_0.2))] text-center text-base not-italic font-[590] leading-[22px] tracking-[-0.32px]">
                {shortenEthereumAddress(props.address)}
              </p>
            ) : (
              <p className="text-[color:var(--main-black,color(display-p3_0.2_0.2_0.2))] text-center text-base not-italic font-[590] leading-[22px] tracking-[-0.32px]">
                Loading address...
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 self-stretch">
          <h3 className="text-black text-base not-italic font-bold leading-[22px] tracking-[-0.32px]">
            Connected Component
          </h3>
          <p className="self-stretch text-[color:var(--main-grey,color(display-p3_0.5961_0.5922_0.6118))] text-sm not-italic font-normal leading-[17px] tracking-[-0.084px]">
            Allows users to disconnect from your app, change networks, and open the wallet viewer
          </p>
        </div>
      </div>
      <div className="flex w-[375px] flex-col items-start gap-6 shadow-[0px_10px_40px_0px_color(display-p3_0_0.0667_0.2_/_0.10)] p-6 rounded-2xl bg-white">
        <div className="flex flex-col items-start gap-2 self-stretch">
          <h3 className="text-black text-base not-italic font-bold leading-[22px] tracking-[-0.32px]">
            Wallet Actions
          </h3>
          <p className="self-stretch text-[color:var(--main-grey,color(display-p3_0.5961_0.5922_0.6118))] text-sm not-italic font-normal leading-[17px] tracking-[-0.084px]">
            Allows users to disconnect from your app, change networks, and open the wallet viewer
          </p>
          <div className="flex flex-col gap-4 self-stretch">
            {signedMessageState.type === SignedMessageStateType.Signed ? (
              <div className="grid grid-cols-1">
                <p className="shrink">{signedMessageState.message.substring(0, 24) + '...'}</p>
              </div>
            ) : (
              <div className="h-"></div>
            )}
            <div className="flex flex-col gap-2">
              <button
                className="bg-[color:var(--main-obsidian)] flex h-11 flex-col justify-center items-center self-stretch px-5 py-0 rounded-2xl"
                onClick={signMessage}
              >
                <p className="text-[color:var(--main-white,color(display-p3_1_1_1))] text-center text-[13px] not-italic font-[590] leading-[13px]">
                  Sign Test Transaction
                </p>
              </button>
              <button
                className="flex h-11 flex-col justify-center items-center self-stretch px-5 py-0 bg-gray-200 bg-opacity-33 rounded-2xl"
                onClick={props.disconnect}
              >
                <p className="text-black text-center text-[13px] not-italic font-[590] leading-[13px]">
                  Disconnect
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function shortenEthereumAddress(address: string) {
  if (!address || address.length !== 42 || !address.startsWith('0x')) {
    throw new Error('Invalid Ethereum address');
  }

  const firstFive = address.substring(0, 8);
  const lastFive = address.substring(address.length - 5);

  return `${firstFive}...${lastFive}`;
}
