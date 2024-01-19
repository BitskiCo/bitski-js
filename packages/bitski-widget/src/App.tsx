import './lib/index.css';
import { BitskiProvider, BitskiWidget } from './lib';
import { LoginMethod } from './lib/components/BitskiWidget/constants';
import { base, mainnet, optimism, polygon } from 'viem/chains';

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

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <BitskiProvider
        chains={[providerConfig.chains[0], ...providerConfig.chains]}
        loginMethods={providerConfig.loginMethods}
        config={{
          wallet: 'bitski',
          options: {
            appId: '6ee158ab-0210-4aa9-90e1-fba42b4d0d71',
            bitskiOptions: {
              callbackURL: new URL(
                '../callback.html',
                typeof window !== 'undefined' && window
                  ? window.location.href
                  : 'http://localhost:3000',
              ).href,
            },
          },
        }}
      >
        <BitskiWidget />
      </BitskiProvider>
    </div>
  );
}

export default App;
