import JsonRpcError from 'json-rpc-error';
import Subprovider from 'web3-provider-engine/subproviders/subprovider';
import { AuthProvider } from '../auth/auth-provider';
import { Dialog } from '../components/dialog';

type Transaction = [any, any];

export class IFrameSubprovider extends Subprovider {
    public currentTransactionDialog?: Dialog;
    private webBaseUrl: string;
    private networkName: string;
    private authProvider: AuthProvider;
    private currentTransaction?: Transaction;

    constructor(webBaseUrl: string, networkName: string, authProvider: AuthProvider) {
        super();
        this.webBaseUrl = webBaseUrl;
        this.networkName = networkName;
        this.authProvider = authProvider;

        window.addEventListener('message', this.receiveMessage.bind(this), false);
    }

    public handleRequest(payload, next, end): void {
        switch (payload.method) {
            // TODO: Other methods
            case 'eth_sendTransaction': {
                this.authProvider.getAccessToken().then((accessToken) => {
                    this.showTransactionModal(accessToken, payload, end);
                }).catch((error) => {
                    end(error, undefined);
                });
                break;
            }

            default: {
                next();
                break;
            }
        }
    }

    public receiveMessage(event: MessageEvent): void {
        if (event.origin !== this.webBaseUrl) {
            return;
        }

        const data = event.data;

        if (data === undefined || data === null) {
            return;
        }

        if (this.currentTransaction === undefined) {
            return;
        }

        const payload = this.currentTransaction[0];

        if (payload.id !== data.id) {
            return;
        }

        if (this.currentTransactionDialog) {
            this.currentTransactionDialog.dismiss();
            this.currentTransactionDialog = undefined;
        }

        const end = this.currentTransaction[1];
        end(data.error, data.result);
    }

    private showTransactionModal(accessToken, payload, end) {
        if (this.currentTransactionDialog) {
            this.currentTransactionDialog.dismiss();
        }

        if (this.currentTransaction) {
            const oldTransactionEnd = this.currentTransaction[1];
            oldTransactionEnd(new JsonRpcError.InternalError(), undefined);
        }

        this.currentTransaction = [payload, end];

        // TODO: Other methods
        const ethSendTransactionUrl = this.webBaseUrl + '/eth-send-transaction';

        const encodedPayload = btoa(JSON.stringify(payload));
        const txnParams = `network=${this.networkName}&payload=${encodedPayload}&referrerAccessToken=${accessToken}`;

        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.frameBorder = '0';
        iframe.src = `${ethSendTransactionUrl}?${txnParams}`;

        this.currentTransactionDialog = new Dialog(iframe);
    }
}
