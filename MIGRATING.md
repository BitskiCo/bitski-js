# Migrating from 0.3.x to 0.4.x

Starting in version 0.4.x we switched OAuth libraries, offering us the ability to use refresh tokens, and providing an overall smaller package size. There are just a couple of changes needed to get your app working with this new version.

## Updated callback script

We had to make a couple of changes to our callback script. Please update your link to point at our new version:

```html
<script src="https://cdn.jsdelivr.net/npm/bitski@0.4.0/dist/callback.js"></script>
```

## Requesting scopes

We made it slightly more obvious how to request custom scopes, and removed the old way. If you pass in custom scopes, make sure to include the "offline" scope as well, in order to receive refresh tokens.

**Solution**:

You can now pass in an array at the top level:

```javascript
import { Bitski } from "bitski";
const bitski = new Bitski("client-id", "redirect-url", ["offline", "email"]);
```

## User object has been modified

Our previous library had a different model for user. In most cases, you don't need to do anything with the user object, but if you were using it to get their user id, access token, or email address, you'll need to make a couple of changes.

**Solution**:

```javascript
import { Bitski } from "bitski";
const bitski = new Bitski("client-id", "redirect-url");
// Access user id, or email address:
const user = await bitski.getUser();
const id = user.id; // user id (previously user.profile.sub)
const email = user.email; // email (previously user.profile.email)

// Get the access token
const token = bitski.authProvider.tokenStore.currentToken;
```

## Silent renew has been removed

Previously we renewed access tokens by using a silent login flow in a hidden iframe. This was never an ideal flow, and it has been replaced with refresh tokens. This shouldn't have any negative effects in your app unless you are using our library in a non-standard way.

## Logger has been removed

Our previous oauth library allowed you to pass in a logger object to get more context into what was happening in the oauth process. Our new library does not provide that option, so we have removed the `setLogger()` method.

---

# Migrating from 0.1.x to 0.2.x

Version 0.2.x introduced some great improvements but has a few breaking changes. This guide will cover some tips for updating your code.

## Web3 no longer a dependency / bundled

If you were relying on our CDN version of the SDK in 0.1.x we included the web3.js library as part of the bundle. As of 0.2.0 we no longer bundle web3, nor list it as a dependency for our library.

**Solution**:

For those using the CDN version, include a CDN version of web3.js in addition to the bitski library.

```html
<script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.33/dist/web3.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bitski@0.2.0-beta.16/dist/bitski.bundle.js"></script>
```

## getWeb3() is deprecated

Previously we suggested calling `bitski.getWeb3()` in order to get a web3 instance configured for Bitski. Since we have removed the dependency on web3, we no longer offer this method.

**Solution**:

Import web3 directly and initialize an instance using a provider from `bitski.getProvider()`.

```javascript
import { Bitski } from "bitski";
import Web3 from "web3";

const bitski = new Bitski("client-id", "redirect-url");
const web3 = new Web3(bitski.getProvider());
```

## signIn() no longer takes a parameter

To make the API more clear, we no longer take a parameter when calling sign in. Instead we now have `bitski.signIn()` and `bitski.signInRedirect()`.

**Solution**:

**If you use the popup flow**, there should be no action required for this change. Simply call `bitski.signIn()` with no parameters and it should work fine.

**If you use the redirect flow**, call `bitski.signInRedirect()` instead of `bitski.signIn()`. You also now have the option to pass in your callback url as an argument for those people who also want to use the silent renewal option.

## Callback changes

One of the more frustrating parts of integrating the SDK was the callback page. Starting in 0.2.0 we're shipping a drop in html file you can put on your domain to handle the callback automatically for the popup flow. We recommend using this file for the easiest possible integration. See [callback.html](https://github.com/BitskiCo/bitski-js/tree/develop/packages/browser/callback.html) in our source.

However, if you prefer to manage this yourself, the method has been renamed to `bitski.callback()` for popup and silent, and `bitski.redirectCallback()` for the redirect flow.

## getConnectButton takes options object rather than positional parameters

`bitski.getConnectButton()` previously had a number of optional parameters. We've moved to an options object to make it easier to call.

**Solution**:

Use the options hash instead of passing positional arguments. See our [README](https://github.com/BitskiCo/bitski-js#using-the-bitski-connect-button) for the available options.

## postLogoutRedirectURL removed from Bitski SDK constructor

Previously you would initialize Bitski with a client id, callback url, and logout callback url. We no longer support the logout callback url. This is because we don't actually navigate the user during log out.

**Solution**

Update your code to use only the 2 parameters:

```javascript
const bitski = new Bitski("CLIENT-ID", "CALLBACK-URL");
```

If you would like to navigate somewhere after log out, just use the signOut promise:

```javascript
bitski.signOut().then(() => {
  window.location.href = "http://my-logged-out-url.com";
});
```

# Recommended changes

## Logged out provider

You can now use Bitski's provider for most web3 calls without having a logged in user. Anything that doesn't require a user context should be available. Just call `bitski.getProvider()` whenever you need a provider, and call `bitski.signIn()` when you need a wallet address or when it makes sense in your app's flow.

## Checking logged in status

Previously we recommmended calling `bitski.getUser()` and checking the user object. We now have an easier way to check the user's status.

To see if the user is already logged in with Bitski, call `bitski.getAuthStatus()` and check the value. 'CONNECTED' means the user is already logged in and ready to go. 'EXPIRED' means the user's session has expired and needs a new access token. 'NOT_CONNECTED' means the user is not logged in.

You can still call `getUser()` if you want the user's details.

## Call start() instead of signIn()

If you are not using the connect button, we now recommend calling `bitski.start()` instead of `bitski.signIn()`. The start method will sign in silently if possible, meaning there is less to distract your users.
