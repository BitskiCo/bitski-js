import { parseUnits } from 'viem';

export const toRawValue = (amount: string, decimals?: number | null) => {
  if (!decimals) {
    throw new Error('Missing decimals for setting token value.');
  }

  return parseUnits(amount, decimals);
};
