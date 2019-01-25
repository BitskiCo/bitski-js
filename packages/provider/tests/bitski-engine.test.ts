import { BitskiEngine } from '../src';

test('it exists', () => {
  const engine = new BitskiEngine({});
});

test('it forwards sends when callback is present', () => {
  const engine = new BitskiEngine({});
  engine.start();
  const spy = jest.spyOn(engine, 'sendAsync');
  // @ts-ignore
  engine.send({}, jest.fn());
  expect(spy).toBeCalled();
});
