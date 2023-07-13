# eth-provider-types

## 0.2.1

### Patch Changes

- [#368](https://github.com/BitskiCo/bitski-js/pull/368) [`44e28e6`](https://github.com/BitskiCo/bitski-js/commit/44e28e6a8d71c7c509bac56894ec62e5abb5d985) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Allow single user operation to be sent

## 0.2.0

### Minor Changes

- [#350](https://github.com/BitskiCo/bitski-js/pull/350) [`65de42b`](https://github.com/BitskiCo/bitski-js/commit/65de42be31f3c1da983637b760f927a3c22bc319) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Add user operation methods as defined by ERC-4337

### Patch Changes

- [#360](https://github.com/BitskiCo/bitski-js/pull/360) [`090b983`](https://github.com/BitskiCo/bitski-js/commit/090b98393da4bc6e576066dddca903325f9ffb07) Thanks [@pzuraq](https://github.com/pzuraq)! - Add WAAS config options and signer query params config

* [#354](https://github.com/BitskiCo/bitski-js/pull/354) [`1a1efd5`](https://github.com/BitskiCo/bitski-js/commit/1a1efd5c2b6eae90c35aafd7cb35f6f3028b6394) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Make maxFeePerGas and maxPriorityFeePerGas optional; rename to preVerificationGas

## 0.2.0-next.2

### Patch Changes

- [#360](https://github.com/BitskiCo/bitski-js/pull/360) [`090b983`](https://github.com/BitskiCo/bitski-js/commit/090b98393da4bc6e576066dddca903325f9ffb07) Thanks [@pzuraq](https://github.com/pzuraq)! - Add WAAS config options and signer query params config

## 0.2.0-next.1

### Patch Changes

- [#354](https://github.com/BitskiCo/bitski-js/pull/354) [`1a1efd5`](https://github.com/BitskiCo/bitski-js/commit/1a1efd5c2b6eae90c35aafd7cb35f6f3028b6394) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Make maxFeePerGas and maxPriorityFeePerGas optional; rename to preVerificationGas

## 0.2.0-next.0

### Minor Changes

- [#350](https://github.com/BitskiCo/bitski-js/pull/350) [`65de42b`](https://github.com/BitskiCo/bitski-js/commit/65de42be31f3c1da983637b760f927a3c22bc319) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Add user operation methods as defined by ERC-4337

## 0.1.0

### Minor Changes

- [#307](https://github.com/BitskiCo/bitski-js/pull/307) [`b00c69e`](https://github.com/BitskiCo/bitski-js/commit/b00c69e661383c5ed8268b3de4d8a22fdd3e3929) Thanks [@pzuraq](https://github.com/pzuraq)! - Fix generics for middleware + switch to standard enums

* [#309](https://github.com/BitskiCo/bitski-js/pull/309) [`868af17`](https://github.com/BitskiCo/bitski-js/commit/868af175ea21cf6a044eab519ee8f820df5657a7) Thanks [@pzuraq](https://github.com/pzuraq)! - Convert eth provider types to CJS for compat for now

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

- [#333](https://github.com/BitskiCo/bitski-js/pull/333) [`462e011`](https://github.com/BitskiCo/bitski-js/commit/462e01184269d440e9216e1d2ff92334d2d712c0) Thanks [@jtescher](https://github.com/jtescher)! - Add missing RPC methods

* [#305](https://github.com/BitskiCo/bitski-js/pull/305) [`eb505af`](https://github.com/BitskiCo/bitski-js/commit/eb505aff9cf0a3e338aec278be131df1b17fb66b) Thanks [@pzuraq](https://github.com/pzuraq)! - - Add destructor for store
  - Also thread `Extra` type through provider and add `requestWithExtra` so
    requests can be made with additional context. Also add a few missing eth
    methods.
  - Make stores able to return MaybePromise so they can be more efficient

## 0.1.0-beta.4

### Patch Changes

- [#333](https://github.com/BitskiCo/bitski-js/pull/333) [`462e011`](https://github.com/BitskiCo/bitski-js/commit/462e01184269d440e9216e1d2ff92334d2d712c0) Thanks [@jtescher](https://github.com/jtescher)! - Add missing RPC methods

## 0.1.0-beta.3

### Minor Changes

- [#309](https://github.com/BitskiCo/bitski-js/pull/309) [`868af17`](https://github.com/BitskiCo/bitski-js/commit/868af175ea21cf6a044eab519ee8f820df5657a7) Thanks [@pzuraq](https://github.com/pzuraq)! - Convert eth provider types to CJS for compat for now

## 0.1.0-beta.2

### Minor Changes

- [#307](https://github.com/BitskiCo/bitski-js/pull/307) [`b00c69e`](https://github.com/BitskiCo/bitski-js/commit/b00c69e661383c5ed8268b3de4d8a22fdd3e3929) Thanks [@pzuraq](https://github.com/pzuraq)! - Fix generics for middleware + switch to standard enums

## 0.1.0-beta.1

### Patch Changes

- [#305](https://github.com/BitskiCo/bitski-js/pull/305) [`eb505af`](https://github.com/BitskiCo/bitski-js/commit/eb505aff9cf0a3e338aec278be131df1b17fb66b) Thanks [@pzuraq](https://github.com/pzuraq)! - - Add destructor for store
  - Also thread `Extra` type through provider and add `requestWithExtra` so
    requests can be made with additional context. Also add a few missing eth
    methods.
  - Make stores able to return MaybePromise so they can be more efficient

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
