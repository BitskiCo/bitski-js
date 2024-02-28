import { useState } from 'react';
import { truncateAddress } from '../utils';

export const CopyAddress = ({ address }: { address: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await window.navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 300);
  };

  return (
    <button
      className="grow text-[color:var(--Main-Black,color(display-p3_0.2_0.2_0.2))] text-center text-base not-italic font-[590] leading-[22px] tracking-[-0.32px]"
      onClick={copy}
    >
      {copied ? 'Copied!' : truncateAddress(address)}
    </button>
  );
};
