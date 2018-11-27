window.addEventListener("load", function(){
  // Create small button
  window.bitski.getConnectButton({ container: document.querySelector('#small-button-container'), size: 'SMALL' });

  // Create medium button
  window.bitski.getConnectButton({ container: document.querySelector('#medium-button-container'), size: 'MEDIUM' });

  // Create large button
  window.bitski.getConnectButton({ container: document.querySelector('#large-button-container'), size: 'LARGE' });

  var defaultButton = window.bitski.getConnectButton();

  defaultButton.callback = function(error, user){
    if(user) {
      console.log("Signed in!");
      console.log(user.profile);
      window.web3.eth.getAccounts().then((accounts) => {
        var account = accounts[0];
        console.log("Getting balance for " + account);
        return window.web3.eth.getBalance(account);
      }).then((balance) => {
        console.log("Balance: " + balance);
      }).catch((error) => {
        console.error("Error: " + error);
      });
    }

    if (error) {
      console.error("Error signing in: " + error);
    }
  };

  document.querySelector('#default-button').appendChild(defaultButton.element);
});
