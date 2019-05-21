import { FixtureSubprovider } from '@bitski/provider-engine';
import { BitskiEngine } from '../src/bitski-engine';

function createEngine(): BitskiEngine {
  const engine = new BitskiEngine();
  engine.addProvider(new FixtureSubprovider({
    eth_blockNumber: '0x0',
    eth_getBlockByNumber: false,
  }));
  engine.start();
  engine._blockTracker.emit('latest', '0x1');
  return engine;
}

test('it exists', () => {
  const engine = createEngine();
  expect(engine).toBeDefined();
});

test('it forwards sends when callback is present', () => {
  const engine = createEngine();
  const spy = jest.spyOn(engine, 'sendAsync');
  // @ts-ignore
  engine.send({}, jest.fn());
  expect(spy).toBeCalled();
});
