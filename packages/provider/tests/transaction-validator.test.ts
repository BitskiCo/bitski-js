import Web3ProviderEngine from 'web3-provider-engine';
import { TransactionValidatorSubprovider } from '../src/subproviders/transaction-validator';
import FixtureSubprovider from 'web3-provider-engine/subproviders/fixture';

function createEngine() {
  const engine = new Web3ProviderEngine();
  const provider = new TransactionValidatorSubprovider();
  engine.addProvider(provider);
  engine._ready.go();
  return { engine, provider };
}

class MockFixtureProvider extends FixtureSubprovider {

  // Callback is called when we handle any request to inspect the payload
  public callback: (payload: any) => void;

  constructor(fixtures, callback) {
    super(fixtures);
    this.callback = callback;
  }

  public handleRequest(payload, next, end) {
    this.callback(payload);
    super.handleRequest(payload, next, end);
  }
}

test('it updates missing values', (done) => {
  expect.assertions(5);

  const { engine, provider } = createEngine();

  const fixtures = {
    eth_estimateGas: '0x01',
    eth_gasPrice: '0x0001',
    eth_getTransactionCount: '0x0',
    eth_sendTransaction: '0x1',
  };

  const assertionsCallback = (payload) => {
    if (payload.method === 'eth_sendTransaction') {
      expect(payload.params[0]).toBeDefined();
      expect(payload.params[0].gas).toBe(fixtures.eth_estimateGas);
      expect(payload.params[0].gasPrice).toBe(fixtures.eth_gasPrice);
      expect(payload.params[0].nonce).toBe(fixtures.eth_getTransactionCount);
    }
  };

  engine.addProvider(new MockFixtureProvider(fixtures, assertionsCallback));

  const request = {
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    params: [{
      amount: '0x0',
      from: '0xf00',
    }],
  };

  engine.sendAsync(request, (err, result) => {
    expect(err).toBeNull();
    done();
  });

});

test('it only updates values that are missing', (done) => {
  expect.assertions(5);

  const { engine, provider } = createEngine();

  const fixtures = {
    eth_estimateGas: '0x01',
    eth_gasPrice: '0x0001',
    eth_getTransactionCount: '0x0',
    eth_sendTransaction: '0x1',
  };

  const assertionsCallback = (payload) => {
    if (payload.method === 'eth_sendTransaction') {
      expect(payload.params[0]).toBeDefined();
      expect(payload.params[0].gas).toBe(fixtures.eth_estimateGas);
      expect(payload.params[0].gasPrice).toBe(fixtures.eth_gasPrice);
      expect(payload.params[0].nonce).toBe('0xff');
    }
  };

  engine.addProvider(new MockFixtureProvider(fixtures, assertionsCallback));

  const request = {
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    params: [{
      amount: '0x0',
      from: '0xf00',
      nonce: '0xff',
    }],
  };

  engine.sendAsync(request, (err, result) => {
    expect(err).toBeNull();
    done();
  });

});

test('it ignores non-transaction requests', (done) => {
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
