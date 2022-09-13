---
'bitski': major
---

Updates the SDK to load dynamically to reduce bundle size and to make updating
easier overall.

Upgrading:

- Instead of importing the `Bitski` class and instantiating it directly, you
  should now import the `createBitski` function and pass options to it. This function
  returns a _promise_ that resolves to either an instance of the SDK, or `null`
  if the SDK is loaded in an environment other than the browser (this allows you
  to import the SDK in an isomorphic codebase that runs in Node).

  ```js
  // before
  import { Bitski } from 'bitski';

  const bitski = new Bitski('CLIENT-ID', 'https://myapp.com/callback.html');
  const provider = bitski.getProvider();

  // after
  import { createBitski } from 'bitski';

  const bitski = await createBitski('CLIENT-ID', 'https://myapp.com/callback.html');
  const provider = bitski?.getProvider();
  ```

- If you use the static `Bitski.callback` function, update to importing
  `popupCallback` directly and calling it:

  ```js
  // before
  import { Bitski } from 'bitski';

  Bitski.callback();

  // after
  import { popupCallback } from 'bitksi';

  popupCallback();
  ```

- Add `https://cdn.bitskistatic.com` to your CSP to allow the full SDK to load:
  - `connect-src`: `https://api.bitski.com`
  - `script-src`: `https://cdn.bitskistatic.com`
