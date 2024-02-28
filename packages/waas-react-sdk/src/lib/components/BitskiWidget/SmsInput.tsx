import { Connector } from 'wagmi';
import { useRef, useState } from 'react';
import { BitskiConnector } from '../../connectors';
import phoneIcon from '../../assets/phone.svg';
import useOnClickOutside from 'use-onclickoutside';

export function SmsInput({
  connector,
  connect,
}: {
  connector: Connector | BitskiConnector;
  connect: ({
    connector,
    parameters,
  }: {
    connector: Connector;
    parameters?: Record<string, unknown>;
  }) => void;
}) {
  const [phone, setPhone] = useState('');
  const buttonEnabled = validatePhoneNumber(phone);
  const buttonBgColor = buttonEnabled ? 'bg-black' : 'bg-[color:var(--aux-light-grey)]';
  const buttonTextColor = buttonEnabled ? 'text-white' : 'text-[color:var(--aux-grey)]';
  const inputTextColor = phone.length > 0 ? 'text-black' : 'text-[color:var(--main-grey)]';

  const [revealed, setRevealed] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    setPhone('');
    setRevealed(false);
  });

  async function handleSubmit() {
    try {
      if ('setPhone' in connector) {
        // Hardcode to US for now
        connector.setPhone(`+1${phone}`);
      }
      await connect({ connector });
    } catch (e) {
      console.error(e);
    }
  }

  const form = (
    <form className="relative w-mx" onSubmit={handleSubmit}>
      <input
        type="tel"
        onChange={(event) => setPhone(event.target.value)}
        placeholder="Enter your phone"
        value={phone}
        className={`w-[286px] focus:outline-none border-[color:var(--aux-grey,color(display-p3_0.7569_0.7569_0.7647_/_0.20))] p-4 rounded-xl border-[1.5px] border-solid ${inputTextColor} text-sm not-italic font-[510] leading-[17px] tracking-[-0.084px]`}
      />
      <button
        type="submit"
        disabled={!buttonEnabled}
        className={`absolute justify-center items-center rounded-md py-[5px] right-3 top-1/2 transform -translate-y-1/2 ${buttonBgColor}`}
      >
        <p
          className={`px-2 py-[5px] ${buttonTextColor} text-center text-xs not-italic font-[590] leading-[15px] tracking-[-0.24px]`}
        >
          Submit
        </p>
      </button>
    </form>
  );

  const continueButton = (
    <button
      onClick={() => {
        setRevealed(true);
      }}
      className="w-[286px] focus:outline-none border-[color:var(--aux-grey,color(display-p3_0.7569_0.7569_0.7647_/_0.20))] p-4 rounded-xl border-[1.5px] border-solid"
    >
      <div className="flex flex-row gap-3 items-center">
        <img src={phoneIcon} className="w-5 h-5" />
        <p className="text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-sm not-italic font-bold leading-[17px] tracking-[-0.28px]">
          Continue with Phone
        </p>
      </div>
    </button>
  );

  return <div ref={ref}>{revealed ? form : continueButton}</div>;
}

function validatePhoneNumber(phone: string) {
  // This is naive, only US phones
  const phoneNumberRegex = /^\d{10}$/;
  return phoneNumberRegex.test(phone);
}
