document.addEventListener("DOMContentLoaded", function(){
  window.bitski.getConnectButton(document.querySelector('#small-button-container'), undefined, 0);
  window.bitski.getConnectButton(document.querySelector('#medium-button-container'), undefined, 1);
  window.bitski.getConnectButton(document.querySelector('#large-button-container'), undefined, 2);
  
  if (window.opener) {
    window.bitski.signInCallback(2).then(console.log).catch(console.error);
  }

  var defaultButton = window.bitski.getConnectButton();
  defaultButton.callback = function(error, user){
    if(user) {
      console.log("Signed in!: " + JSON.stringify(user.access_token));
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
  document.body.appendChild(defaultButton.element);
});
