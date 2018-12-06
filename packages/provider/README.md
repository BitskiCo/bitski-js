# Bitski Provider

This package includes our base Web3 provider based on web3-provider-engine. It is intended to be extended for various platforms, as we do in bitski (our browser package), and bitski-node (our Node package).

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
