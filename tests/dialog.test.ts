import { Dialog } from '../src/components/dialog';

test('inserts content when none provided', () => {
  const dialog = new Dialog('.foo');
  expect(dialog['content']).toBeDefined();
});

test('removes container when dismissed', () => {
  const dialog = new Dialog('.foo');
  const removeSpy = jest.spyOn(dialog['container'], 'remove');
  dialog.dismiss();
  expect(removeSpy).toHaveBeenCalled();
});

test('it does not render if document is not loaded', () => {
  const mockFn = jest.fn();
  class MockDialog extends Dialog {
    public isDocumentLoaded(): boolean {
      return false;
    }
  }
  MockDialog['render'] = mockFn;
  const dialog = new MockDialog('.foo');
  expect(mockFn).not.toHaveBeenCalled();
});
