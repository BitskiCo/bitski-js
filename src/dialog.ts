import closeSVG from './assets/close-button.svg';

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
        if (document && document.body) {
            this.render();
        } else {
            document.body.addEventListener('load', this.render.bind(this));
        }
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
        closeButton.innerHTML = closeSVG;
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
