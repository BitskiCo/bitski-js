import { FixtureSubprovider } from '@bitski/provider-engine';
import { BitskiEngine, BitskiEngineOptions } from '../src/bitski-engine';

function createEngine(opts?: BitskiEngineOptions): BitskiEngine {
  const engine = new BitskiEngine(opts);
  engine.addProvider(
    new FixtureSubprovider({
      eth_blockNumber: '0x0',
      eth_getBlockByNumber: false,
    }),
  );
  engine.start();
  return engine;
}

function findProvider(engine, name) {
  let matchingProvider;
  engine._providers.forEach((provider) => {
    if (provider.constructor.name === name) {
      matchingProvider = provider;
      return;
    }
  });
  return matchingProvider;
}

describe('initialization', () => {
  test('it exists', () => {
    expect.assertions(2);
    const engine = createEngine();
    expect(engine).toBeDefined();
    expect(engine._providers.length).toBe(9);
    engine.stop();
  });

  test('it respects disableCaching option', () => {
    expect.assertions(1);
    const engine = createEngine({ disableCaching: true });
    expect(engine._providers.length).toBe(7);
    engine.stop();
  });
});

describe('when handling subscriptions', () => {
  test('it has support for subscriptions', () => {
    const engine = createEngine();
    expect(engine.supportsSubscriptions()).toBe(true);
    engine.stop();
  });

  test('it can subscribe to events', (done) => {
    const engine = createEngine();
    const spy = jest.spyOn(engine, 'send').mockResolvedValue('0x1');
    engine.subscribe('eth_subscribe', 'logs', []).then((result) => {
      expect(result).toBe('0x1');
      expect(spy).toBeCalled();
      engine.stop();
      done();
    });
  });

  test('it can unsubscribe from events', (done) => {
    const engine = createEngine();
    const spy = jest.spyOn(engine, 'send').mockResolvedValue(true);
    engine.unsubscribe('0x1').then((result) => {
      expect(result).toBe(true);
      expect(spy).toBeCalled();
      engine.stop();
      done();
    });
  });

  test('it emits events with subscription id', (done) => {
    expect.assertions(1);
    const engine = createEngine();
    const subscriptionSubprovider = findProvider(engine, 'SubscriptionsSubprovider');
    const notification = {
      jsonrpc: '2.0',
      method: 'eth_subscription',
      params: {
        subscription: '0x1',
        result: {
          foo: 'bar',
        },
      },
    };
    engine.on('0x1', (result) => {
      expect(result).toEqual(notification.params);
      engine.stop();
      done();
    });
    subscriptionSubprovider.emit('data', null, notification);
  });

  test('it re-emits data events for backwards compatibility', (done) => {
    expect.assertions(1);
    const engine = createEngine();
    const subscriptionSubprovider = findProvider(engine, 'SubscriptionsSubprovider');
    const notification = {
      jsonrpc: '2.0',
      method: 'eth_subscription',
      params: {
        subscription: '0x1',
        result: {
          foo: 'bar',
        },
      },
    };
    engine.on('data', (err, result) => {
      expect(result).toEqual(notification);
      engine.stop();
      done();
    });
    subscriptionSubprovider.emit('data', null, notification);
  });

  test('it does not emit subscription id events when receiving invalid data', (done) => {
    expect.assertions(1);
    const engine = createEngine();
    const subscriptionSubprovider = findProvider(engine, 'SubscriptionsSubprovider');
    let called = false;
    engine.on('0x1', () => {
      called = true;
    });
    subscriptionSubprovider.emit('data', null, {});
    setTimeout(() => {
      expect(called).toBe(false);
      engine.stop();
      done();
    }, 200);
  });
});
