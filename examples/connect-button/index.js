document.addEventListener("DOMContentLoaded", function(){
  window.bitski.getConnectButton(document.querySelector('#small-button-container'), undefined, 0);
  window.bitski.getConnectButton(document.querySelector('#medium-button-container'), undefined, 1);
  window.bitski.getConnectButton(document.querySelector('#large-button-container'), undefined, 2);

  var defaultButton = window.bitski.getConnectButton();
  document.body.appendChild(defaultButton.element);
});
