import { AccessTokenProvider } from 'bitski-provider';
import JsonRpcError from 'json-rpc-error';
import { Dialog } from '../components/dialog';
import { AuthorizationHandler } from './authorization-handler';

type Request = [any, any];

/*
 * An AuthorizationHandler Subprovider that uses an iframe to get authorization from the user.
 */
export class IFrameSubprovider extends AuthorizationHandler {
    public currentRequestDialog?: Dialog;
    private webBaseUrl: string;
    private networkName: string;
    private tokenProvider: AccessTokenProvider;
    private currentRequest?: Request;

    constructor(webBaseUrl: string, networkName: string, tokenProvider: AccessTokenProvider) {
        super();
        this.webBaseUrl = webBaseUrl;
        this.networkName = networkName;
        this.tokenProvider = tokenProvider;
        window.addEventListener('message', this.receiveMessage.bind(this), false);
    }

    public handleAuthorization(payload, _, end): void {
        this.tokenProvider.getAccessToken().then((accessToken) => {
            this.showBitskiModal(accessToken, payload, end);
        }).catch((error) => {
            end(error, undefined);
        });
    }

    public receiveMessage(event: MessageEvent): void {
        if (event.origin !== this.webBaseUrl) {
            return;
        }

        const data = event.data;

        if (data === undefined || data === null) {
            return;
        }

        if (this.currentRequest === undefined) {
            return;
        }

        const payload = this.currentRequest[0];

        if (payload.id !== data.id) {
            return;
        }

        if (this.currentRequestDialog) {
            this.currentRequestDialog.dismiss();
            this.currentRequestDialog = undefined;
        }

        const end = this.currentRequest[1];
        end(data.error, data.result);
    }

    private urlForMethod(method: string): string | undefined {
        // TODO: Other methods
        switch (method) {
        case 'eth_sendTransaction':
            return this.webBaseUrl + '/eth-send-transaction';
        case 'eth_sign':
        case 'personal_sign':
            return this.webBaseUrl + '/eth-sign';
        default:
            return undefined;
        }
    }

    // Show the real transaction modal when using a bitski wallet
    private showBitskiModal(accessToken, payload, end) {
        const authorizationUrl = this.urlForMethod(payload.method);

        if (authorizationUrl === undefined) {
            end(new JsonRpcError.InternalError(), undefined);
            return;
        }

        const encodedPayload = btoa(JSON.stringify(payload));
        const txnParams = `network=${this.networkName}&payload=${encodedPayload}&referrerAccessToken=${accessToken}`;

        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.frameBorder = '0';
        iframe.src = `${authorizationUrl}?${txnParams}`;

        this.showAuthorizationModal(iframe, payload, end);
    }

    private showAuthorizationModal(element, payload, end) {
        if (this.currentRequestDialog) {
            this.currentRequestDialog.dismiss();
        }

        if (this.currentRequest) {
            const oldTransactionEnd = this.currentRequest[1];
            oldTransactionEnd(new JsonRpcError.InternalError(), undefined);
        }

        this.currentRequest = [payload, end];
        this.currentRequestDialog = new Dialog(element, true);
        this.currentRequestDialog.onClose = () => {
            end(new Error('The transaction was cancelled'), undefined);
        };
    }
}
