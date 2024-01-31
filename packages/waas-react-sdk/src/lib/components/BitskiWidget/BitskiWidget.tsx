import { BitskiAuth } from './BitskiAuth';
import BitskiConnect from './BitskiConnect';
import { Dialog, DialogContent, DialogTrigger } from '../Dialog';

export interface BitskiWidgetProps {
  children?: React.ReactNode;
  collapsed?: boolean;
  connect?: React.ReactNode;
  logoUrl?: string;
  loginText?: string;
}

function BitskiWidget({
  children,
  collapsed = false,
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
          {children}
        </BitskiAuth>
      </DialogContent>
    </Dialog>
  );
}

export default BitskiWidget;
