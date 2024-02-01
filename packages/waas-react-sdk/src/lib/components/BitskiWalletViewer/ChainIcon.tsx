import { base, mainnet, optimism, polygon } from 'viem/chains';
import iconEth from '../../assets/icon-eth.svg';
import iconMatic from '../../assets/icon-matic.svg';
import iconCoinbase from '../../assets/icon-coinbase.svg';
import iconOptimism from '../../assets/icon-optimism.svg';

const iconMap: Record<number, { src: string; bg: string }> = {
  [mainnet.id]: { src: iconEth, bg: 'bg-[color:var(--main-obsidian)]' },
  [polygon.id]: { src: iconMatic, bg: 'bg-[#8247E5]' },
  [base.id]: { src: iconCoinbase, bg: '' },
  [optimism.id]: { src: iconOptimism, bg: '' },
};

export function ChainIcon({ chainId, size }: { chainId: number; size: string }) {
  const { src, bg } = iconMap[chainId];
  return (
    <div
      className={`${bg} flex w-${size} h-${size} justify-center items-center shadow-[0px_3px_15px_0px_color(display-p3_0_0.0667_0.2_/_0.05)] p-[2.5px] rounded-[999px]`}
    >
      <img src={src} className={`w-${size} h-${size}`} />
    </div>
  );
}
