import { useCallback, useState } from 'react';
import { BitskiAuth } from './BitskiAuth';
import { BitskiConnect } from './BitskiConnect';

export interface BitskiWidgetProps {
  children?: React.ReactNode;
  collapsed?: boolean;
  logoUrl?: string;
  loginText?: string;
}

function BitskiWidget({ children, collapsed = false, logoUrl, loginText }: BitskiWidgetProps) {
  console.log('widget has children', children);
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

  return showAuth ? (
    <BitskiAuth logoUrl={logoUrl} onBack={hideAuth}>
      {children}
    </BitskiAuth>
  ) : (
    <BitskiConnect displayText={loginText} onClick={displayAuth} />
  );
}

export default BitskiWidget;
