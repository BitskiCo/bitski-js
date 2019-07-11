window.addEventListener("load", function() {
  const bitski = window.bitski;

  // Create connect button
  const connectButton = bitski.getConnectButton({ container: document.querySelector('#connect-button') });
  connectButton.callback = function(error, user){
    if (user) {
      updateLoggedInState();
    }

    if (error) {
      console.error("Error signing in: " + error);
    }
  };

  const signButton = document.querySelector("#sign-button");
  signButton.onclick = () => {
    signTypedData();
    return false;
  };

  updateLoggedInState();
});

function updateLoggedInState() {
  const loggedOutContainer = document.querySelector('#logged-out');
  const loggedInContainer = document.querySelector('#logged-in');

  if (bitski.authStatus === 'NOT_CONNECTED') {
    loggedOutContainer.style = 'display: block;';
    loggedInContainer.style = 'display: none;';
  } else {
    loggedOutContainer.style = 'display: none;';
    loggedInContainer.style = 'display: block;';
  }
}

function signTypedData() {
  const web3 = window.web3;
  const provider = window.provider;
  const msgParams = {
    types: {
        EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
        ],
        Person: [
            { name: 'name', type: 'string' },
            { name: 'wallet', type: 'address' }
        ],
        Mail: [
            { name: 'from', type: 'Person' },
            { name: 'to', type: 'Person' },
            { name: 'contents', type: 'string' }
        ],
    },
    primaryType: 'Mail',
    domain: {
        name: 'Ether Mail',
        version: '0x1',
        chainId: '0x1',
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    message: {
        from: {
            name: 'Cow',
            wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
        },
        to: {
            name: 'Bob',
            wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
        },
        contents: 'Hello, Bob!',
    },
  };
  console.log("Sending: ", JSON.stringify(msgParams));
  web3.eth.getAccounts().then(accounts => {
    const from = accounts[0];
    provider.send('eth_signTypedData', [from, msgParams]).then(response => {
      console.log("Success! Response: " + response);
      alert(`Signed data: ${response}`);
    }).catch(err => {
      console.error('Error signing: ' + err);
    });
  }).catch(err => {
    console.error('Error getting accounts: '+ err);
  });

}
