# bitski

## 4.0.0

### Major Changes

- [#436](https://github.com/BitskiCo/bitski-js/pull/436) [`69571b8c9024ede11a280d2de16b3ef20f27fb72`](https://github.com/BitskiCo/bitski-js/commit/69571b8c9024ede11a280d2de16b3ef20f27fb72) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Remove Bitski extension provider support for SDK in favor of WaaS SDK. No code changes needed by consumers; SDK should work for Email/Password login, but no longer work with extension installed.

## 3.8.1

### Patch Changes

- [#405](https://github.com/BitskiCo/bitski-js/pull/405) [`f640fa5`](https://github.com/BitskiCo/bitski-js/commit/f640fa5fae117177593177a23921b222cc4b9b22) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Pass options to BitskiProviderShim when existing provider does not exist

## 3.8.0

### Minor Changes

- [#403](https://github.com/BitskiCo/bitski-js/pull/403) [`1533a01`](https://github.com/BitskiCo/bitski-js/commit/1533a0158c2ba8ad767d24db147f7ce49d3b638b) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Hash provider options for reuse or change if new config is passed.

### Patch Changes

- Updated dependencies [[`3d15e50`](https://github.com/BitskiCo/bitski-js/commit/3d15e507bfc54f5ab8e6768c404270c909646b73), [`3d15e50`](https://github.com/BitskiCo/bitski-js/commit/3d15e507bfc54f5ab8e6768c404270c909646b73)]:
  - bitski-provider@3.3.2

## 3.7.1

### Patch Changes

- [#397](https://github.com/BitskiCo/bitski-js/pull/397) [`5442939`](https://github.com/BitskiCo/bitski-js/commit/54429391915c5a3c68c08a431aeb34e3c117c350) Thanks [@jtescher](https://github.com/jtescher)! - Update provider package

* [#400](https://github.com/BitskiCo/bitski-js/pull/400) [`9523590`](https://github.com/BitskiCo/bitski-js/commit/9523590c5d9fb0c8f00b44ea442b7afa2e6b14c8) Thanks [@jtescher](https://github.com/jtescher)! - Ignore trailing hash in callbacks

## 3.7.0

### Minor Changes

- [#392](https://github.com/BitskiCo/bitski-js/pull/392) [`9fe6b48`](https://github.com/BitskiCo/bitski-js/commit/9fe6b484bafef80df8069abe994dd0acf8d68f40) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Allow users to specify waas and paymaster via SDK.

## 3.6.0

### Minor Changes

- [#386](https://github.com/BitskiCo/bitski-js/pull/386) [`2c34004`](https://github.com/BitskiCo/bitski-js/commit/2c34004f3521aed613400c0446922f6d1b8fc2ed) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Add login prompt as request option for sign in

## 3.5.0

### Minor Changes

- [#385](https://github.com/BitskiCo/bitski-js/pull/385) [`cccf708`](https://github.com/BitskiCo/bitski-js/commit/cccf708b035138d7cc356bf3ea458dc1d354bef3) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Add Base and Base Goerli to networks list

### Patch Changes

- Updated dependencies [[`14d28a4`](https://github.com/BitskiCo/bitski-js/commit/14d28a4653a45ac6677c3f75954458121c12b54d), [`cccf708`](https://github.com/BitskiCo/bitski-js/commit/cccf708b035138d7cc356bf3ea458dc1d354bef3)]:
  - bitski-provider@3.2.0

## 3.4.0

### Minor Changes

- [#364](https://github.com/BitskiCo/bitski-js/pull/364) [`646a99d`](https://github.com/BitskiCo/bitski-js/commit/646a99dd73273d5ee07d78983b5546be927fbe66) Thanks [@pzuraq](https://github.com/pzuraq)! - Add popup method for signing transactions

### Patch Changes

- Updated dependencies [[`646a99d`](https://github.com/BitskiCo/bitski-js/commit/646a99dd73273d5ee07d78983b5546be927fbe66)]:
  - bitski-provider@3.0.0

## 3.3.2

### Patch Changes

- [#360](https://github.com/BitskiCo/bitski-js/pull/360) [`090b983`](https://github.com/BitskiCo/bitski-js/commit/090b98393da4bc6e576066dddca903325f9ffb07) Thanks [@pzuraq](https://github.com/pzuraq)! - Add WAAS config options and signer query params config

- Updated dependencies [[`5277b19`](https://github.com/BitskiCo/bitski-js/commit/5277b1903ed74a6ced2f6428f7e50417c47d7885), [`090b983`](https://github.com/BitskiCo/bitski-js/commit/090b98393da4bc6e576066dddca903325f9ffb07), [`1a1efd5`](https://github.com/BitskiCo/bitski-js/commit/1a1efd5c2b6eae90c35aafd7cb35f6f3028b6394), [`e452b76`](https://github.com/BitskiCo/bitski-js/commit/e452b76480503e29806d729d9c75476e67feb0ec), [`65de42b`](https://github.com/BitskiCo/bitski-js/commit/65de42be31f3c1da983637b760f927a3c22bc319), [`38b66b0`](https://github.com/BitskiCo/bitski-js/commit/38b66b0c5a460a7f28fdb520d5c39d1f795e3d61)]:
  - bitski-provider@2.1.0
  - eth-provider-types@0.2.0

## 3.3.2-next.2

### Patch Changes

- [#360](https://github.com/BitskiCo/bitski-js/pull/360) [`090b983`](https://github.com/BitskiCo/bitski-js/commit/090b98393da4bc6e576066dddca903325f9ffb07) Thanks [@pzuraq](https://github.com/pzuraq)! - Add WAAS config options and signer query params config

- Updated dependencies [[`090b983`](https://github.com/BitskiCo/bitski-js/commit/090b98393da4bc6e576066dddca903325f9ffb07)]:
  - bitski-provider@2.1.0-next.2
  - eth-provider-types@0.2.0-next.2

## 3.3.2-next.1

### Patch Changes

- Updated dependencies [[`5277b19`](https://github.com/BitskiCo/bitski-js/commit/5277b1903ed74a6ced2f6428f7e50417c47d7885), [`e452b76`](https://github.com/BitskiCo/bitski-js/commit/e452b76480503e29806d729d9c75476e67feb0ec), [`65de42b`](https://github.com/BitskiCo/bitski-js/commit/65de42be31f3c1da983637b760f927a3c22bc319)]:
  - bitski-provider@2.1.0-next.1
  - eth-provider-types@0.2.0-next.0

## 3.3.2-next.0

### Patch Changes

- Updated dependencies [[`38b66b0`](https://github.com/BitskiCo/bitski-js/commit/38b66b0c5a460a7f28fdb520d5c39d1f795e3d61)]:
  - bitski-provider@2.1.0-next.0

## 3.3.1

### Patch Changes

- [#344](https://github.com/BitskiCo/bitski-js/pull/344) [`2507d7f`](https://github.com/BitskiCo/bitski-js/commit/2507d7fc4b6546db6ff72258fc5c033b0124459b) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Separate button style embeded class namespace from iframe style namespace

## 3.3.0

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

- [#337](https://github.com/BitskiCo/bitski-js/pull/337) [`2cf0f7c`](https://github.com/BitskiCo/bitski-js/commit/2cf0f7c1c166fd9b5f572701017bc2cb9616912a) Thanks [@chronicIntrovert](https://github.com/chronicIntrovert)! - Clear tokens if parse error on SDK updates

* [#305](https://github.com/BitskiCo/bitski-js/pull/305) [`eb505af`](https://github.com/BitskiCo/bitski-js/commit/eb505aff9cf0a3e338aec278be131df1b17fb66b) Thanks [@pzuraq](https://github.com/pzuraq)! - - Add destructor for store
  - Also thread `Extra` type through provider and add `requestWithExtra` so
    requests can be made with additional context. Also add a few missing eth
    methods.
  - Make stores able to return MaybePromise so they can be more efficient
* Updated dependencies [[`462e011`](https://github.com/BitskiCo/bitski-js/commit/462e01184269d440e9216e1d2ff92334d2d712c0), [`eda0e52`](https://github.com/BitskiCo/bitski-js/commit/eda0e522110f8c7a7665d67d3a83cd976cd5d42c), [`b00c69e`](https://github.com/BitskiCo/bitski-js/commit/b00c69e661383c5ed8268b3de4d8a22fdd3e3929), [`bc8fbb8`](https://github.com/BitskiCo/bitski-js/commit/bc8fbb819bd4b6a0fba8f261e65ffa3a101b4f00), [`788ef37`](https://github.com/BitskiCo/bitski-js/commit/788ef373342c8558ee3ed18f4d1f8eefa4b23324), [`8c28993`](https://github.com/BitskiCo/bitski-js/commit/8c289930361aea0b3bfab2d4753908068a241e54), [`7c938da`](https://github.com/BitskiCo/bitski-js/commit/7c938dab487b90e36d68fb6ccedb8ae990a14e3d), [`868af17`](https://github.com/BitskiCo/bitski-js/commit/868af175ea21cf6a044eab519ee8f820df5657a7), [`d75da8a`](https://github.com/BitskiCo/bitski-js/commit/d75da8ae09da9b834c519c7c7a87a10e3cc66b81), [`c2b6acc`](https://github.com/BitskiCo/bitski-js/commit/c2b6acc8d5351ea1d7075a190b5529cb86dc4db8), [`0d48684`](https://github.com/BitskiCo/bitski-js/commit/0d48684839f0850380bdce1f645320fdfa830ace), [`9be4413`](https://github.com/BitskiCo/bitski-js/commit/9be4413ee4d221118cb78f0b018c04e2aec04b81), [`56c7b13`](https://github.com/BitskiCo/bitski-js/commit/56c7b13b128df0d77aae1f9e2144692727a082ce), [`8641004`](https://github.com/BitskiCo/bitski-js/commit/8641004ef308232f2708fc2afaeb8e6bdba0d098), [`3e2ced1`](https://github.com/BitskiCo/bitski-js/commit/3e2ced1d2ff939c15f3aefec6f65fec3d97b8638), [`ce354c8`](https://github.com/BitskiCo/bitski-js/commit/ce354c8ed35d5925cc82510f0143eeacc8b9b3e7), [`eb505af`](https://github.com/BitskiCo/bitski-js/commit/eb505aff9cf0a3e338aec278be131df1b17fb66b)]:
  - eth-provider-types@0.1.0
  - bitski-provider@2.0.0

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
