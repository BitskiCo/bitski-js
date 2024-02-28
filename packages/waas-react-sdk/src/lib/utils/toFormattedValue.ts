import { formatUnits } from 'viem';

export const toFormattedValue = (amount: string, decimals?: number | null) => {
  if (!decimals) {
    throw new Error('Missing decimals for setting token value.');
  }

  return formatUnits(BigInt(amount), decimals);
};
