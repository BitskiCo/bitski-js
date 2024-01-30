import { useCallback, useState } from 'react';
import { BitskiAuth } from './BitskiAuth';
import { BitskiConnect } from './BitskiConnect';
import { Dialog, DialogContent, DialogTrigger } from '../Dialog';

export interface BitskiWidgetProps {
  children?: React.ReactNode;
  collapsed?: boolean;
  logoUrl?: string;
  loginText?: string;
}

function BitskiWidget({ children, collapsed = false, logoUrl, loginText }: BitskiWidgetProps) {
  const [showAuth, setShowAuth] = useState(false);

  const displayAuth = useCallback(() => {
    setShowAuth(true);
  }, []);

  const hideAuth = useCallback(() => {
    setShowAuth(false);
  }, []);

  if (!collapsed) {
    return <BitskiAuth logoUrl={logoUrl}>{children}</BitskiAuth>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <BitskiConnect displayText={loginText} onClick={displayAuth} />
      </DialogTrigger>
      <DialogContent className="Dialog">
        <BitskiAuth logoUrl={logoUrl} onBack={hideAuth}>
          {children}
        </BitskiAuth>
      </DialogContent>
    </Dialog>
  );
}

export default BitskiWidget;
