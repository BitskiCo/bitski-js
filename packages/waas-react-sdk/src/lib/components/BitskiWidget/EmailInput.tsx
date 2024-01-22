import { Connector } from 'wagmi';
import { useState } from 'react';
import { BitskiConnector } from '../../connectors';

export default function EmailInput(props: {
  connector: Connector | BitskiConnector;
  connect: ({
    connector,
    parameters,
  }: {
    connector: Connector;
    parameters?: Record<string, unknown>;
  }) => void;
}) {
  const { connector } = props;
  const [email, setEmail] = useState('');

  const buttonEnabled = email.length > 0;
  const buttonBgColor = buttonEnabled ? 'bg-black' : 'bg-[color:var(--aux-light-grey)]';
  const buttonTextColor = buttonEnabled ? 'text-white' : 'text-[color:var(--aux-grey)]';
  const inputTextColor = email.length > 0 ? 'text-black' : 'text-[color:var(--main-grey)]';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if ('setEmail' in connector) {
      connector.setEmail(email);
    }

    props.connect({ connector });
  };

  return (
    <form className="relative w-mx" onSubmit={handleSubmit}>
      <input
        type="email"
        autoComplete="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        value={email}
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
}
