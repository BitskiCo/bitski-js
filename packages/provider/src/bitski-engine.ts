/// <reference path="../types/web3-provider-engine.d.ts" />

import { JSONRPCRequestPayload } from 'ethereum-protocol';
import Web3ProviderEngine from 'web3-provider-engine';
import CacheSubprovider from 'web3-provider-engine/subproviders/cache';
import DefaultFixtures from 'web3-provider-engine/subproviders/default-fixture';
import InflightCacheSubprovider from 'web3-provider-engine/subproviders/inflight-cache';
import SanitizingSubprovider from 'web3-provider-engine/subproviders/sanitizer';
import SubscriptionSubprovider from 'web3-provider-engine/subproviders/subscriptions';

import { NonceTrackerSubprovider } from './subproviders/nonce-tracker';
import { TransactionValidatorSubprovider } from './subproviders/transaction-validator';

export class BitskiEngine extends Web3ProviderEngine {

  constructor(options: any) {
    super(options);
    this.addProvider(new DefaultFixtures());
    this.addProvider(new NonceTrackerSubprovider());
    this.addProvider(new TransactionValidatorSubprovider());
    this.addProvider(new SanitizingSubprovider());

    const enableCache = !(options && options.disableCaching === true);

    if (enableCache) {
      this.addProvider(new CacheSubprovider());
    }

    const filterAndSubsSubprovider = new SubscriptionSubprovider();
    filterAndSubsSubprovider.on('data', (err, notification) => {
      this.emit('data', err, notification);
    });

    this.addProvider(filterAndSubsSubprovider);

    if (enableCache) {
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
