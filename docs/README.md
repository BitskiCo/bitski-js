## Bitski.js

`Current version: 0.0.1`

Bitski JS SDK is a JavaScript library that connects your DApp with a user, a wallet, and a connection to the Ethereum blockchain (currently Kovan TestNet only).

### Getting Started

You’ll first need a client id token from us. If you’re interested in getting one, please [Contact Us](https://bitski.co).

### Installation

You can easily get started by adding these two script tags to your app’s `<head>`:

```html
<script src="https://rawgit.com/IdentityModel/oidc-client-js/dev/dist/oidc-client.js"></script>
<script src="https://rawgit.com/OutThereLabs/bitski-js-sdk/master/lib/bitski.js"></script>
```
_Note: We will be moving to a dedicated CDN soon._

Then, where you would normally check for Web3, you can run the Bitski SDK instead of falling back to displaying Metamask installation instructions:

```javascript
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = bitski.InitializeWeb3('<YOUR-CLIENT-ID>');
}
```

Alternatively you can use our login button:

```javascript
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
    var loginButton = new bitski.LoginButton('F3YKmUz8wJPevbjd0LJOfSTkg4IiwWlcypE6AdBXweui1lhjC1kcGDgBCub35QkO');
    loginButton.completion = function(web3, error, user) {
      window.web3 = web3;
      document.body.removeChild(loginButton.element);
    }
    document.body.appendChild(loginButton.element);
}
```

You can also require your users to use a Bitski wallet & account by setting `window.web3` without the check, which should override any existing Metamask or DApp browser providers.

```javascript
web3 = bitski.InitializeWeb3('<YOUR-CLIENT-ID>');
```

### More Info
* [Usage](usage.md)
* [Examples](examples.md)
* [API Reference](api/index.md)
* [Contact Us](http://bitski.co)
