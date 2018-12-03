import Web3ProviderEngine from 'web3-provider-engine';
import FixtureProvider from 'web3-provider-engine/subproviders/fixture';

export class MockEngine extends Web3ProviderEngine {
  constructor() {
    super();
    super.addProvider(new FixtureProvider({
      eth_getBlockByNumber: false,
      eth_hashrate: '0x00',
      eth_mining: false,
      eth_syncing: true,
      net_listening: true,
      web3_clientVersion: 'ProviderEngine/v0.0.0/javascript',
    }));
    this._blockTracker.emit('block', {
      difficulty: '0x00',
      extraData: '0x00',
      gasLimit: '0x00',
      gasUsed: '0x00',
      hash: '0x00',
      logsBloom: '0x00',
      minGasPrice: '0x00',
      miner: '0x00',
      number: '0x00',
      parentHash: '0x00',
      sealFields: [
        '0x00',
        '0x00',
      ],
      sha3Uncles: '0x00',
      size: '0x00',
      stateRoot: '0x00',
      timestamp: '0x00',
      totalDifficulty: '0x00',
      transactions: [],
      transactionsRoot: '0x00',
      uncles: [],
    });
  }
}
