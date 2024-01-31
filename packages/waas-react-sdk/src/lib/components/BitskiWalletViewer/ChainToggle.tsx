import { Chain, mainnet, optimism } from 'viem/chains';
import { ChainIcon } from './ChainIcon';

interface ChainToggleProps {
  chain: Chain;
  checked: boolean;
  onChange: () => void;
}

function ChainToggle({ chain, checked, onChange }: ChainToggleProps) {
  return (
    <label className="flex justify-between items-center flex-[1_0_0] p-3 rounded-xl bg-[var(--aux-light-grey)]">
      <div key={chain.id} className="flex items-center gap-2">
        <ChainIcon chainId={chain.id} size={'5'} />
        <p className="text-[color:var(--Main-Black,#333)] text-sm not-italic font-bold leading-[17px] tracking-[-0.28px]">
          {chain.id === optimism.id ? 'Optimism' : chain.name}
        </p>
      </div>
      <input
        type="checkbox"
        className="accent-blue-500"
        checked={checked}
        onChange={onChange}
        disabled={chain.name === mainnet.name}
      />
    </label>
  );
}

export default ChainToggle;
