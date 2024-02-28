import emptyTokensImage from '../assets/empty-tokens.svg';

export const EmptySwaps = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img className="w-[136px] h-[88px]" src={emptyTokensImage} alt="No tokens" />
      <h1 className="text-subtitle-b">You don't have any tokens to swap</h1>
      <p className="mt-3 text-caption-m">
        Deposit tokens into your wallet to begin swapping. You can copy your address to transfer
        tokens into the wallet by clicking on it above.
      </p>
    </div>
  );
};
