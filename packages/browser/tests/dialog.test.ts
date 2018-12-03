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

test('it should apply full screen attributes when necessary', () => {
  let fullScreen = true;
  class MockDialog extends Dialog {
    public shouldRenderFullScreen(): boolean {
      return fullScreen;
    }
  }
  const dialog = new MockDialog('.foo');
  expect(dialog['body'].style.top).toBe('0px');
  expect(dialog['dialog'].style.position).toBe('absolute');
  fullScreen = false;
  document.body.dispatchEvent(new Event('resize'));
  expect(dialog['body'].style.top).not.toBe('0px');
});
