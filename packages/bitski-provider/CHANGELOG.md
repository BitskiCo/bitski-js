# bitski-provider

## 2.0.0-beta.10

### Minor Changes

- [#324](https://github.com/BitskiCo/bitski-js/pull/324) [`0d48684`](https://github.com/BitskiCo/bitski-js/commit/0d48684839f0850380bdce1f645320fdfa830ace) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Add Arbitrum and Optimism to list of chain types

## 2.0.0-beta.9

### Patch Changes

- [#322](https://github.com/BitskiCo/bitski-js/pull/322) [`788ef37`](https://github.com/BitskiCo/bitski-js/commit/788ef373342c8558ee3ed18f4d1f8eefa4b23324) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Append extras if available to final request through requestWithChain

## 2.0.0-beta.8

### Major Changes

- [#320](https://github.com/BitskiCo/bitski-js/pull/320) [`9be4413`](https://github.com/BitskiCo/bitski-js/commit/9be4413ee4d221118cb78f0b018c04e2aec04b81) Thanks [@pzuraq](https://github.com/pzuraq)! - Pass full context into showPopup rather than just the config"

## 2.0.0-beta.7

### Patch Changes

- [#317](https://github.com/BitskiCo/bitski-js/pull/317) [`8641004`](https://github.com/BitskiCo/bitski-js/commit/8641004ef308232f2708fc2afaeb8e6bdba0d098) Thanks [@pzuraq](https://github.com/pzuraq)! - Await properly in chain management

## 2.0.0-beta.6

### Patch Changes

- [#315](https://github.com/BitskiCo/bitski-js/pull/315) [`7c938da`](https://github.com/BitskiCo/bitski-js/commit/7c938dab487b90e36d68fb6ccedb8ae990a14e3d) Thanks [@pzuraq](https://github.com/pzuraq)! - Move chain-management logic to middleware

## 2.0.0-beta.5

### Patch Changes

- [#313](https://github.com/BitskiCo/bitski-js/pull/313) [`d75da8a`](https://github.com/BitskiCo/bitski-js/commit/d75da8ae09da9b834c519c7c7a87a10e3cc66b81) Thanks [@pzuraq](https://github.com/pzuraq)! - Always add params to RPC requests

## 2.0.0-beta.4

### Patch Changes

- [#311](https://github.com/BitskiCo/bitski-js/pull/311) [`8c28993`](https://github.com/BitskiCo/bitski-js/commit/8c289930361aea0b3bfab2d4753908068a241e54) Thanks [@pzuraq](https://github.com/pzuraq)! - Fix fetch-rest result format

## 2.0.0-beta.3

### Patch Changes

- [#307](https://github.com/BitskiCo/bitski-js/pull/307) [`b00c69e`](https://github.com/BitskiCo/bitski-js/commit/b00c69e661383c5ed8268b3de4d8a22fdd3e3929) Thanks [@pzuraq](https://github.com/pzuraq)! - Fix generics for middleware + switch to standard enums

- Updated dependencies [[`b00c69e`](https://github.com/BitskiCo/bitski-js/commit/b00c69e661383c5ed8268b3de4d8a22fdd3e3929)]:
  - eth-provider-types@0.1.0-beta.2

## 2.0.0-beta.2

### Patch Changes

- [#305](https://github.com/BitskiCo/bitski-js/pull/305) [`eb505af`](https://github.com/BitskiCo/bitski-js/commit/eb505aff9cf0a3e338aec278be131df1b17fb66b) Thanks [@pzuraq](https://github.com/pzuraq)! - - Add destructor for store
  - Also thread `Extra` type through provider and add `requestWithExtra` so
    requests can be made with additional context. Also add a few missing eth
    methods.
  - Make stores able to return MaybePromise so they can be more efficient
- Updated dependencies [[`eb505af`](https://github.com/BitskiCo/bitski-js/commit/eb505aff9cf0a3e338aec278be131df1b17fb66b)]:
  - eth-provider-types@0.1.0-beta.1

## 2.0.0-beta.1

### Patch Changes

- [#303](https://github.com/BitskiCo/bitski-js/pull/303) [`56c7b13`](https://github.com/BitskiCo/bitski-js/commit/56c7b13b128df0d77aae1f9e2144692727a082ce) Thanks [@pzuraq](https://github.com/pzuraq)! - Update external types for prepend middleware to expose fewer implementation details

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
