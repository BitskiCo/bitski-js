import BitskiConnect from './BitskiConnect';
import { Dialog, DialogContent, DialogTrigger } from '../Dialog';
import { BitskiWalletViewer, Tab } from '../BitskiWalletViewer';
import { useContext } from 'react';
import { BitskiContext, ConnectionStateKind } from '../../BitskiContext';
import { BitskiAuth } from './index';

export interface BitskiWidgetProps {
  children?: React.ReactNode;
  collapsed?: boolean;
  connect?: React.ReactNode;
  showWallet?: boolean;
  logoUrl?: string;
  loginText?: string;
}

function BitskiWidget({
  children,
  collapsed = false,
  showWallet = true,
  connect,
  logoUrl,
  loginText,
}: BitskiWidgetProps) {
  const { connectionState } = useContext(BitskiContext);
  let dialogContent;
  switch (connectionState.kind) {
    case ConnectionStateKind.Connected:
      dialogContent = <BitskiWalletViewer />;
      break;
    default:
      dialogContent = <BitskiAuth logoUrl={logoUrl} collapsed={false} />;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {connect ? connect : <BitskiConnect displayText={loginText} />}
      </DialogTrigger>
      <DialogContent className="Dialog">{dialogContent}</DialogContent>
    </Dialog>
  );
}

export default BitskiWidget;
