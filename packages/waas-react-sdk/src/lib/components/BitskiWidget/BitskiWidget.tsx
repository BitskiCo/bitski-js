import { BitskiAuth } from './BitskiAuth';

export interface BitskiWidgetProps {
  logoUrl?: string
}

function BitskiWidget({ logoUrl }: BitskiWidgetProps) {
  return <BitskiAuth logoUrl={logoUrl}  />;
}

export default BitskiWidget;
