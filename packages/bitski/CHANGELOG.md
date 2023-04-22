# bitski

## 3.3.0-beta.2

### Patch Changes

- [#337](https://github.com/BitskiCo/bitski-js/pull/337) [`2cf0f7c`](https://github.com/BitskiCo/bitski-js/commit/2cf0f7c1c166fd9b5f572701017bc2cb9616912a) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Clear tokens if parse error on SDK updates

- Updated dependencies [[`eda0e52`](https://github.com/BitskiCo/bitski-js/commit/eda0e522110f8c7a7665d67d3a83cd976cd5d42c)]:
  - bitski-provider@2.0.0-beta.14

## 3.3.0-beta.1

### Patch Changes

- [#305](https://github.com/BitskiCo/bitski-js/pull/305) [`eb505af`](https://github.com/BitskiCo/bitski-js/commit/eb505aff9cf0a3e338aec278be131df1b17fb66b) Thanks [@pzuraq](https://github.com/pzuraq)! - - Add destructor for store
  - Also thread `Extra` type through provider and add `requestWithExtra` so
    requests can be made with additional context. Also add a few missing eth
    methods.
  - Make stores able to return MaybePromise so they can be more efficient
- Updated dependencies [[`eb505af`](https://github.com/BitskiCo/bitski-js/commit/eb505aff9cf0a3e338aec278be131df1b17fb66b)]:
  - bitski-provider@2.0.0-beta.2
  - eth-provider-types@0.1.0-beta.1

## 3.3.0-beta.0

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

### Patch Changes

- Updated dependencies [[`3e2ced1`](https://github.com/BitskiCo/bitski-js/commit/3e2ced1d2ff939c15f3aefec6f65fec3d97b8638)]:
  - bitski-provider@2.0.0-beta.0
  - eth-provider-types@0.1.0-beta.0

## 3.2.0

### Minor Changes

- [#291](https://github.com/BitskiCo/bitski-js/pull/291) [`9e78d6e`](https://github.com/BitskiCo/bitski-js/commit/9e78d6eb4747737ff264743e5796f8af356d024f) Thanks [@pzuraq](https://github.com/pzuraq)! - Fix refresh token storage, race conditions, and add `onUpdate` to token store to signal async changes

## 3.1.0

### Minor Changes

- [#289](https://github.com/BitskiCo/bitski-js/pull/289) [`01ffb47`](https://github.com/BitskiCo/bitski-js/commit/01ffb47930421174b6aa7ab456c56a6b68cc00e6) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Add condition to personal_sign case to recover from wrong param ordering.

## 3.0.0

### Major Changes

- [#269](https://github.com/BitskiCo/bitski-js/pull/269) [`432b42c`](https://github.com/BitskiCo/bitski-js/commit/432b42cb2065e17b67bd93e5bf15bb8450166aaf) Thanks [@pzuraq](https://github.com/pzuraq)! - Updates the SDK to load dynamically to reduce bundle size and to make updating
  easier overall.

  Upgrading:

  - Add `https://cdn.bitskistatic.com` to your CSP to allow the full SDK to load:

    - `connect-src`: `https://api.bitski.com`
    - `script-src`: `https://cdn.bitskistatic.com`

  - The provider now implements the standard `request()` method. Users should
    update to this method and move away from `send` and `sendAsync`, but these
    legacy methods are still available for the time being.

  - The signature and behavior of `send` and `sendAsync` has been updated to match
    the standard behavior of other providers (see Web3 or Ethers docs for details).

  - The provider now supports the `wallet_switchEthereumChain` and
    `wallet_addEthereumChain` RPC methods.

  - `Bitski.addProvider` no longer returns different instances of the provider for
    different networks. It instead returns a single provider instance, and if a
    network is specified, it calls `wallet_switchEthereumChain` to change the active
    chain of the provider.

* [#279](https://github.com/BitskiCo/bitski-js/pull/279) [`3d7995e`](https://github.com/BitskiCo/bitski-js/commit/3d7995ed186208b1c24a1c838b089fdfe9eab96e) Thanks [@pzuraq](https://github.com/pzuraq)! - Pass full network details to network store

- [#275](https://github.com/BitskiCo/bitski-js/pull/275) [`cd7b69c`](https://github.com/BitskiCo/bitski-js/commit/cd7b69c63743b848bca3b7f44412db87c542ab55) Thanks [@pzuraq](https://github.com/pzuraq)! - Update request and send/sendAsync APIs to match MetaMask/EIP1193

### Patch Changes

- [#273](https://github.com/BitskiCo/bitski-js/pull/273) [`6a0bfcd`](https://github.com/BitskiCo/bitski-js/commit/6a0bfcdbdd3715272172fae20d2d7e897ae90aec) Thanks [@pzuraq](https://github.com/pzuraq)! - Add NetworkStore and update NetworkProviderStore

* [#277](https://github.com/BitskiCo/bitski-js/pull/277) [`c97d83d`](https://github.com/BitskiCo/bitski-js/commit/c97d83d198b798b7718289d9fbb18ce0458805df) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Extend timeout to prevent popup from being dismissed early in Chromium browsers

- [#285](https://github.com/BitskiCo/bitski-js/pull/285) [`e59e01f`](https://github.com/BitskiCo/bitski-js/commit/e59e01f182cca4eee3110c7fda7adba5d94733ee) Thanks [@pzuraq](https://github.com/pzuraq)! - Wait for window load until checking for Bitski global

* [#283](https://github.com/BitskiCo/bitski-js/pull/283) [`0d03f6a`](https://github.com/BitskiCo/bitski-js/commit/0d03f6ad7bfb53e2448867acdabf54d5b8500e6d) Thanks [@pzuraq](https://github.com/pzuraq)! - Add an internal method for getting a custom provider (used by extension)

- [#281](https://github.com/BitskiCo/bitski-js/pull/281) [`4bf1a79`](https://github.com/BitskiCo/bitski-js/commit/4bf1a799966049f8b25cd797a572ad12713a9f92) Thanks [@pzuraq](https://github.com/pzuraq)! - Add internal method for reloading auth state from cache

- Updated dependencies [[`5893336`](https://github.com/BitskiCo/bitski-js/commit/5893336ce1b2302d5cb16cca2c02883d9b850e92)]:
  - bitski-provider@1.2.0

## 3.0.0-beta.7

### Patch Changes

- [#285](https://github.com/BitskiCo/bitski-js/pull/285) [`e59e01f`](https://github.com/BitskiCo/bitski-js/commit/e59e01f182cca4eee3110c7fda7adba5d94733ee) Thanks [@pzuraq](https://github.com/pzuraq)! - Wait for window load until checking for Bitski global

## 3.0.0-beta.6

### Patch Changes

- [#283](https://github.com/BitskiCo/bitski-js/pull/283) [`0d03f6a`](https://github.com/BitskiCo/bitski-js/commit/0d03f6ad7bfb53e2448867acdabf54d5b8500e6d) Thanks [@pzuraq](https://github.com/pzuraq)! - Add an internal method for getting a custom provider (used by extension)

## 3.0.0-beta.5

### Patch Changes

- [#281](https://github.com/BitskiCo/bitski-js/pull/281) [`4bf1a79`](https://github.com/BitskiCo/bitski-js/commit/4bf1a799966049f8b25cd797a572ad12713a9f92) Thanks [@pzuraq](https://github.com/pzuraq)! - Add internal method for reloading auth state from cache

## 3.0.0-beta.4

### Major Changes

- [#279](https://github.com/BitskiCo/bitski-js/pull/279) [`3d7995e`](https://github.com/BitskiCo/bitski-js/commit/3d7995ed186208b1c24a1c838b089fdfe9eab96e) Thanks [@pzuraq](https://github.com/pzuraq)! - Pass full network details to network store

## 3.0.0-beta.3

### Patch Changes

- [#277](https://github.com/BitskiCo/bitski-js/pull/277) [`c97d83d`](https://github.com/BitskiCo/bitski-js/commit/c97d83d198b798b7718289d9fbb18ce0458805df) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Extend timeout to prevent popup from being dismissed early in Chromium browsers

## 3.0.0-beta.2

### Major Changes

- [#275](https://github.com/BitskiCo/bitski-js/pull/275) [`cd7b69c`](https://github.com/BitskiCo/bitski-js/commit/cd7b69c63743b848bca3b7f44412db87c542ab55) Thanks [@pzuraq](https://github.com/pzuraq)! - Update request and send/sendAsync APIs to match MetaMask/EIP1193

## 3.0.0-beta.1

### Patch Changes

- [#273](https://github.com/BitskiCo/bitski-js/pull/273) [`6a0bfcd`](https://github.com/BitskiCo/bitski-js/commit/6a0bfcdbdd3715272172fae20d2d7e897ae90aec) Thanks [@pzuraq](https://github.com/pzuraq)! - Add NetworkStore and update NetworkProviderStore

## 3.0.0-beta.0

### Major Changes

- [#269](https://github.com/BitskiCo/bitski-js/pull/269) [`432b42c`](https://github.com/BitskiCo/bitski-js/commit/432b42cb2065e17b67bd93e5bf15bb8450166aaf) Thanks [@pzuraq](https://github.com/pzuraq)! - Updates the SDK to load dynamically to reduce bundle size and to make updating
  easier overall.

  Upgrading:

  - Add `https://cdn.bitskistatic.com` to your CSP to allow the full SDK to load:

    - `connect-src`: `https://api.bitski.com`
    - `script-src`: `https://cdn.bitskistatic.com`

  - The provider now implements the standard `request()` method. Users should
    update to this method and move away from `send` and `sendAsync`, but these
    legacy methods are still available for the time being.

  - The signature and behavior of `send` and `sendAsync` has been updated to match
    the standard behavior of other providers (see Web3 or Ethers docs for details).

  - The provider now supports the `wallet_switchEthereumChain` and
    `wallet_addEthereumChain` RPC methods.

  - `Bitski.addProvider` no longer returns different instances of the provider for
    different networks. It instead returns a single provider instance, and if a
    network is specified, it calls `wallet_switchEthereumChain` to change the active
    chain of the provider.

### Patch Changes

- Updated dependencies [[`5893336`](https://github.com/BitskiCo/bitski-js/commit/5893336ce1b2302d5cb16cca2c02883d9b850e92)]:
  - bitski-provider@1.2.0-beta.0

## 2.1.4

### Patch Changes

- [#264](https://github.com/BitskiCo/bitski-js/pull/264) [`35dacef`](https://github.com/BitskiCo/bitski-js/commit/35dacef4f758bb171b03d3de0a411e195cc07daa) Thanks [@imthinhvu](https://github.com/imthinhvu)! - Adds missing BNB and BNBT references to get network from name

## 2.1.3

### Patch Changes

- [#262](https://github.com/BitskiCo/bitski-js/pull/262) [`60825e2`](https://github.com/BitskiCo/bitski-js/commit/60825e2de11ca598050587756ec7798b86598177) Thanks [@pzuraq](https://github.com/pzuraq)! - Fix publish setup

- Updated dependencies [[`60825e2`](https://github.com/BitskiCo/bitski-js/commit/60825e2de11ca598050587756ec7798b86598177)]:
  - bitski-provider@1.1.1

## 2.1.2

### Patch Changes

- [#260](https://github.com/BitskiCo/bitski-js/pull/260) [`ac0ebef`](https://github.com/BitskiCo/bitski-js/commit/ac0ebefd1967019c2fdf2ce927c4540226dfd45e) Thanks [@pzuraq](https://github.com/pzuraq)! - Wrap window usage in undefined check for worker/node contexts

## 2.1.0

### Minor Changes

- [#256](https://github.com/BitskiCo/bitski-js/pull/256) [`f726275`](https://github.com/BitskiCo/bitski-js/commit/f7262757a6351f61a81398d4e24e1c756adbea53) Thanks [@imthinhvu](https://github.com/imthinhvu)! - Update provider-engine to remove cross-fetch dependency

### Patch Changes

- Updated dependencies [[`f726275`](https://github.com/BitskiCo/bitski-js/commit/f7262757a6351f61a81398d4e24e1c756adbea53)]:
  - bitski-provider@1.1.0

## 2.0.1

### Patch Changes

- [#254](https://github.com/BitskiCo/bitski-js/pull/254) [`89a6a62`](https://github.com/BitskiCo/bitski-js/commit/89a6a6224778d13c48269d15007548c3b4c00705) Thanks [@pzuraq](https://github.com/pzuraq)! - Check for window/document before running browser code

## 2.0.0

### Major Changes

- [#252](https://github.com/BitskiCo/bitski-js/pull/252) [`c272b2d`](https://github.com/BitskiCo/bitski-js/commit/c272b2d0f75a040e9a64e3b34d0e87563cd079d3) Thanks [@pzuraq](https://github.com/pzuraq)! - Makes all storage APIs (and APIs which access storage) async. This allows
  different storage mechanisms to be used besides local storage.

  ## Breaking Changes

  - The `authStatus` property has been changed to the `getAuthStatus()`, which now
    returns a promise instead of the auth status directly.
  - The `Store` interface must now return promises for all of its functions. The
    default behavior still uses local storage.

## 1.0.0

### Major Changes

- [#249](https://github.com/BitskiCo/bitski-js/pull/249) [`9d85623`](https://github.com/BitskiCo/bitski-js/commit/9d85623e156e7a67982085c0a50e627b7979543b) Thanks [@imthinhvu](https://github.com/imthinhvu)! - Promote to production version; remove Rinkeby; add Goerli

## 0.16.1

### Patch Changes

- [#237](https://github.com/BitskiCo/bitski-js/pull/237) [`31e5db0`](https://github.com/BitskiCo/bitski-js/commit/31e5db05001c00ffba66a7d310674c3298bc7d02) Thanks [@imthinhvu](https://github.com/imthinhvu)! - Remove requirement of EIP712Domain in typed signature requests as this is an optional field

## 0.16.0

### Minor Changes

- [#239](https://github.com/BitskiCo/bitski-js/pull/239) [`0754343`](https://github.com/BitskiCo/bitski-js/commit/075434361d5793c2552afa05f8d4d816e20f3875) Thanks [@imthinhvu](https://github.com/imthinhvu)! - Add context to signature requests

### Patch Changes

- Updated dependencies [[`881c76d`](https://github.com/BitskiCo/bitski-js/commit/881c76d76e22097ea22b23cf83c2af4ac12e8a63)]:
  - bitski-provider@0.16.0

## 0.15.0

### Minor Changes

- [#235](https://github.com/BitskiCo/bitski-js/pull/235) [`ad41428`](https://github.com/BitskiCo/bitski-js/commit/ad41428b5381d4e869959a3d711636f3b07dd228) Thanks [@imthinhvu](https://github.com/imthinhvu)! - Add Binance Smart Chain to list of networks

### Patch Changes

- Updated dependencies [[`ad41428`](https://github.com/BitskiCo/bitski-js/commit/ad41428b5381d4e869959a3d711636f3b07dd228)]:
  - bitski-provider@0.15.0

## 0.14.2

### Patch Changes

- [#233](https://github.com/BitskiCo/bitski-js/pull/233) [`2eea71f`](https://github.com/BitskiCo/bitski-js/commit/2eea71feb8b095bc588e687ccd62dc5c13712db2) Thanks [@ptescher](https://github.com/ptescher)! - Move clearing of state to before callback is called to prevent premature dismissal of subsequent request dialogs.
