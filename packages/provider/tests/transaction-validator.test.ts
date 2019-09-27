import Web3ProviderEngine from '@bitski/provider-engine';
import { FixtureSubprovider } from '@bitski/provider-engine';
import { TransactionValidatorSubprovider } from '../src/subproviders/transaction-validator';

function createEngine() {
  const engine = new Web3ProviderEngine();
  const provider = new TransactionValidatorSubprovider(1);
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
  expect.assertions(6);

  const { engine } = createEngine();

  const fixtures = {
    eth_estimateGas: '0x01',
    eth_gasPrice: '0x0001',
    eth_getTransactionCount: '0x0',
    eth_sendTransaction: '0x1',
    eth_accounts: ['0xf00'],
  };

  const assertionsCallback = (payload) => {
    if (payload.method === 'eth_sendTransaction') {
      expect(payload.params[0]).toBeDefined();
      expect(payload.params[0].from).toBe(fixtures.eth_accounts[0]);
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
    }],
  };

  engine.sendAsync(request, (err, result) => {
    expect(err).toBeNull();
    done();
  });

});

test('it ignores errors when trying to set values', (done) => {
  expect.assertions(6);

  const { engine } = createEngine();

  const fixtures = {
    eth_getTransactionCount: '0x0',
    eth_sendTransaction: '0x1',
    eth_accounts: ['0xf00'],
  };

  const assertionsCallback = (payload) => {
    if (payload.method === 'eth_sendTransaction') {
      expect(payload.params[0]).toBeDefined();
      expect(payload.params[0].from).toBe(fixtures.eth_accounts[0]);
      expect(payload.params[0].gas).toBeUndefined();
      expect(payload.params[0].gasPrice).toBeUndefined();
      // Current behavior is that if any of the requirements fail to load,
      // none of them get set (Promise.all).
      expect(payload.params[0].nonce).toBeUndefined();
    }
  };

  engine.addProvider(new MockFixtureProvider(fixtures, assertionsCallback));

  const request = {
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    params: [{
      amount: '0x0',
    }],
  };

  engine.sendAsync(request, (err, result) => {
    expect(err).toBeNull();
    done();
  });

});

test('it only updates values that are missing', (done) => {
  expect.assertions(6);

  const { engine } = createEngine();

  const fixtures = {
    eth_estimateGas: '0x01',
    eth_gasPrice: '0x0001',
    eth_getTransactionCount: '0x0',
    eth_sendTransaction: '0x1',
    eth_accounts: ['0xf00'],
  };

  const assertionsCallback = (payload) => {
    if (payload.method === 'eth_sendTransaction') {
      expect(payload.params[0]).toBeDefined();
      expect(payload.params[0].from).toBe(fixtures.eth_accounts[0]);
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

test('it updates gas price based on minGasPrice', (done) => {
  expect.assertions(3);

  const { engine } = createEngine();

  const fixtures = {
    eth_estimateGas: '0x01',
    eth_gasPrice: '0x0',
    eth_getTransactionCount: '0x0',
    eth_sendTransaction: '0x1',
    eth_accounts: ['0xf00'],
  };

  const assertionsCallback = (payload) => {
    if (payload.method === 'eth_sendTransaction') {
      expect(payload.params[0]).toBeDefined();
      expect(payload.params[0].gasPrice).toBe('0x1');
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

test('it ignores transactions that already have all values', (done) => {
  expect.assertions(6);

  const { engine } = createEngine();

  const fixtures = {
    eth_estimateGas: '0x01',
    eth_gasPrice: '0x0001',
    eth_getTransactionCount: '0x0',
    eth_sendTransaction: '0x1',
    eth_accounts: ['0xf00'],
  };

  const assertionsCallback = (payload) => {
    if (payload.method === 'eth_sendTransaction') {
      expect(payload.params[0]).toBeDefined();
      expect(payload.params[0].from).toBe('0xff');
      expect(payload.params[0].gas).toBe('0x02');
      expect(payload.params[0].gasPrice).toBe('0x003');
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
      from: '0xff',
      gas: '0x02',
      gasPrice: '0x003',
      nonce: '0xff',
    }],
  };

  engine.sendAsync(request, (err, result) => {
    expect(err).toBeNull();
    done();
  });

});

test('it ignores non-transaction requests', (done) => {
  const { engine } = createEngine();

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
