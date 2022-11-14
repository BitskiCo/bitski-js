---
'bitski-provider': major
'bitski': minor
'eth-provider-types': minor
---

Switch to json rpc engine

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
