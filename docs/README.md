## Bitski JS SDK

[![npm](https://img.shields.io/npm/v/bitski.svg)](https://www.npmjs.com/package/bitski)

The official Javascript SDK for Bitski. Bitski connects your DApp with a user, a wallet, and a connection to the Ethereum blockchain.

We currently support mainnet, as well as Kovan and Rinkeby test networks.

### Getting Started

In order to use Bitski you will need a client id. You can set one up by visiting the [Developer Portal](https://developer.bitski.com) and creating an app.

### Installation

To use Bitski in your app you will need to install our npm package:

```bash
npm install --save bitski
```

You can also install our beta version to get the latest features.

```bash
npm install --save bitski@beta
```

Alternatively you can add this script tag to your app’s `<head>`:

```html
<script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js/dist/web3.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bitski@0.1.11/dist/lib/bitski.js"></script>
```

### Starting the SDK

Where you would normally check for Web3, you can now run the Bitski SDK instead of falling back to displaying Metamask installation instructions. There are two steps to starting the SDK: Creating a bitski instance, and signing in.

#### Creating the instance

Starting the SDK is as simple as creating a Bitski object with your new client id and your redirect url. Please note that your redirect url entered here must exactly match what you entered for your app's redirect urls in the Bitski developer portal.

```javascript
import { Bitski } from 'bitski';
const bitskiInstance = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
```

Or, if you are using the CDN version:

```javascript
// SDK is imported into the global namespace as bitski
const bitskiInstance = new bitski.Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
```

### Signing in

In order to do anything with your web3 instance you'll need the user to be signed in with Bitski via OAuth. We support two primary methods for signing in with Bitski: redirect, and popup.

Since the user could already be logged in to your dapp, you should start by calling `getUser()` to check the logged in state.

```javascript
bitskiInstance.getUser().then(user => {
  if (user && !user.expired) {
    // setup web3 and continue with your app
  } else {
    // handle logged out state
  }
}).catch(err => {
  // handle logged out state
});
```

If the user is not logged in, you should then give the option to sign in.

#### Signing in with popup

For the popup flow, the browser will open a small popup window where the user can log in / sign up, and then approve access to your app, which will redirect to the URL you pass with an access token.

In that redirect url page, you will initialize Bitski again, and call the `signInCallback` method, which will post back to your main window with the access token, and remove the popup.

_Note: In order for the popup window to properly open in most browsers, this needs to be triggered with a click action. For your convenenience, we've included a standard login button that handles that for you._

```html
<!-- my-app.html -->
<div id="bitski-button"></div>
```

```javascript
// my-app.js
import { Bitski } from 'bitski';
const bitskiInstance = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL'>);

window.addEventListener('load', () => {
  //Check if we are logged in
  bitskiInstance.getUser().then(user => {
    if (user && !user.expired) {
      //already logged in
      window.web3 = new Web3(bitskiInstance.getProvider());
      // Proceed with app
    } else {
      //create the connect button
      const containerElement = document.querySelector('#bitski-button');
      const connectButton = bitskiInstance.getConnectButton(containerElement);
      connectButton.callback = function(error, user) {
        containerElement.removeChild(connectButton.element);
        //Logged in!
        window.web3 = new Web3(bitskiInstance.getProvider());
        // Proceed with app
      }
    }
  });
});
```

Make sure to also call the callback when redirected to the callback page. This page will be rendered inside of the popup window, and will tell the main window that we are logged in.

```javascript
// my-app-callback.js
import { Bitski } from 'bitski';
const bitskiInstance = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL'>);
bitskiInstance.signInCallback();
```

In general it's a good idea to keep this page looking pretty blank, otherwise it could look strange inside the popup.

#### Signing in with redirect

For the redirect flow, the browser will redirect to the bitski login page where the user will be asked to log in / sign up, and then approve access to your app, which will then redirect back to your redirect url with an access token in the url.

After login, the user is redirected to the URL you passed with an access token in the parameters. To process the sign in request, initialize Bitski again, and call the sign in callback. This completes the cycle by telling the Bitski SDK to check for an access token.

Generally, for the redirect flow, it makes sense to make the redirect page be the main page of your app with a query param to indicate that the user has been redirected. Something like `http://my-dapp.com/app?callback=true` could work nicely.

An example of how this might work could be the following:

```javascript
// my-app.js
import { Bitski } from 'bitski';
import Web3 from 'web3';

// create instance
const bitskiInstance = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');

// check if you've received the callback
if (window.location.href.includes('callback=true')) {
  bitskiInstance.signInCallback();
  const provider = bitskiInstance.getProvider();
  const web3 = new Web3(provider);
  // proceed with app
} else {
  // not on the callback page, check if logged in (will redirect if not logged in)
  bitskiInstance.getUser().then(user => {
    if (user && !user.expired) {
      // logged in
      const provider = bitskiInstance.getProvider();
      const web3 = new Web3(provider);
      //proceed with app
    } else {
      //ideally you would trigger this from a sign in button instead
      bitskiInstance.signIn();
    }
  });
}
```

#### Manually triggering sign in

You can also manually trigger log in via popup or redirect by calling `signIn()` directly:

```javascript
import { Bitski, OAuthProviderIntegrationType } from 'bitski';

const bitskiInstance = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
var bitskiProvider = bitskiInstance.getProvider();
web3 = new Web3(bitskiProvider);

// later in your code…
bitskiInstance.signIn(OAuthProviderIntegrationType.POPUP).then((user) => {
  // logged in
});
```

#### Getting a Web3 instance

Once the SDK is initialized and logged in, you can request a Web3 provider. Bitski will automatically configure the Web3 provider to work with our servers. You can also pass a network name as a parameter to access test networks (rinkeby or kovan).

```javascript
//mainnet
var bitskiProvider = bitskiInstance.getProvider();
//rinkeby
var bitskiProvider = bitskiInstance.getProvider('rinkeby');
//local dev (ganache / truffle develop)
var bitskiProvider = bitskiInstance.getProvider('http://localhost:9545');

window.web3 = new Web3(bitskiProvider);
```

### Interaction with other Dapp browsers

The last step is to consider the experience you want for users of Metamask and other dapp browsers. For maximum compatibility with other providers, simply check for the existence of web3 before configuring bitski.

```javascript
if (typeof web3 !== 'undefined') {
  // fallback to version provided by dapp browser
  web3 = new Web3(web3.currentProvider);
} else {
  // initialize Bitski
  const bitskiInstance = new bitski.Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
  var bitskiProvider = bitskiInstance.getProvider();
  web3 = new Web3(bitskiProvider);
}
```

You can also require your users to use a Bitski wallet & account by storing your instance of web3 somewhere else in the global namespace, which should override any existing Metamask or DApp browser providers.

```javascript
const bitskiInstance = new bitski.Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
var bitskiProvider = bitskiInstance.getProvider();
window.web3 = new Web3(bitskiProvider);
```

### Sign Out

If you'd like to offer the ability to sign out of your dapp, you can use the `signOut()` method. This will keep the user logged in on Bitski.com as well as other dapps, but will remove your cached logged in state.

```javascript
bitskiInstance.signOut().then(() => {
  //signed out!
});
```

### Example App

Want to see Bitski in action? You can check out a [full demo app using our SDK](https://example-dapp-1.bitski.com) and [view the demo's source code](https://github.com/BitskiCo/example-dapp-game).
