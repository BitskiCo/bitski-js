# eth-provider-types

## 0.1.0-beta.0

### Minor Changes

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

## 0.0.2

### Patch Changes

- [#296](https://github.com/BitskiCo/bitski-js/pull/296) [`fb79c27`](https://github.com/BitskiCo/bitski-js/commit/fb79c27d597a19368a5b36beeffce98772ca267c) Thanks [@pzuraq](https://github.com/pzuraq)! - Make RPC results promises

## 0.0.1

### Patch Changes

- [#294](https://github.com/BitskiCo/bitski-js/pull/294) [`1ea3b2f`](https://github.com/BitskiCo/bitski-js/commit/1ea3b2f6afd9d2f912c4b4cfc9f24401457630b4) Thanks [@pzuraq](https://github.com/pzuraq)! - Implement initial types
