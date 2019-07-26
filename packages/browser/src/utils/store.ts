// A generic interface for caching values. Allows for more
// flexibility in storing access tokens and other persistent data.
export interface Store {
  // Empty the cache
  clear();

  // Get an item from the cache
  getItem(key): any;

  // Set an item in the cache
  setItem(key, value);

  // Remove the key from the cache
  clearItem(key);
}
