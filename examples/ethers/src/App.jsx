import { useState, useEffect } from 'react';
import { Bitski, AuthenticationStatus } from 'bitski';
import { ethers } from 'ethers';

const bitski = new Bitski(
  '1812bcfa-44ab-48e3-87b2-b06de6c8e89d',
  'http://localhost:5173/callback.html',
);

function App() {
  const [currentAccount, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [hash, setHash] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProvider();
  });

  const getProvider = async () => {
    if (provider) return;

    const web3 = new ethers.BrowserProvider(bitski.getProvider());
    setProvider(web3);
  };

  const getAccounts = async () => {
    const accounts = await provider.send('eth_accounts');

    if (accounts.length) {
      return accounts;
    }

    const addressAccounts = await provider.send('eth_requestAccounts');

    if (addressAccounts.length) {
      return addressAccounts;
    }

    setError('Could not find valid accounts');
  };

  const connect = async () => {
    setError(null);

    if (!provider) {
      getProvider();
    }

    const status = await bitski.getAuthStatus();

    if (status !== AuthenticationStatus.Connected) {
      await bitski.signIn();
    }

    const accounts = await getAccounts();

    if (accounts && accounts[0]) {
      setAccount(accounts[0]);
    }
  };

  const disconnect = async () => {
    await bitski.signOut();
    setAccount(null);
    setHash(null);
    setError(null);
  };

  const signMessage = async () => {
    const transactionHash = await provider.send('eth_sign', [
      currentAccount,
      'This is a test message you are signing.',
    ]);

    setHash(transactionHash);
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl">Bitski + ethers</h1>

      {error && (
        <div class="alert alert-error shadow-lg max-w-xs my-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error} </span>
          </div>
        </div>
      )}

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
