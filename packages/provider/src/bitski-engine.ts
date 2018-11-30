import ProviderEngine from 'web3-provider-engine';
import CacheSubprovider from 'web3-provider-engine/subproviders/cache';
import DefaultFixtures from 'web3-provider-engine/subproviders/default-fixture';
import InflightCacheSubprovider from 'web3-provider-engine/subproviders/inflight-cache';
import NonceTrackerSubprovider from 'web3-provider-engine/subproviders/nonce-tracker';
import SanitizingSubprovider from 'web3-provider-engine/subproviders/sanitizer';
import SubscriptionSubprovider from 'web3-provider-engine/subproviders/subscriptions';

export class BitskiEngine extends ProviderEngine {

  constructor(options: any) {
    super(options);
    this.addProvider(new DefaultFixtures());
    this.addProvider(new NonceTrackerSubprovider());
    this.addProvider(new SanitizingSubprovider());
    this.addProvider(new CacheSubprovider());

    const filterAndSubsSubprovider = new SubscriptionSubprovider();
    filterAndSubsSubprovider.on('data', (err, notification) => {
      this.emit('data', err, notification);
    });

    this.addProvider(filterAndSubsSubprovider);
    this.addProvider(new InflightCacheSubprovider());
  }

}
