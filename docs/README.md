## Bitski JS SDK

[![npm](https://img.shields.io/npm/v/bitski.svg)](https://www.npmjs.com/package/bitski)

The official Bitski Javascript SDK for the browser. Bitski connects your DApp with a user, a wallet, and a connection to the Ethereum blockchain. We currently support mainnet for Ethereum and Polygon, and Rinkeby and Mumbai test networks respectively.

*Note: These docs are for version 0.4.x. Upgrading from 0.3.x or earlier? Please see our [Migration Guide](https://github.com/BitskiCo/bitski-js/tree/develop/MIGRATING.md)*


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
import { createBitski } from 'bitski';
import Web3 from 'web3';

const bitski = await createBitski('CLIENT-ID', 'https://myapp.com/callback.html');

const provider = bitski?.getProvider();
const web3 = new Web3(provider);

// public calls are always available
const network = await web3.eth.getBlockNumber();

// connect via oauth to use the wallet (call this from a click handler)
await bitski.signIn();

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

### Starting the SDK

Where you would normally check for an ethereum provider, you can now run the Bitski SDK instead of falling back to displaying Metamask installation instructions. There are two steps to starting the SDK: Creating a bitski instance, and getting a provider.

Starting the SDK is as simple as creating a Bitski object with your new client id and your redirect url. Please note that your redirect url entered here must exactly match what you entered for your app's redirect urls in the Bitski developer portal.

Note: In Node and other environments without access to `window`, `createBitski` will return `null` instead of a Bitski instance. This allows you to include the SDK in isomorphic server-side code without causing errors.

```javascript
import { createBitski } from 'bitski';
const bitski = await createBitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
```

#### Customizing OAuth scopes

By default the SDK will request 'openid' (required), and 'offline' scopes. Offline is used to obtain a refresh token, which will allow you to request access tokens in the future without displaying a popup. There are additional possible scopes that you can request. See [our documentation](https://docs.bitski.com) for more information.

To customize the scopes your app will request, pass them as an array during initialization. Note that 'openid' is always implicitly requested, and that if you customize this list, you should remember to add 'offline' unless you don't want to receive a refresh token.

```javascript
const bitski = await createBitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>', ['offline', 'email']);
```

### Getting a provider

Once the SDK is initialized you can get a web3 provider and start making requests. Our provider is highly optimized, and supports subscriptions by default.

```javascript
const provider = bitski.getProvider();
const web3 = new Web3(provider);

const network = await web3.eth.net.getId();
```

Unlike Metamask and other dapp browsers, you can request a provider for the network you are on. To use a different network pass in a network name ("rinkeby", "polygon", "mumbai") in the options as the first argument.

```javascript
const provider = bitski.getProvider({ networkName: 'rinkeby' });
```

To use a Bitski wallet with a custom chain, you can create a network configuration and pass that in:

```javascript
const network = {
  rpcUrl: 'http://localhost:9545',
  chainId: 9,
}
const provider = bitski.getProvider({ network: network });
```

This works great for development blockchains, sidechains, and more.

### Authentication status

While you can make public blockchain requests without being signed in, in order to get access to the user's wallet you need to have the user sign in and acquire an access token.

If you attempt to make a request like `eth_accounts` when the user hasn't logged in yet, you'll receive an error.

```javascript
const accounts = await web3.eth.getAccounts();
// AuthenticationError Code=1000 Message="Not signed in"
```

#### Checking Authentication Status

First, check the login status to see if you need to sign in or if the user is already signed in from a previous session.

There are 3 possible values:

- *Connected*: The user has an active access token. No action is needed.
- *Expired*: The user is signed in but needs a fresh access token.
- *NotConnected*: The user has not signed in before.

If the status is NotConnected, the user will have to sign in before you can access their accounts, or request their signature. This is the primary state that you need to handle. For more on signing in, see the next section.

```javascript
if (bitski.authStatus === AuthenticationStatus.NotConnected) {
  // Show connect button or use your own button and call bitski.signIn()
}
```

If the status is Expired, that means you have a refresh token available, which can be used to acquire a fresh access token without prompting the user to sign in again. By default, when a request that requires an access token is made, the provider will attempt to get a new access token for you.

```javascript
const accounts = await web3.eth.getAccounts();
// Provider will check authStatus
// If expired, it will attempt to refresh, then perform the request
```

If you want to handle this request yourself, try the following:

```javascript
if (bitski.authStatus === AuthenticationStatus.Expired) {
  // Call connect, which will refresh the access token
  await bitski.connect();
  // Continue with your app
}
```

### Signing in

#### Implementing the callback

Our login flow uses OAuth2 to approve your app and pass it an access token on behalf of the current user. In order to receive that access token, you need to setup a callback page. The easiest way to do this is to use our static [callback.html](https://github.com/BitskiCo/bitski-js/blob/main/packages/browser/callback.html) file.

1. Copy [callback.html](https://github.com/BitskiCo/bitski-js/blob/main/packages/browser/callback.html) somewhere on your domain
2. Add the URL to this html file to your app's authorized redirect urls in the Bitski [Developer Portal](https://developer.bitski.com)

If you would prefer to manually handle the callback in your app:

1. Create a dedicated route for this purpose (keep in mind that this is the page that will be rendered inside of the popup, so keep the elements on the page to a minimum).
2. Add the URL to this route to your app's authorized redirect urls in the Bitski [Developer Portal](https://developer.bitski.com).
3. When this route is loaded run the following code:

```javascript
import { popupCallback } from 'bitski';
// Sends a message to the parent window with the access token and dismisses the popup
popupCallback();
```

_Note: The access token may be passed as a hash on the url (ie. #token=blah), which may conflict with existing hash-based navigation your app may be doing._


#### Triggering sign in

When you want to prompt the user to sign in simply call `signIn()` from inside a click handler, or use our dedicated connect button.
The browser will open a small popup window where the user can log in / sign up, and then approve access to your app, which will redirect to your callback page with the access token.

```javascript
import { AuthenticationErrorCode } from 'bitski';

myBtn.addEventHandler('click', () => {
  bitski.signIn().then(() => {
    //signed in!
  }).catch((error) => {
    if (error.code === AuthenticationErrorCode.UserCancelled) {
      // ignore error
    } else {
      // display error
    }
  });
});
```

The `signIn()` method also allows you to specify that you would like Bitski to default to the "sign up" form instead of the "log in" form. You can trigger this behavior like this:

```javascript
import { LOGIN_HINT_SIGNUP } from 'bitski';

bitski.signIn({ login_hint: LOGIN_HINT_SIGNUP }).then(/* ... */);
```

_Note: In order for the popup window to properly open in most browsers, this needs to be triggered with a click action. For your convenience, we've included a standard login button that handles that for you._

#### Using the Bitski connect button

For your convenience we provide a connect button that you can drop into your page that will trigger the sign in behavior automatically when clicked.

```
const btnInstance = bitski.getConnectButton([options][, callback]);
```

Here's an example of how you might set that up:
```html
<!-- my-app.html -->
<div id="bitski-button"></div>
```

```javascript
// my-app.js
import { createBitski, AuthenticationStatus } from 'bitski';
import Web3 from 'web3';

const bitski = await createBitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL'>);
const web3 = new Web3(bitski.getProvider());

function checkAuthStatus() {
  //Check if we are logged in
  if (bitski.authStatus === AuthenticationStatus.NotConnected) {
    //create the connect button
    const containerElement = document.querySelector('#bitski-button');
    const connectButton = bitski.getConnectButton({ container: containerElement });
    connectButton.callback = (error, user) => {
      if (error) {
        // Handle errors
        return;
      }
      //Logged in!
      connectButton.remove();
      continueToApp();
    };
    // Optionally handle cancellation
    connectButton.onCancel = () => {
      // Will be called when the user clicks sign in, but dismisses popup
    };
  } else {
    //already logged in
    continueToApp();
  }
}

window.addEventListener('load', () => {
  checkAuthStatus();
});
```

There are a few options you can pass in. These are not required, but allow you to customize the experience:

- container: An HTML element that you want to inject the button into. If you don't pass anything in you can inject it yourself by accessing the button's element key.
- size: The size of the button. 'SMALL', 'MEDIUM', or 'LARGE'. Default is 'MEDIUM'.
- authMethod: The sign in method to use. 'POPUP' or 'REDIRECT'. Default is 'POPUP'.
- signInOptions: The options to pass during the sign in request (currently, only login_hint is supported. See above.)

Note that the `callback` will be called for either successful or failed login attempts. To handle the case where the user cancels part way through, set the `onCancel` handler.

#### Signing in with redirect

If you would prefer to login in the same window as your app you can use the redirect flow. For the redirect flow, the browser will navigate to the bitski login page where the user will be asked to log in / sign up, and then approve access to your app, which will then redirect back to your redirect url with an access token in the url.

After login, the user is redirected to the URL you passed with an access token in the parameters. To process the sign in request, initialize Bitski again, and call the sign in callback. This completes the cycle by telling the Bitski SDK to check for an access token.

Generally, for the redirect flow, it makes sense to make the redirect page be the main logged in page of your app. For example `https://my-dapp.com/` would have a login button and `https://my-dapp.com/app/` would be your logged in version of the app.

An example of how this might work could be the following:

```javascript
// index.js
import { createBitski } from 'bitski';

// create instance
const bitski = await createBitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');

// call signInRedirect from some click handler
document.querySelector('#sign-in').addEventHandler('click', () => {
  bitski.signInRedirect('https://my-dapp.com/app/');
});
```

```javascript
// app.js
import { createBitski } from 'bitski';
import Web3 from 'web3';

// create instance
const bitski = await createBitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
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

If you'd like to offer the ability to sign out of your dapp, you can use the `signOut()` method. This will keep the user logged in on Bitski.com as well as other dapps, but will remove your logged in state.

```javascript
bitski.signOut().then(() => {
  //signed out!
});
```

### Verifying credentials with your backend applications

For apps that use a first-party account with a backend, you may want to ensure that the Bitski user is valid, or that they really own the account. Since the client can easily be compromised, you can't necessarily rely on the client to send these details directly. Instead, you should send the user's access token or the refresh token to your server to verify it with Bitski's endpoints directly.

To retrieve the access token in this SDK:

```javascript
const accessToken = await bitski.getCurrentAccessToken();
```

Once you have the access token, submit it to your server however you like. Then, from your server you can use the access token to derive the Bitski user id by using the OAuth standard userinfo endpoint, or the user's account using the `eth_accounts` JSON-RPC method. For more info on how to do this, see [our documentation](https://docs.bitski.com/backend_verification/).

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
const bitski = await createBitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');

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
const bitski = await createBitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');

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
const bitski = await createBitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
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
  const bitski = await createBitski('<YOUR-CLIENT-ID>', '<YOUR-REDIRECT-URL>');
  var bitskiProvider = bitski.getProvider();
  window.web3 = new Web3(bitskiProvider);
}
```

### Report Vulnerabilities
Bitski provides a “bug bounty” to engage with the security researchers in the community. If you have found a vulnerability in our product or service, please [submit a vulnerability report](https://www.bitski.com/bounty) to the Bitski security team.
