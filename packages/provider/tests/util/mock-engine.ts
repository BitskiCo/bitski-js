import Web3ProviderEngine from '@bitski/provider-engine';
import { FixtureSubprovider } from '@bitski/provider-engine';

export class MockEngine extends Web3ProviderEngine {
  constructor() {
    super();
    this.addProvider(new FixtureSubprovider({
      eth_blockNumber: '0x0',
      eth_getBlockByNumber: false,
      eth_hashrate: '0x00',
      eth_mining: false,
      eth_syncing: true,
      net_listening: true,
      web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
    }));
  }

  public start() {
    super.start();
    // Emit a block after a short delay to start requests
    setTimeout(() => {
      this._blockTracker.emit('latest', '0x1');
    }, 500);
  }
}
