import { useState, useEffect } from 'react';
import { Bitski, AuthenticationStatus } from 'bitski';
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const bitski = new Bitski(
  '1812bcfa-44ab-48e3-87b2-b06de6c8e89d',
  'http://localhost:5173/callback.html',
);

function App() {
  const [currentAccount, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [hash, setHash] = useState(null);

  useEffect(() => {
    getProvider();
  });

  const getProvider = async () => {
    if (provider) return;

    const web3 = createWalletClient({
      chain: mainnet,
      transport: custom(bitski.getProvider()),
    });
    setProvider(web3);
  };

  const connect = async () => {
    if (!provider) {
      getProvider();
    }

    const status = await bitski.getAuthStatus();

    if (status !== AuthenticationStatus.Connected) {
      await bitski.signIn();
    }

    const accounts = await provider.getAddresses();

    if (!accounts?.[0]) {
      throw new Error('Could not find any valid accounts');
    }

    setAccount(accounts[0]);
  };

  const disconnect = async () => {
    await bitski.signOut();
    setAccount(null);
    setHash(null);
  };

  const signMessage = async () => {
    const transactionHash = await provider.signMessage({
      account: currentAccount,
      message: 'This is a test message you are signing.',
    });

    setHash(transactionHash);
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl">Bitski + viem</h1>
      <section className="flex flex-col items-center justify-center">
        <button
          className="my-4 inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
          onClick={() => (currentAccount ? disconnect() : connect())}
        >
          {currentAccount ? 'Disconnect' : 'Sign In With Bitski'}
        </button>

        {currentAccount ? (
          <div className="mt-4 text-center break-all w-[500px]">
            <p className="mt-4 text-center">Logged in as:</p>
            <p className="mt-2 font-bold">{currentAccount}</p>
          </div>
        ) : (
          'Not logged in.'
        )}

        {currentAccount && !hash ? (
          <button
            className="my-4 inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
            onClick={() => signMessage()}
          >
            Sign Message
          </button>
        ) : null}

        {currentAccount && hash ? (
          <div className="mt-4 text-center break-all w-[500px]">
            <p className="mt-4 text-center">Your transaction was successful:</p>
            <p className="mt-2 font-bold">{hash}</p>
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default App;
