import { BitskiAuth } from './BitskiAuth';
import { BitskiConnect } from './BitskiConnect';
import { Dialog, DialogContent, DialogTrigger } from '../Dialog';

export interface BitskiWidgetProps {
  children?: React.ReactNode;
  collapsed?: boolean;
  autoCollapseOnConnect?: boolean;
  logoUrl?: string;
  loginText?: string;
}

function BitskiWidget({ children, collapsed = false, logoUrl, loginText }: BitskiWidgetProps) {
  if (!collapsed) {
    return <BitskiAuth logoUrl={logoUrl}>{children}</BitskiAuth>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <BitskiConnect displayText={loginText} />
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
