# bitski-provider

## 2.0.0-beta.0

### Major Changes

- [#300](https://github.com/BitskiCo/bitski-js/pull/300) [`3e2ced1`](https://github.com/BitskiCo/bitski-js/commit/3e2ced1d2ff939c15f3aefec6f65fec3d97b8638) Thanks [@pzuraq](https://github.com/pzuraq)! - Switch to json rpc engine

  This PR updates the provider to use a simpler JSON-RPC based
  architecture. It also includes a number of other changes and enhancements:

  - Builds with Rollup instead of Browserify for smaller bundle size (down
    to 170kb minified).
  - Adds `bitski.initialize()` to reinitialize Bitski after page loads
  - Updates sign in and initialize methods to set `window.ethereum` to the
    Bitski provider after successful login. This should make it easier for
    devs to integrate into their DApps.
  - Adds storage for provider state so the provider can store custom
    chains, current chain ID, etc.
  - Adds custom chain RPC url to transaction request contexts, so we can
    send the transaction server side in the near future.
  - Updates `eth-provider-types` to be more accurate overall
  - Ability for middlewares to add arbitrary context to transactions/signs

### Patch Changes

- Updated dependencies [[`3e2ced1`](https://github.com/BitskiCo/bitski-js/commit/3e2ced1d2ff939c15f3aefec6f65fec3d97b8638)]:
  - eth-provider-types@0.1.0-beta.0

## 1.2.0

### Minor Changes

- [#272](https://github.com/BitskiCo/bitski-js/pull/272) [`5893336`](https://github.com/BitskiCo/bitski-js/commit/5893336ce1b2302d5cb16cca2c02883d9b850e92) Thanks [@pzuraq](https://github.com/pzuraq)! - Add new error to ProviderError

## 1.2.0-beta.0

### Minor Changes

- [#272](https://github.com/BitskiCo/bitski-js/pull/272) [`5893336`](https://github.com/BitskiCo/bitski-js/commit/5893336ce1b2302d5cb16cca2c02883d9b850e92) Thanks [@pzuraq](https://github.com/pzuraq)! - Add new error to ProviderError

## 1.1.1

### Patch Changes

- [#262](https://github.com/BitskiCo/bitski-js/pull/262) [`60825e2`](https://github.com/BitskiCo/bitski-js/commit/60825e2de11ca598050587756ec7798b86598177) Thanks [@pzuraq](https://github.com/pzuraq)! - Fix publish setup

## 1.1.0

### Minor Changes

- [#256](https://github.com/BitskiCo/bitski-js/pull/256) [`f726275`](https://github.com/BitskiCo/bitski-js/commit/f7262757a6351f61a81398d4e24e1c756adbea53) Thanks [@imthinhvu](https://github.com/imthinhvu)! - Update provider-engine to remove cross-fetch dependency

## 1.0.0

### Major Changes

- [#247](https://github.com/BitskiCo/bitski-js/pull/247) [`f8e37d3`](https://github.com/BitskiCo/bitski-js/commit/f8e37d331924764e91852be7c699186e9f63c39b) Thanks [@imthinhvu](https://github.com/imthinhvu)! - Promote to production; remove Rinkeby; add Goerli

## 0.16.0

### Minor Changes

- [#240](https://github.com/BitskiCo/bitski-js/pull/240) [`881c76d`](https://github.com/BitskiCo/bitski-js/commit/881c76d76e22097ea22b23cf83c2af4ac12e8a63) Thanks [@imthinhvu](https://github.com/imthinhvu)! - Update to latest provider-engine

## 0.15.0

### Minor Changes

- [#235](https://github.com/BitskiCo/bitski-js/pull/235) [`ad41428`](https://github.com/BitskiCo/bitski-js/commit/ad41428b5381d4e869959a3d711636f3b07dd228) Thanks [@imthinhvu](https://github.com/imthinhvu)! - Add Binance Smart Chain to list of networks