# @bitski/waas-react-sdk

Solve all your dApp’s authentication challenges with a simple React Widget.

We aim to use tools you are already familiar with, mainly Wagmi and Viem so you can focus on building your application.

To get started, create an account in the Bitski Developer portal. Follow the Web3 onboarding flow to get your Bitski `appId`` and reference the React snippet below to get going immediately.

## Quickstart

Install via `npm i @bitski/waas-react-sdk`

Bitski’s WaaS React SDK uses Wagmi and Viem so you don’t have to learn new tools. We support many chains—just use `viem/chains` and `LoginMethod` from the SDK.

```react
import { BitskiProvider, BitskiWidget, LoginMethod } from "@bitski/waas-react-sdk";
import {base, mainnet, polygon} from "viem/chains";

export const Dapp = () => {
    <BitskiProvider
        appId: 'your-app-id',
        callbackURL: 'https://your-callback-url.com', // Alternatively, use our provided callback mentioned below
        chains={[mainnet, base, polygon]}
        loginMethods={[LoginMethod.Email, LoginMethod.Google, LoginMethod.Wallet]}
    >
      <BitskiWidget />
      // ... The rest of your app's code
    </BitskiProvider>
}
```

### Callback URL

In order for the Bitski Waas React SDK to work, you must provide one public callback URL with the Bitski JS SDK imported.

```
<!DOCTYPE html>
<html>
  <head>
    <title>Logging in...</title>
    <script src="https://cdn.bitskistatic.com/js/sdk/v3.3/callback.js"></script>
  </head>
</html>
```

Say goodbye to the awkward authentication dance and get back to doing what you do best—building your dApp! If you’re running into issues on how to use your Bitski Wallet, free feel to file an issue.
