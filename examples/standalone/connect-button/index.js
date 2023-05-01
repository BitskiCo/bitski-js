window.addEventListener("load", function(){
  // Create small button
  window.bitski.getConnectButton({ container: document.querySelector('#small-button-container'), size: 'SMALL' }, callback);

  // Create medium button
  window.bitski.getConnectButton({ container: document.querySelector('#medium-button-container'), size: 'MEDIUM' }, callback);

  // Create large button
  window.bitski.getConnectButton({ container: document.querySelector('#large-button-container'), size: 'LARGE' }, callback);

  var defaultButton = window.bitski.getConnectButton();
  defaultButton.callback = callback;

  document.querySelector('#default-button').appendChild(defaultButton.element);
});

function callback(error, user) {
  if(user) {
    window.web3.eth.getAccounts().then((accounts) => {
      var account = accounts[0];
      console.log("Getting balance for " + account);
      return window.web3.eth.getBalance(account);
    }).then((balance) => {
      alert('Signed in! Current balance: ' + balance);
      return window.bitski.signOut();
    }).catch((error) => {
      console.error("Error: " + error);
    });
  }

  if (error) {
    console.error("Error signing in: " + error);
  }
}
