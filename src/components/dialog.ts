export class Dialog {
    private content: any;
    private container: HTMLElement;
    private body: HTMLElement;
    private dialog: HTMLElement;
    private closeButton: HTMLElement;

    constructor(content: any) {
        // check for an element passed as content or a selector corresponding to an element
        this.content = content.tagName ? content : document.querySelector(content);
        if (!this.content) {
            // otherwise content is text to be appended to the dialog body
            this.content = document.createElement('div');
            this.content.innerText = content;
        }
        this.closeButton = this.createCloseButton();
        this.body = this.createBody();
        this.dialog = this.createDialog();
        this.container = this.createContainer();
        this.addChildren();
        if (this.isDocumentLoaded()) {
            this.render();
        } else {
            document.body.addEventListener('load', this.render.bind(this));
        }
    }

    public isDocumentLoaded(): boolean {
        return typeof document !== 'undefined' && typeof document.body !== 'undefined';
    }

    public dismiss() {
        this.container.remove();
    }

    private addChildren() {
        this.body.appendChild(this.content);
        this.dialog.appendChild(this.closeButton);
        this.dialog.appendChild(this.body);
        this.container.appendChild(this.dialog);
    }

    private createCloseButton(): HTMLElement {
        const closeButton = document.createElement('button');
        closeButton.title = 'Close';
        closeButton.setAttribute('type', 'button');

        closeButton.style.position = 'absolute';
        closeButton.style.right = '12px';
        closeButton.style.top = '12px';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.padding = '8px';
        closeButton.style.margin = '0';
        closeButton.style.cursor = 'pointer';
        closeButton.style.borderRadius = '16px';
        closeButton.style.outline = 'none';

        const closeButtonImage = document.createElement('image');
        const closeSVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTJweCIgaGVpZ2h0PSIxMnB4IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZD0iTTcuODYzOTYxMDMsNS43NDI2NDA2OSBMMTEuMDQ1OTQxNSw4LjkyNDYyMTIgQzExLjYzMTcyOCw5LjUxMDQwNzY0IDExLjYzMTcyOCwxMC40NjAxNTUxIDExLjA0NTk0MTUsMTEuMDQ1OTQxNSBDMTAuNDYwMTU1MSwxMS42MzE3MjggOS41MTA0MDc2NCwxMS42MzE3MjggOC45MjQ2MjEyLDExLjA0NTk0MTUgTDUuNzQyNjQwNjksNy44NjM5NjEwMyBMMi41NjA2NjAxNywxMS4wNDU5NDE1IEMxLjk3NDg3MzczLDExLjYzMTcyOCAxLjAyNTEyNjI3LDExLjYzMTcyOCAwLjQzOTMzOTgyOCwxMS4wNDU5NDE1IEMtMC4xNDY0NDY2MDksMTAuNDYwMTU1MSAtMC4xNDY0NDY2MDksOS41MTA0MDc2NCAwLjQzOTMzOTgyOCw4LjkyNDYyMTIgTDMuNjIxMzIwMzQsNS43NDI2NDA2OSBMMC40MzkzMzk4MjgsMi41NjA2NjAxNyBDLTAuMTQ2NDQ2NjA5LDEuOTc0ODczNzMgLTAuMTQ2NDQ2NjA5LDEuMDI1MTI2MjcgMC40MzkzMzk4MjgsMC40MzkzMzk4MjggQzEuMDI1MTI2MjcsLTAuMTQ2NDQ2NjA5IDEuOTc0ODczNzMsLTAuMTQ2NDQ2NjA5IDIuNTYwNjYwMTcsMC40MzkzMzk4MjggTDUuNzQyNjQwNjksMy42MjEzMjAzNCBMOC45MjQ2MjEyLDAuNDM5MzM5ODI4IEM5LjUxMDQwNzY0LC0wLjE0NjQ0NjYwOSAxMC40NjAxNTUxLC0wLjE0NjQ0NjYwOSAxMS4wNDU5NDE1LDAuNDM5MzM5ODI4IEMxMS42MzE3MjgsMS4wMjUxMjYyNyAxMS42MzE3MjgsMS45NzQ4NzM3MyAxMS4wNDU5NDE1LDIuNTYwNjYwMTcgTDcuODYzOTYxMDMsNS43NDI2NDA2OSBaIiBmaWxsPSIjQ0NDRUQzIj48L3BhdGg+PC9zdmc+';
        closeButtonImage.setAttribute('src', closeSVG);
        closeButton.appendChild(closeButtonImage);

        closeButton.addEventListener('click', this.dismiss.bind(this));

        return closeButton;
    }

    private createDialog(): HTMLElement {
        const dialog = document.createElement('div');
        dialog.className = 'dialog';

        dialog.style.width = '490px';
        dialog.style.height = '1px';
        dialog.style.margin = '0 auto';
        dialog.style.position = 'relative';
        dialog.style.top = '50%';
        dialog.style.marginTop = '-170px';

        return dialog;
    }

    private createContainer(): HTMLElement {
        const container = document.createElement('div');
        container.className = 'dialog-container';

        container.style.position = 'fixed';
        container.style.left = '0';
        container.style.right = '0';
        container.style.top = '0';
        container.style.bottom = '0';
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        container.style.zIndex = '1000';

        return container;
    }

    private createBody(): HTMLElement {
        const body = document.createElement('div');
        body.className = 'dialog-body';

        body.style.backgroundColor = '#fff';
        body.style.maxHeight = '380px';
        body.style.overflow = 'hidden';
        body.style.borderRadius = '16px';
        body.style.boxShadow = '0px 0px 0px 1px rgba(0,0,0,0.1), 0px 10px 50px rgba(0,0,0,0.4)';

        return body;
    }

    private render(): HTMLElement {
        document.body.appendChild(this.container);
        return this.dialog;
    }

}
