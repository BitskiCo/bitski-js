import {
  BlockCacheSubprovider,
  default as Web3ProviderEngine,
  DefaultFixtureSubprovider,
  InflightCacheSubprovider,
  SanitizerSubprovider,
  SubscriptionSubprovider,
} from '@bitski/provider-engine';

import { ProviderError } from './errors/provider-error';
import { NonceTrackerSubprovider } from './subproviders/nonce-tracker';
import { TransactionValidatorSubprovider } from './subproviders/transaction-validator';
import { TypedDataSanitizerSubprovider } from './subproviders/typed-data';

export interface BitskiEngineOptions {
  // Frequency to check for new blocks
  pollingInterval?: number;
  // Disable caching subproviders (useful for debugging)
  disableCaching?: boolean;
  // Disable transaction validation
  disableValidation?: boolean;
  // Disable polling for new blocks
  disableBlockTracking?: boolean;
  // Set a minimum gas price. Useful for chains like Kovan.
  minGasPrice?: number;
}

export class BitskiEngine extends Web3ProviderEngine {

  constructor(options?: BitskiEngineOptions) {
    super(options);
    options = options || {};

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
      this.addProvider(new TransactionValidatorSubprovider(options.minGasPrice));
      this.addProvider(new TypedDataSanitizerSubprovider());
    }

    const enableCache = !(options && options.disableCaching === true);
    if (enableCache) {
      // Block Cache - caches certain requests by their block number
      this.addProvider(new BlockCacheSubprovider());
    }

    // Handles subscriptions and filters
    const filterAndSubsSubprovider = new SubscriptionSubprovider();

    // Watch for updates from subscriptions
    filterAndSubsSubprovider.on('data', (_, notification) => {
      this.onMessage(notification);
    });

    this.addProvider(filterAndSubsSubprovider);

    if (enableCache) {
      // Debounces duplicate requests that occur at the same time
      this.addProvider(new InflightCacheSubprovider());
    }
  }

  public supportsSubscriptions(): boolean {
    return this._pollForBlocks;
  }

  public subscribe(subscribeMethod: string = 'eth_subscribe', subscriptionMethod: string, parameters: any[]): Promise<string> {
    if (!this._pollForBlocks) { return Promise.reject(ProviderError.SubscriptionsUnavailable()); }
    parameters.unshift(subscriptionMethod);
    return this.send(subscribeMethod, parameters);
  }

  public unsubscribe(subscriptionId: string, unsubscribeMethod: string = 'eth_unsubscribe'): Promise<boolean> {
    if (!this._pollForBlocks) { return Promise.reject(ProviderError.SubscriptionsUnavailable()); }
    return this.send(unsubscribeMethod, [subscriptionId]).then((response) => {
      if (response) {
          this.removeAllListeners(subscriptionId);
      }
      return response;
    });
  }

  protected onMessage(notification) {
    // Re-emit (previous behavior ~ web3 1.0.0-beta.37)
    this.emit('data', null, notification);
    if (notification && notification.params && notification.params.subscription) {
      // Current web3 behavior - emit subscription id
      this.emit(notification.params.subscription, notification.params);
    }
  }

}
