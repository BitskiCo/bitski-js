## Bitski JS SDK

[![npm](https://img.shields.io/npm/v/bitski.svg)](https://www.npmjs.com/package/bitski)

The official Javascript SDK for Bitski. Bitski connects your DApp with a user, a wallet, and a connection to the Ethereum blockchain.

We currently support mainnet, as well as Kovan and Rinkeby test networks.

### Getting Started

In order to use Bitski you will need a client id. You can set one up by visiting the [Developer Portal](https://developer.bitski.com) and creating an app.

Note: While we're in beta, your app will need to be approved before you can actually use your client id to sign in.

### Installation

To use Bitski in your app you will need to install our npm package:

```bash
npm install --save bitski
```

Alternatively you can add this script tag to your app’s `<head>`:

```html
<script src="https://cdn.jsdelivr.net/npm/bitski@0.1.11/lib/bitski.js"></script>
```

### Starting the SDK

Where you would normally check for Web3, you can now run the Bitski SDK instead of falling back to displaying Metamask installation instructions. There are two steps to starting the SDK: Creating a bitski instance, and signing in.

#### Creating the instance

Starting the SDK is as simple as creating a Bitski object with your new client id.

```javascript
import { Bitski } from 'bitski';
const bitskiInstance = new Bitski('<YOUR-CLIENT-ID>');
```

Or, if you are using the CDN version:

```javascript
// SDK is imported into the global namespace as bitski
const bitskiInstance = new bitski.Bitski('<YOUR-CLIENT-ID>');
```

#### Getting a Web3 instance

Once the SDK is initialized, you can request a Web3 object. Bitski will automatically configure the Web3 object to work with our servers. You can also pass a network name as a parameter to access test networks (rinkeby or kovan).

```javascript
//mainnet
web3 = bitskiInstance.getWeb3();
//rinkeby
web3 = bitskiInstance.getWeb3('rinkeby');
//local dev (ganache / truffle develop)
web3 = bitskiInstance.getWeb3('http://localhost:9545');
```

Note: our CDN version bundles the full web3 library just like Metamask and other dapp browsers. There is no need to also bundle web3.

### Signing in

In order to do anything with your web3 instance you'll need the user to be signed in with Bitski via OAuth. We support two primary methods for signing in with Bitski: redirect, and popup.

#### Signing in with redirect

For the redirect flow, the browser will redirect to the bitski login page where the user will be asked to log in / sign up, and then approve access to your app, which will then redirect back to your app with an access token in the url. To use this flow, simply call `getUserOrSignIn()`:

```javascript
// my-app.js
const bitskiInstance = new bitski.Bitski('<YOUR-CLIENT-ID>');
window.web3 = bitskiInstance.getWeb3();
//This will only redirect you if you're not already logged in
bitskiInstance.getUserOrSignIn();
```

Then, when the user is redirected, initialize Bitski again, and call the sign in callback. This completes the cycle by telling the Bitski SDK to check for an access token.

```javascript
// my-app-callback.js
const bitskiInstance = new bitski.Bitski('<YOUR-CLIENT-ID>');
bitskiInstance.signInCallback();
```

#### Signing in with popup

For the popup flow, the browser will open a small popup window where the user can log in / sign up, and then approve access to your app, which will post back to your window and remove the popup. In order for the popup window to properly open in most browsers, this needs to be triggered with a click action. For your convenenience, we've included a standard login button that can do just that.

```html
<!-- my-app.html -->
<div id="bitski-button"></div>
```

```javascript
// my-app.js
import { Bitski } from 'bitski';
const bitskiInstance = new Bitski('<YOUR-CLIENT-ID>');
window.web3 = bitskiInstance.getWeb3('kovan');
document.addEventListener('DOMContentLoaded', function() {
  bitskiInstance.getUser().then(user => {
    if (user && !user.expired) {
      //already logged in
    } else {
      const containerElement = document.querySelector('#bitski-button');
      const connectButton = bitskiInstance.getConnectButton(containerElement);
      connectButton.completion = function(error, user) {
        containerElement.removeChild(connectButton.element);
      }
    }
  });
});
```

#### Manually triggering sign in

You can also manually trigger log in via popup or redirect by calling `signIn()` directly:

```javascript
import { Bitski, OAuthProviderIntegrationType } from 'bitski';

const bitskiInstance = new Bitski('<YOUR-CLIENT-ID>');
web3 = bitskiInstance.getWeb3();

// later in your code…
bitskiInstance.signIn(OAuthProviderIntegrationType.POPUP).then((user) => {
  // logged in
});
```

### Interaction with other Dapp browsers

The last step is to consider the experience you want for users of Metamask and other dapp browsers. For maximum compatibility with other providers, simply check for the existence of web3 before configuring bitski.

```javascript
if (typeof web3 !== 'undefined') {
  // fallback to version provided by dapp browser
  web3 = new Web3(web3.currentProvider);
} else {
  // initialize Bitski
  const bitskiInstance = new bitski.Bitski('<YOUR-CLIENT-ID>');
  web3 = bitskiInstance.getWeb3();
}
```

You can also require your users to use a Bitski wallet & account by storing your instance of web3 somewhere else in the global namespace, which should override any existing Metamask or DApp browser providers.

```javascript
const bitskiInstance = new bitski.Bitski('<YOUR-CLIENT-ID>');
window.web3 = bitskiInstance.getWeb3();
```

### Example App

Want to see Bitski in action? You can check out a [full demo app using our SDK](https://example-dapp-1.bitski.com) and [view the demo's source code](https://github.com/BitskiCo/example-dapp-game).
