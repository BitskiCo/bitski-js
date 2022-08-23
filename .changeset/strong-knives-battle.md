---
'bitski': major
---

Makes all storage APIs (and APIs which access storage) async. This allows
different storage mechanisms to be used besides local storage.

## Breaking Changes

- The `authStatus` property has been changed to the `getAuthStatus()`, which now
  returns a promise instead of the auth status directly.
- The `Store` interface must now return promises for all of its functions. The
  default behavior still uses local storage.
