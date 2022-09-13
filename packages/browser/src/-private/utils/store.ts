// A generic interface for caching values. Allows for more
// flexibility in storing access tokens and other persistent data.
export interface Store {
  // Empty the cache
  clear(): Promise<void>;

  // Get an item from the cache
  getItem(key: string): Promise<string | undefined>;

  // Set an item in the cache
  setItem(key: string, value: string | undefined): Promise<void>;

  // Remove the key from the cache
  clearItem(key: string): Promise<void>;
}
