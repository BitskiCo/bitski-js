## Bitski.js

`Current version: 0.0.7`

Bitski JS SDK is a JavaScript library that connects your DApp with a user, a wallet, and a connection to the Ethereum blockchain (currently Kovan TestNet only).

### Getting Started

You’ll first need a client id token from us. If you’re interested in getting one, please [Contact Us](https://bitski.co).

### Installation

You can easily get started by adding this script tag to your app’s `<head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/bitski@0.0.7/lib/bitski.js"></script>
```

Then, where you would normally check for Web3, you can run the Bitski SDK instead of falling back to displaying Metamask installation instructions:

```javascript
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  const bitskiInstance = new bitski.Bitski('<YOUR-CLIENT-ID>');
  web3 = bitskiInstance.getWeb3();
  bitskiInstance.signIn();
}
```

Alternatively you can use our connect button:

```javascript
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
    const bitskiInstance = new bitski.Bitski('<YOUR-CLIENT-ID>');
    const connectButton = bitskiInstance.getConnectButton();
    connectButton.completion = function(web3, error, user) {
      window.web3 = web3;
      document.body.removeChild(connectButton.element);
    }
    document.body.appendChild(connectButton.element);
}
```

You can also require your users to use a Bitski wallet & account by setting `window.web3` without the check, which should override any existing Metamask or DApp browser providers.

```javascript
const bitskiInstance = new bitski.Bitski('<YOUR-CLIENT-ID>');
web3 = bitskiInstance.getWeb3();
```

### More Info
* [Usage](usage.md)
* [Examples](examples.md)
* [API Reference](api/index.md)
* [Contact Us](http://bitski.co)
