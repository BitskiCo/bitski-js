# Bitski Wagmi Connector

[![npm](https://img.shields.io/npm/v/@bitski/wagmi-connector.svg)](https://www.npmjs.com/package/@bitski/wagmi-connector)

## Installation

```
npm install @bitski/wagmi-connector
```

## Usage

Below are common examples. For more details on all configurable options, please also see the wagmi and RainbowKit docs.

### Wagmi Only

```javascript
import { BitskiConnector } from '@bitski/wagmi-connector';
import { createConfig } from '@wagmi/core';

wagmiConfig = createConfig({
  connectors: [
    new BitskiConnector({
      chains,
      options: {
        id: 'my-connector',
        name: 'My App Wallet',
        appId: 'my-bitski-app-id',
        bitskiOptions: {
          waas: { enabled: false },
          callbackURL: 'https://callback.url:3000',
          // For more options, see the list of ProviderOptions under the bitski package
        },
      },
    }),
    new WalletConnectConnector({
      chains,
      options: { projectId: walletConnectProjectId, showQrModal: false, metadata },
    }),
  ],
  ...defaultConfig,
});
```

### RainbowKit + Wagmi

```javascript
import { bitskiWallet } from '@bitski/wagmi-connector';
import {
  connectorsForWallets,
  RainbowKitProvider,
  Locale,
} from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  metaMaskWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base, zora } from "viem/chains";
import { publicProvider } from "wagmi/providers/public";

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      bitskiWallet({
        options: { appId: 'my-bitski-app-id', bitskiOptions: { network } },
        chains,
      }),
    ],
  },
  {
    groupName: "Other Wallets",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains, projectId: "YOUR_PROJECT_ID" }),
      coinbaseWallet({ appName: "YOUR_APP_NAME", chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale };
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider appInfo={demoAppInfo} chains={chains} locale={locale}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
```
