import { useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import { ChainIcon } from './ChainIcon';
import { useState } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import checkChecked from '../assets/check-checked.svg';
import checkDisabled from '../assets/check-disabled.svg';
import { LoadingSpinner } from './LoadingSpinner';

interface ChainSwitcherProps {}

export const ChainSwitcher = ({}: ChainSwitcherProps) => {
  const { chain: selectedChain } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const onChainClick = (chainId: number) => {
    switchChain({ chainId });
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="flex items-center justify-center"
        ref={refs.setReference}
        {...getReferenceProps()}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedChain ? <ChainIcon chainId={selectedChain.id} size={24} /> : <LoadingSpinner />}
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          {...getFloatingProps()}
          style={floatingStyles}
          className="bg-white flex flex-col rounded-lg flex-start shadow z-50 overflow-hidden"
        >
          {chains.slice(1).map((chain) => {
            const checkSrc = chain.id === selectedChain?.id ? checkChecked : checkDisabled;
            return (
              <label
                className="flex items-center justify-between hover:bg-[color:var(--aux-grey)] p-2 hover:cursor-pointer"
                key={chain.id}
                onClick={() => onChainClick(chain.id)}
              >
                <div className="flex gap-2 w-full h-full">
                  <ChainIcon chainId={chain.id} size={24} />
                  {chain.name}
                </div>
                <div className="ml-4 flex flex-grow flex-row-reverse items-center">
                  <img className={'w-8 h-8 shrink-0'} src={checkSrc} />
                </div>
              </label>
            );
          })}
        </div>
      )}
    </>
  );
};
