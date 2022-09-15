---
'bitski': major
---

Updates the SDK to load dynamically to reduce bundle size and to make updating
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
