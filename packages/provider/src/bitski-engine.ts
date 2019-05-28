import {
  BlockCacheSubprovider,
  default as Web3ProviderEngine,
  DefaultFixtureSubprovider,
  InflightCacheSubprovider,
  SanitizerSubprovider,
  SubscriptionSubprovider,
} from '@bitski/provider-engine';
import { JSONRPCRequestPayload } from 'ethereum-protocol';

import { NonceTrackerSubprovider } from './subproviders/nonce-tracker';
import { TransactionValidatorSubprovider } from './subproviders/transaction-validator';

export interface BitskiEngineOptions {
  // Frequency to check for new blocks
  pollingInterval?: number;
  // Disable caching subproviders (useful for debugging)
  disableCaching?: boolean;
  // Disable transaction validation
  disableValidation?: boolean;
}

export class BitskiEngine extends Web3ProviderEngine {

  constructor(options?: BitskiEngineOptions) {
    super(options);
    // Handles static responses
    this.addProvider(new DefaultFixtureSubprovider());

    // Monitors requests to eth_getTransactionCount and eth_sendTransaction to track
    // pending transactions
    this.addProvider(new NonceTrackerSubprovider());

    // Sanitizes transaction params, removing anything invalid
    this.addProvider(new SanitizerSubprovider());

    const enableValidator = !(options && options.disableValidation === true);
    if (enableValidator) {
      // Ensures that transactions are well formed (nonce, gas, gasPrice, from) before they are sent to Bitski
      this.addProvider(new TransactionValidatorSubprovider());
    }

    const enableCache = !(options && options.disableCaching === true);
    if (enableCache) {
      // Block Cache - caches certain requests by their block number
      this.addProvider(new BlockCacheSubprovider());
    }

    // Handles subscriptions and filters
    const filterAndSubsSubprovider = new SubscriptionSubprovider();
    filterAndSubsSubprovider.on('data', (err, notification) => {
      this.emit('data', err, notification);
    });

    this.addProvider(filterAndSubsSubprovider);

    if (enableCache) {
      // Debounces duplicate requests that occur at the same time
      this.addProvider(new InflightCacheSubprovider());
    }
  }

  // Some versions of web3 prefer to use send(payload, callback) instead of sendAsync() with a callback.
  public send(payload: JSONRPCRequestPayload) {
    // Typescript doesn't like overrides with overloads, so use arguments array.
    if (typeof arguments[1] === 'function') {
      this.sendAsync(payload, arguments[1]);
    } else {
      throw new Error('synchronous requests are not supported');
    }
  }

}
