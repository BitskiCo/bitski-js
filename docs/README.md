## Bitski JS SDK

[![npm](https://img.shields.io/npm/v/bitski.svg)](https://www.npmjs.com/package/bitski)

The official Bitski Javascript SDK for the browser. Bitski connects your DApp with a user, a wallet, and a connection to the Ethereum blockchain. We currently support mainnet, as well as Kovan and Rinkeby test networks.

### Packages

This repo consists of 2 packages:

- [`bitski`](https://github.com/BitskiCo/bitski-js/tree/master/packages/browser): The bitski javascript browser SDK
- [`bitski-provider`](https://github.com/BitskiCo/bitski-js/tree/master/packages/provider): A shared core provider component used in both browser and server SDKs.

If you are using Node, you should use our [`bitski-node`](https://github.com/BitskiCo/bitski-node) package instead.

### Example App

Want to see Bitski in action? You can check out a [full demo app using our SDK](https://example-dapp-1.bitski.com) and [view the demo's source code](https://github.com/BitskiCo/example-dapp-game).

### Basic Usage

A very simple integration of the Bitski would look something like this.

```javascript
import { Bitski } from 'bitski';
import Web3 from 'web3';

const bitski = new Bitski('CLIENT-ID', 'https://myapp.com/callback.html');

const provider = bitski.getProvider();
const web3 = new Web3(provider);

// public calls are always available
const network = await web3.eth.getBlockNumber();

// connect via oauth to use the wallet (call this from a click handler)
await bitski.start();

// now you can get accounts
const accounts = await web3.eth.getAccounts();

// and submit transactions for the user to approve
const txn = await web3.eth.sendTransaction({
  from: accounts[0],
  to: '...',
  value: web3.utils.toWei('1')
});
```

See below for detailed info on setting up your client id, callback page, and signing in.

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
<script src="https://cdn.jsdelivr.net/npm/bitski@0.2.0-beta.14/dist/bitski.bundle.js"></script>
```

### Starting the SDK

Where you would normally check for an ethereum provider, you can now run the Bitski SDK instead of falling back to displaying Metamask installation instructions. There are two steps to starting the SDK: Creating a bitski instance, and getting a provider.

Starting the SDK is as simple as creating a Bitski object with your new client id and your redirect url. Please note that your redirect url entered here must exactly match what you entered for your app's redirect urls in the Bitski developer portal.

```javascript
import { Bitski } from 'bitski';
const bitski = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
```

Or, if you are using the CDN version:

```javascript
// SDK is imported into the global namespace as Bitski
const bitski = new Bitski.Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
```

### Getting a provider

Once the SDK is initialized you can get a web3 provider and start making requests.

```javascript
const provider = bitski.getProvider();
const web3 = new Web3(provider);

const network = await web3.eth.net.getId();
```

To use a different network pass in a network name ("rinkeby", "kovan") as the first argument.

```javascript
const provider = bitski.getProvider("rinkeby");
```

To use in a dev environment with a local test net, pass in your RPC url:

```javascript
const provider = bitski.getProvider("http://localhost:9545");
```

### Authentication status

In order to get access to the user's wallet you need to sign in the provider. Typically this is done as a separate popup over your app, but you can also use a redirect flow if you'd prefer.

First, check the login status to see if you need to sign in or if the user is already signed in from a previous session.

```javascript
bitski.getAuthStatus().then(status => {
  if (status === AuthenticationStatus.Connected) {
    // logged in already!
  } else {
    // show connect button
  }
});
```

There are 3 possible values:

- *Connected*: The user has an active access token. No action is needed.
- *Expired*: The user has previously logged in but does not have an access token.
- *NotConnected*: The user has not signed in before.

If the status is Approved or NotConnected, you need to call either `start()` or `signIn()` to use wallet features.

### Signing in

#### Implementing the callback

Our login flow uses OAuth2 to approve your app and pass it an access token on behalf of the current user. In order to receive that access token, you need to setup a callback page. The easiest way to do this is to use our static [callback.html](https://github.com/BitskiCo/bitski-js/blob/develop/callback.html) file.

1. Copy [callback.html](https://github.com/BitskiCo/bitski-js/blob/develop/callback.html) somewhere on your domain
2. Add the URL to this html file to your app's authorized redirect urls in the Bitski [Developer Portal](https://developer.bitski.com)

If you would prefer to manually handle the callback in your app:

1. Create a dedicated route for this purpose (keep in mind that this is the page that will be rendered inside of the popup, so keep the elements on the page to a minimum).
2. Add the URL to this route to your app's authorized redirect urls in the Bitski [Developer Portal](https://developer.bitski.com).
3. When this route is loaded run the following code:

```javascript
import { Bitski } from 'bitski';
const bitski = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
bitski.callback();
```

_Note: The access token will be passed as a hash on the url (ie. #token=blah), which may conflict with existing hash-based navigation your app may be doing._


#### Triggering sign in

When you want to prompt the user to sign in simply call `start()` or `signIn()` from inside a click handler, or use our dedicated connect button. If you call `start()` the SDK will attempt to sign in silently if possible, while `signIn()` will always trigger the popup.
The browser will open a small popup window where the user can log in / sign up, and then approve access to your app, which will redirect to your callback page with the access token.

```javascript
myBtn.addEventHandler('click', () => {
  bitski.start().then(() => {
    //signed in!
  });
});
```

_Note: In order for the popup window to properly open in most browsers, this needs to be triggered with a click action. For your convenenience, we've included a standard login button that handles that for you._

#### Using the Bitski connect button

For your convenience we provide a connect button that you can drop into your page that will trigger the sign in behavior automatically. Here's an example of how you might set that up:

```html
<!-- my-app.html -->
<div id="bitski-button"></div>
```

```javascript
// my-app.js
import { Bitski, AuthenticationStatus } from 'bitski';
import Web3 from 'web3';

const bitski = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL'>);
const web3 = new Web3(bitski.getProvider());

function checkAuthStatus() {
  //Check if we are logged in
  bitski.getAuthStatus().then(status => {
    if (status == AuthenticationStatus.Connected) {
      //already logged in
      continueToApp();
    } else {
      //create the connect button
      const containerElement = document.querySelector('#bitski-button');
      const connectButton = bitski.getConnectButton({ container: containerElement });
      connectButton.callback = function(error, user) {
        //Logged in!
        connectButton.remove();
        continueToApp();
      }
    }
  });
}

window.addEventListener('load', () => {
  checkAuthStatus();
});
```

#### Signing in with redirect

If you would prefer to login in the same window as your app you can use the redirect flow. For the redirect flow, the browser will navigate to the bitski login page where the user will be asked to log in / sign up, and then approve access to your app, which will then redirect back to your redirect url with an access token in the url.

After login, the user is redirected to the URL you passed with an access token in the parameters. To process the sign in request, initialize Bitski again, and call the sign in callback. This completes the cycle by telling the Bitski SDK to check for an access token.

Generally, for the redirect flow, it makes sense to make the redirect page be the main logged in page of your app. For example `https://my-dapp.com/` would have a login button and `https://my-dapp.com/app/` would be your logged in version of the app.

An example of how this might work could be the following:

```javascript
// index.js
import { Bitski } from 'bitski';

// create instance
const bitski = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');

// call signInRedirect from some click handler
document.querySelector('#sign-in').addEventHandler('click', () => {
  bitski.signInRedirect('https://my-dapp.com/app/');
});
```

```javascript
// app.js
import { Bitski } from 'bitski';
import Web3 from 'web3';

// create instance
const bitski = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
const provider = bitski.getProvider();
const web3 = new Web3(provider);

// call the callback to validate save your access token
bitski.redirectCallback().then(() => {
  // fully logged in and ready to use the wallet
}).catch(error => {
  // handle errors from login flow
});
```


### Sign Out

If you'd like to offer the ability to sign out of your dapp, you can use the `signOut()` method. This will keep the user logged in on Bitski.com as well as other dapps, but will remove your cached logged in state.

```javascript
bitski.signOut().then(() => {
  //signed out!
});
```

### Interaction with other wallets

The last step is to consider how you want to handle wallet choice. With Bitski you can offer the choice between a built in provider (Metamask, Toshi, or other dapp browsers) and a Bitski wallet.
Simply checking for the presence of a built in provider may not offer your users enough choice. Consider the case where a user has both Metamask installed and a Bitski wallet. They may want to use
different wallets with different apps. Here are a few approaches you can take:

#### 1. Offer choice if other provider detected (recommended)

In this scenario, you would show a Bitski connect button and a "Use Existing Provider" button. This gives the user control over what accounts to use while not overwhelming crypto newcomers with choice.

```html
<!-- login.html -->
<div id="login-bitski"></div>
<a id="login-injected" style="display: none;" href="#">Use Existing Provider</a>
```

```javascript
// login.js
const bitski = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');

function continueToApp(provider) {
  web3 = new Web3(provider);
  // continue!
}

window.addEventListener('load', () => {
  const useExistingBtn = document.querySelector('#login-injected');
  const useBitskiBtn = document.querySelector('#login-bitski');

  // inject bitski connect button
  const connectBtn = bitski.getConnectButton({ container: useBitskiBtn });

  // set bitski post-login callback
  connectBtn.callback = function() {
    continueToApp(bitski.getProvider());
  }

  if (window.ethereum) {
    // Show use existing button
    useExistingBtn.style.display = 'block';

    // Add action
    useExistingBtn.addEventListener('click', () => {
      window.ethereum.enable().then(() => {
        continueToApp(window.ethereum);
      });
    });
  }
});
```

#### 2. Always offer choice

In this scenario, when you get to the point where you need a wallet to continue in your app, you can offer the choice between Bitski and other providers, whether an injected provider is available or not.
You would show a Bitski connect button along side either a download button (if no injected provider) or continue button for each solution you want to promote.

```html
<!-- login.html -->
<div id="login-bitski"></div>
<a id="download-mm" href="#" target="_blank">Download Metamask</a>
<a id="login-injected" style="display: none;" href="#">Use Existing Provider</a>
```

```javascript
// login.js
const bitski = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');

function continueToApp(provider) {
  web3 = new Web3(provider);
  // continue!
}

window.addEventListener('load', () => {
  const useExistingBtn = document.querySelector('#login-injected');
  const useBitskiBtn = document.querySelector('#login-bitski');
  const downloadMMBtn = document.querySelector('#download-mm');

  // inject bitski connect button
  const connectBtn = bitski.getConnectButton({ container: useBitskiBtn });

  // set bitski post-login callback
  connectBtn.callback = function() {
    continueToApp(bitski.getProvider());
  }

  if (window.ethereum) {
    // Show use existing button
    downloadMMBtn.style.display = 'none';
    useExistingBtn.style.display = 'block';

    // Add action
    useExistingBtn.addEventListener('click', () => {
      window.ethereum.enable().then(() => {
        continueToApp(window.ethereum);
      });
    });
  }
});
```

#### 3. Require Bitski

In some circumstances it might make sense to require a particular wallet. For example, maybe your dapp needs to be used in a native or cross-platform context. In these cases, you can
simply ignore any injected providers and use Bitski.

```javascript
const bitski = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
var bitskiProvider = bitski.getProvider();
const web3 = new Web3(bitskiProvider);
```

#### 4. Fallback to Bitski (not recommended)

In this case, you would use an injected provider if available, otherwise show Bitski. The problem with this approach is that people who use both Bitski and other wallets will not have the option to use Bitski.

```javascript
if (window.ethereum) {
  // fallback to version provided by dapp browser
  web3 = new Web3(window.ethereum);
} else {
  // initialize Bitski
  const bitski = new Bitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
  var bitskiProvider = bitski.getProvider();
  window.web3 = new Web3(bitskiProvider);
}
```
