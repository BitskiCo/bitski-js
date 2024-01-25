import './lib/index.css';
import { BitskiProvider, BitskiWidget } from './lib';
import { LoginMethod } from './lib/components/BitskiWidget/constants';
import { base, mainnet, optimism, polygon } from 'viem/chains';
import { useAccountEffect } from '../../../node_modules/wagmi/dist/types/hooks/useAccountEffect';

function App() {
  const providerConfig = {
    loginMethods: [
      LoginMethod.Bitski,
      LoginMethod.Wallet,
      LoginMethod.Apple,
      LoginMethod.Google,
      LoginMethod.X,
    ],
    chains: [mainnet, base, polygon, optimism],
  };

  useAccountEffect({
    config,
    onConnect(data) {
      console.log('Connected!', data)
    },
    onDisconnect() {
      console.log('Disconnected!')
    },
  })

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <BitskiProvider
        appId="6ee158ab-0210-4aa9-90e1-fba42b4d0d71"
        callbackURL={
          new URL(
            '../callback.html',
            typeof window !== 'undefined' && window
              ? window.location.href
              : 'http://localhost:3000',
          ).href
        }
        chains={[providerConfig.chains[0], ...providerConfig.chains]}
        loginMethods={providerConfig.loginMethods}
      >
        <BitskiWidget logoUrl={`https://i.imgur.com/QYSwQ00.png`} />
      </BitskiProvider>
    </div>
  );
}

export default App;
