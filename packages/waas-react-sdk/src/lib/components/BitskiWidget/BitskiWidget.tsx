import { BitskiAuth } from './BitskiAuth';
import BitskiConnect from './BitskiConnect';
import { Dialog, DialogContent, DialogTrigger } from '../Dialog';
import { BitskiWalletProvider } from '../BitskiWalletViewer/BitskiWalletProvider';
import { BitskiWalletViewer } from '../BitskiWalletViewer';

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
  if (!collapsed) {
    return <BitskiAuth logoUrl={logoUrl}>{children}</BitskiAuth>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {connect ? connect : <BitskiConnect displayText={loginText} />}
      </DialogTrigger>
      <DialogContent className="Dialog">
        <BitskiAuth logoUrl={logoUrl} collapsed={collapsed}>
          {showWallet ? (
            <BitskiWalletProvider>
              <BitskiWalletViewer />
            </BitskiWalletProvider>
          ) : (
            children
          )}
        </BitskiAuth>
      </DialogContent>
    </Dialog>
  );
}

export default BitskiWidget;
