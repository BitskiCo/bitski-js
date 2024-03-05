import { base, mainnet, optimism, polygon } from 'viem/chains';
import iconEthereum from '../assets/chains/icon-ethereum.svg';
import iconPolygon from '../assets/chains/icon-polygon.svg';
import iconBase from '../assets/chains/icon-base.svg';
import iconOptimism from '../assets/chains/icon-optimism.svg';

const iconMap: Record<number, { src: string }> = {
  [mainnet.id]: { src: iconEthereum },
  [polygon.id]: { src: iconPolygon },
  [base.id]: { src: iconBase },
  [optimism.id]: { src: iconOptimism },
};

export function ChainIcon({ chainId, size }: { chainId: number; size: number }) {
  const iconEntry = iconMap[chainId];
  if (!iconEntry) {
    return null
  }
  return (
    <img width={size} height={size} className="rounded-full object-cover object-center" src={iconEntry.src} />
  );
}
