import Web3ProviderEngine from '@bitski/provider-engine';
import { FixtureSubprovider } from '@bitski/provider-engine';
import { NonceTrackerSubprovider } from '../src/subproviders/nonce-tracker';

function createEngine() {
  const engine = new Web3ProviderEngine();
  const provider = new NonceTrackerSubprovider();
  engine.addProvider(provider);
  // @ts-ignore
  engine._ready.go();
  return { engine, provider };
}

test('it forwards requests when cache is empty', (done) => {
  const { engine, provider } = createEngine();

  engine.addProvider(new FixtureSubprovider({
    eth_getTransactionCount: '0x0',
  }));

  const request = {
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_getTransactionCount',
    params: ['0xf00', 'pending'],
  };

  engine.sendAsync(request, (err, result) => {
    expect(result.result).toBe('0x0');
    expect(err).toBeNull();
    expect(provider.nonceCache.get('0xf00')).toBe('0x0');
    done();
  });
});

test('it responds from cache when cache is present', (done) => {
  const { engine, provider } = createEngine();

  const request = {
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_getTransactionCount',
    params: ['0xf00', 'pending'],
  };

  provider.nonceCache.set('0xf00', '0x01');

  engine.sendAsync(request, (err, result) => {
    expect(result.result).toBe('0x01');
    expect(err).toBeNull();
    expect(provider.nonceCache.get('0xf00')).toBe('0x01');
    done();
  });
});

test('it updates nonce when transaction is successful', (done) => {
  const { engine, provider } = createEngine();

  engine.addProvider(new FixtureSubprovider({
    eth_sendTransaction: '0xf00',
  }));

  provider.nonceCache.set('0xf00', '0x00');

  const request = {
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    params: [{
      amount: '0x0',
      from: '0xf00',
      nonce: '0x01',
    }],
  };

  engine.sendAsync(request, (err, result) => {
    expect(err).toBeNull();
    expect(provider.nonceCache.get('0xf00')).toBe('0x02');
    done();
  });
});

test('it ignores irrellevant requests', (done) => {
  const { engine, provider } = createEngine();

  engine.addProvider(new FixtureSubprovider({
    eth_accounts: [],
  }));

  const request = {
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_accounts',
    params: [],
  };

  engine.sendAsync(request, (err, result) => {
    expect(err).toBeNull();
    expect(result.result).toEqual([]);
    done();
  });

});
