# Bitski Wagmi Connector

[![npm](https://img.shields.io/npm/v/@bitski/wagmi-connector.svg)](https://www.npmjs.com/package/@bitski/wagmi-connector)

## Installation

```
npm install @bitski/wagmi-connector
```

## Usage

```javascript
import { BitskiWagmiConnector } from '@bitski/wagmi-connector';
import { createConfig } from '@wagmi/core';

wagmiConfig = createConfig({
  connectors: [
    new BitskiWagmiConnector({
      chains,
      options: {
        id: 'my-connector',
        name: 'My App Wallet',
        bitski,
        loginHint: LOGIN_HINT,
        waas: { enabled: true },
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
