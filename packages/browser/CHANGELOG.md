# bitski

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
