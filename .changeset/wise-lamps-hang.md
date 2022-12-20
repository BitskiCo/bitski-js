---
'bitski-provider': patch
'bitski': patch
'eth-provider-types': patch
---

- Add destructor for store
- Also thread `Extra` type through provider and add `requestWithExtra` so
  requests can be made with additional context. Also add a few missing eth
  methods.
- Make stores able to return MaybePromise so they can be more efficient
