import { Dialog } from '../src/components/dialog';

test('renders prebuilt content', () => {
  const div = document.createElement('div');
  const dialog = new Dialog(div);
  dialog.open();
  expect((dialog as any).content).toBe(div);
  expect((dialog as any).container.contains(div)).toEqual(true);
});

test('inserts text content when text', () => {
  const dialog = new Dialog('Hello World');
  dialog.open();
  expect((dialog as any).content).toBeDefined();
  expect((dialog as any).content.innerText).toEqual('Hello World');
});

test('inserts existing element when selector', () => {
  const div = document.createElement('div');
  div.id = 'test-div';
  document.body.appendChild(div);
  const dialog = new Dialog('#test-div');
  dialog.open();
  expect((dialog as any).content).toBe(div);
  expect((dialog as any).container.contains(div)).toEqual(true);
});

test('it calls close on click outside', () => {
  const dialog = new Dialog('foo');
  const spy = jest.spyOn(dialog, 'close');
  dialog.open();
  (dialog as any).container.dispatchEvent(new Event('click'));
  expect(spy).toHaveBeenCalled();
});

test('it calls close on escape press', () => {
  const dialog = new Dialog('foo');
  const spy = jest.spyOn(dialog, 'close');
  dialog.open();
  document.dispatchEvent(new KeyboardEvent('keyup', { key: 'E' }));
  expect(spy).not.toHaveBeenCalled();
  document.dispatchEvent(new KeyboardEvent('keyup', { key: 'Escape' }));
  expect(spy).toHaveBeenCalled();
});

test('removes container when dismissed', (done) => {
  const dialog = new Dialog('foo');
  dialog.open();
  const removeSpy = jest.spyOn((dialog as any).container, 'remove');
  dialog.close();
  setTimeout(() => {
    expect(removeSpy).toHaveBeenCalled();
    done();
  }, 500);
});
