import JsonRpcError from 'json-rpc-error';
import { Dialog } from '../components/dialog';
import { AuthorizationHandler } from './authorization-handler';

type Request = [any, any];

/*
 * An AuthorizationHandler Subprovider that uses a local dialog to request permission from the user. Meant for development mode only.
 */
export class LocalDialogSubprovider extends AuthorizationHandler {

  private currentDialog?: Dialog;
  private currentRequest?: Request;
  private transactionWindow: any;

  constructor(opts?: any) {
      super(opts);
  }

  public handleAuthorization(payload, end): void {
    this.showTransactionModal(payload, end);
  }

  private showTransactionModal(payload, end) {

      const submitHandler = () => {
        this.currentRequest = undefined;
        if (this.currentDialog) {
            this.currentDialog.dismiss();
        }
        this.skip();
      };

      const cancelHandler = () => {
        end(new JsonRpcError.InternalError(), undefined);
        this.currentRequest = undefined;
        if (this.currentDialog) {
            this.currentDialog.dismiss();
        }
      };

      this.transactionWindow = this.createTransactionWindow(payload, submitHandler, cancelHandler);

      this.displayModal(this.transactionWindow.element, payload, end);
  }

  private createDefinition(label, value) {
    const list = document.createElement('dl');
    list.style.fontSize = '12px';
    const dt = document.createElement('dt');
    dt.textContent = label;
    dt.style.fontWeight = 'bold';
    dt.style.cssFloat = 'left';
    dt.style.clear = 'both';
    dt.style.width = '80px';
    dt.style.color = '#666';
    const dd = document.createElement('dd');
    dd.textContent = value;
    dd.style.display = 'block';
    dd.style.marginLeft = '100px';
    dd.style.textOverflow = 'ellipsis';
    dd.style.overflow = 'hidden';
    dd.style.color = '#333';
    list.appendChild(dt);
    list.appendChild(dd);
    return list;
  }

  // Creates a dummy transaction window to demo the experience
  private createTransactionWindow(payload, submitHandler, cancelHandler): any {
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.color = '#000';

      const body = document.createElement('div');
      body.style.padding = '20px';

      container.appendChild(body);

      const title = document.createElement('h3');
      title.innerText = 'Review Transaction';
      title.style.borderBottom = 'solid 1px #eee';
      title.style.paddingBottom = '20px';
      title.style.margin = '0';
      body.appendChild(title);

      const description = document.createElement('p');
      description.innerText = 'In production, Bitski will confirm your transaction in a window like this.';
      body.appendChild(description);

      const txn = payload && payload.params && payload.params[0];

      const { from, to, gas, gasPrice, value, data, nonce } = txn;

      body.appendChild(this.createDefinition('To', to || '--'));
      body.appendChild(this.createDefinition('From', from || '--'));
      body.appendChild(this.createDefinition('Gas', gas || '--'));
      body.appendChild(this.createDefinition('Gas Price', gasPrice || '--'));
      body.appendChild(this.createDefinition('Amount', value || '--'));
      body.appendChild(this.createDefinition('Data', data || '--'));
      body.appendChild(this.createDefinition('Nonce', nonce || '--'));

      const buttons = document.createElement('div');
      buttons.style.padding = '20px';
      buttons.style.borderTop = 'solid 1px #eee';
      buttons.style.display = 'flex';
      buttons.style.position = 'absolute';
      buttons.style.left = '0';
      buttons.style.right = '0';
      buttons.style.bottom = '0';
      buttons.style.backgroundColor = '#fff';

      const submitButton = document.createElement('button');
      submitButton.innerText = 'Submit';
      submitButton.style.border = 'none';
      submitButton.style.color = '#fff';
      submitButton.style.padding = '10px 40px';
      submitButton.style.borderRadius = '4px';
      submitButton.style.fontSize = '16px';
      submitButton.style.fontWeight = 'bold';
      submitButton.style.backgroundColor = '#11CC72';
      submitButton.addEventListener('click', submitHandler);

      buttons.appendChild(submitButton);

      const cancelButton = document.createElement('button');
      cancelButton.innerText = 'Cancel';
      cancelButton.style.border = 'none';
      cancelButton.style.padding = '10px 40px';
      cancelButton.style.borderRadius = '4px';
      cancelButton.style.fontSize = '16px';
      cancelButton.style.fontWeight = 'bold';
      cancelButton.style.color = '#424D5C';
      cancelButton.style.backgroundColor = '#E1E6ED';
      cancelButton.addEventListener('click', cancelHandler);

      buttons.appendChild(cancelButton);
      body.appendChild(buttons);

      return {
        cancel: cancelHandler,
        element: container,
        submit: submitHandler,
      };
  }

  private displayModal(element, payload, end) {
      if (this.currentDialog) {
          this.currentDialog.dismiss();
      }

      if (this.currentRequest) {
          const oldTransactionEnd = this.currentRequest[1];
          oldTransactionEnd(new JsonRpcError.InternalError(), undefined);
      }

      this.currentRequest = [payload, end];
      this.currentDialog = new Dialog(element);
  }
}
