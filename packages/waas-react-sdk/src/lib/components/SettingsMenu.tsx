import { useDismiss, useFloating, useInteractions } from '@floating-ui/react';
import iconDisconnect from '../assets/icon-disconnect.svg';
import { Connector } from 'wagmi';
import { useBitski } from '..';
import { useState } from 'react';
import iconSettings from '../assets/settings.svg';

export const SettingsMenu = ({ connector }: { connector: Connector }) => {
  const { disconnect } = useBitski();
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-end',
    open: isOpen,
    onOpenChange: setIsOpen,
  });

  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <>
      <button ref={refs.setReference} {...getReferenceProps()} onClick={() => setIsOpen(!isOpen)}>
        <img src={iconSettings} alt="Settings" />
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          {...getFloatingProps()}
          style={floatingStyles}
          className="min-w-[200px] bg-white flex flex-col rounded-lg flex-start shadow z-50 overflow-hidden"
        >
          <button
            onClick={async () => {
              await disconnect(connector);
            }}
            className="flex items-center gap-2 w-full hover:bg-[color:var(--aux-grey)] hover:cursor-pointer p-2"
          >
            <img src={iconDisconnect} alt="Disconnect" />
            <span className="text-[color:var(--Main-Grey,color(display-p3_0.5961_0.5922_0.6118))] text-center text-[13px] not-italic font-[590] leading-[13px]">
              Disconnect
            </span>
          </button>
        </div>
      )}
    </>
  );
};
