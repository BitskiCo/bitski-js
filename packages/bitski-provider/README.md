# Bitski Provider

[![npm](https://img.shields.io/npm/v/bitski-provider.svg)](https://www.npmjs.com/package/bitski-provider)

> Note: This package is for advanced users, as it lacks authentication/authorization logic. If you are looking for the simplest way to integrate Bitski into your application, checkout the [full Bitski SDK](https://github.com/BitskiCo/bitski-js).

This package includes the Bitski Web3 provider. The provider is strongly typed
using [eth-provider-types](https://github.com/BitskiCo/bitski-js/tree/main/packages/eth-provider-types),
and can be used with any Web3 library that supports the standard provider interface.
Provider's require an Oauth `clientId` to be passed in, which can be created in
the [Bitski developer portal](https://developer.bitski.com/).

```ts
import { createBitskiProvider } from 'bitski-provider';

const provider = createBitskiProvider({
  clientId: 'your-client-id',
});
```

In addition the following options can be passed:

```ts
interface BitskiProviderConfig {
  // Oauth clientId for the app, required
  clientId: string;

  // A custom fetch function. This can be useful when integrating with server
  // side javascript frameworks, or when testing.
  fetch?: typeof fetch;

  // Additional headers which should be included with RPC requests made by the
  // provider.
  additionalHeaders?: Record<string, string>;

  // The polling interval for subscriptions, in milliseconds. Defaults to 1000.
  pollingInterval?: number;

  // Whether or not the provider should cache responses from the API.
  // Defaults to true.
  disableCaching?: boolean;

  // Whether or not the provider should validate requests to the API.
  // Defaults to true.
  disableValidation?: boolean;

  // The API base URL for RPC and other API requests. Defaults to
  // https://api.bitski.com
  apiBaseUrl?: string;

  // The base URL for Bitski's signer UI, used for signing transactions.
  // Defaults to https://signer.bitski.com
  signerBaseUrl: string;

  // The signer callback if the redirect flow is being used for signer.
  transactionCallbackUrl?: string;

  // A storage mechanism for storing provider state, such as current chain and
  // custom chain details.
  store?: BitskiProviderStore;

  // A signing function, see below for more details
  sign?: SignFn;

  // A function that provides the current user, if one exists
  getUser?(): Promise<User | undefined>;

  // A function that provides the current access token, if one exists
  getAccessToken?(): Promise<string>;

  // A function that clears the current access token, if one exists
  clearAccessToken?(): Promise<void>;
}
```

## Sign Function

There are multiple ways to sign transactions with Bitski. The default is to use
the Browser Signer function. This signer will open a popup window to the Bitski
signer UI, and where users can see details about the transaction and confirm it
or deny it. The result is then sent back to the original window and returned
as the result of the request.

The other option that is available is to use the RPC signer.

```ts
import { createBitskiProvider, createRpcSigner } from 'bitski-provider';

const provider = createBitskiProvider({
  clientId: 'your-client-id',
  signFn: createRpcSigner(),
});
```

The RPC signer will send the transaction to the Bitski API and will not ask the
user for confirmation. This flow requires a special access token and is
typically used for programmatic wallets, not user wallets. If you want to use
this flow, please contact us for more details and support.

## Installation

```
npm install bitski-provider
```

## Usage

```javascript
import { BitskiEngine } from 'bitski-provider';

const provider = new BitskiEngine();
provider.start();
```
