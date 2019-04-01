import { Dialog } from '../src/components/dialog';
import { LocalDialogSubprovider } from '../src/subproviders/local-dialog';

function createRequest(method: string, params: any[]): any {
    return {
        id: 0,
        jsonrpc: '2.0',
        method,
        params,
    };
}

describe('it handles authorized requests with a local dialog', () => {

    test('should show approval dialog when required', () => {
      const instance = new LocalDialogSubprovider();

      const payload = createRequest('eth_sendTransaction', [{
        data: '0x0',
        from: '0x0',
        gas: '0x0',
        gasPrice: '0x0',
        nonce: '0',
        to: '0x0',
        value: '0x0',
      }]);

      instance.handleRequest(payload, jest.fn, jest.fn);
      // @ts-ignore
      expect(instance.currentDialog).not.toBeUndefined();
      // @ts-ignore
      expect(instance.currentRequest).not.toBeUndefined();
    });

    test('should submit transaction when approved', () => {
      const instance = new LocalDialogSubprovider();
      const payload = createRequest('eth_sendTransaction', [{
        data: '0x0',
        from: '0x0',
        gas: '0x0',
        gasPrice: '0x0',
        nonce: '0',
        to: '0x0',
        value: '0x0',
      }]);
      const next = jest.fn();
      const end = jest.fn();
      instance.handleRequest(payload, next, end);
      // @ts-ignore
      instance.transactionWindow.submit();
      expect(next).toBeCalled();
      expect(end).not.toBeCalled();
    });

    test('should not submit transaction when cancelled', () => {
      const instance = new LocalDialogSubprovider();
      const payload = createRequest('eth_sendTransaction', [{
        data: '0x0',
        from: '0x0',
        gas: '0x0',
        gasPrice: '0x0',
        nonce: '0',
        to: '0x0',
        value: '0x0',
      }]);
      const next = jest.fn();
      const end = jest.fn();
      instance.handleRequest(payload, next, end);
      // @ts-ignore
      instance.transactionWindow.cancel();
      expect(next).not.toBeCalled();
      expect(end).toBeCalled();
    });

    test('should close existing dialog if one is already open', () => {
      const dialog = new Dialog(document.createElement('div'));
      const dismissSpy = jest.spyOn(dialog, 'dismiss');

      const instance = new LocalDialogSubprovider();
      // @ts-ignore
      instance.currentDialog = dialog;

      const end = jest.fn();
      // @ts-ignore
      instance.currentRequest = [jest.fn, end];

      const payload = createRequest('eth_sendTransaction', [{
        data: '0x0',
        from: '0x0',
        gas: '0x0',
        gasPrice: '0x0',
        nonce: '0',
        to: '0x0',
        value: '0x0',
      }]);

      instance.handleRequest(payload, jest.fn, jest.fn);

      expect(dismissSpy).toBeCalled();
      expect(end).toBeCalled();
      // @ts-ignore
      expect(instance.currentDialog).not.toBeUndefined();
      // @ts-ignore
      expect(instance.currentRequest).not.toBeUndefined();
    });
});
