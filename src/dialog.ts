export class Dialog {
    content: any
    container: HTMLElement
    body: HTMLElement
    dialog: HTMLElement
    closeButton: HTMLElement

    constructor(content: any) {
        //check for an element passed as content or a selector corresponding to an element
        this.content = content.tagName ? content : document.querySelector(content);
        if (!this.content) {
            //otherwise content is text to be appended to the dialog body
            this.content = document.createElement("div");
            this.content.innerText = content;
        }
        this.create();
        this.body.appendChild(this.content);
        if (document.body) {
            this.render();
        } else {
            document.body.addEventListener("load", this.render);
        }
    }

    create() {
        this.closeButton = this.createCloseButton();

        this.body = this.createBody()
        this.body.appendChild(this.content);

        this.dialog = this.createDialog();
        this.dialog.appendChild(this.closeButton);
        this.dialog.appendChild(this.body);

        this.container = this.createContainer();
        this.container.appendChild(this.dialog);

        return this.container;
    }

    createCloseButton(): HTMLElement {
        var closeButton = document.createElement("button");
        closeButton.innerHTML = '<svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M7.86396103,5.74264069 L11.0459415,8.9246212 C11.631728,9.51040764 11.631728,10.4601551 11.0459415,11.0459415 C10.4601551,11.631728 9.51040764,11.631728 8.9246212,11.0459415 L5.74264069,7.86396103 L2.56066017,11.0459415 C1.97487373,11.631728 1.02512627,11.631728 0.439339828,11.0459415 C-0.146446609,10.4601551 -0.146446609,9.51040764 0.439339828,8.9246212 L3.62132034,5.74264069 L0.439339828,2.56066017 C-0.146446609,1.97487373 -0.146446609,1.02512627 0.439339828,0.439339828 C1.02512627,-0.146446609 1.97487373,-0.146446609 2.56066017,0.439339828 L5.74264069,3.62132034 L8.9246212,0.439339828 C9.51040764,-0.146446609 10.4601551,-0.146446609 11.0459415,0.439339828 C11.631728,1.02512627 11.631728,1.97487373 11.0459415,2.56066017 L7.86396103,5.74264069 Z" fill="#CCCED3"></path></svg>';
        closeButton.title = "Close";
        closeButton.setAttribute("type", "button");

        closeButton.style.position = "absolute";
        closeButton.style.right = "12px";
        closeButton.style.top = "12px";
        closeButton.style.background = "none";
        closeButton.style.border = "none";
        closeButton.style.padding = "8px";
        closeButton.style.margin= "0";
        closeButton.style.cursor = "pointer";
        closeButton.style.borderRadius = "16px";
        closeButton.style.outline = "none";


        var self = this;
        closeButton.addEventListener("click", () => {
            self.dismiss();
        });

        return closeButton;
    }

    createDialog(): HTMLElement {
        var dialog = document.createElement("div");
        dialog.className = "dialog";

        dialog.style.width = "400px";
        dialog.style.height = "1px";
        dialog.style.margin = "0 auto";
        dialog.style.position = "relative";
        dialog.style.top = "50%";
        dialog.style.marginTop = "-170px";

        return dialog
    }

    createContainer(): HTMLElement {
        var container = document.createElement("div");
        container.className = "dialog-container";

        container.style.position = 'fixed';
        container.style.left = '0';
        container.style.right = '0';
        container.style.top = '0';
        container.style.bottom = '0';
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        container.style.zIndex = '1000';

        return container;
    }

    createBody(): HTMLElement {
        var body = document.createElement("div");
        body.className = "dialog-body";

        body.style.backgroundColor = "#fff";
        body.style.maxHeight = "380px";
        body.style.overflow = "hidden";
        body.style.borderRadius = "16px";
        body.style.boxShadow = "0px 0px 0px 1px rgba(0,0,0,0.1), 0px 10px 50px rgba(0,0,0,0.4)";

        return body;
    }

    render(): HTMLElement {
        document.body.appendChild(this.container);
        return this.dialog;
    }

    dismiss() {
        this.container.remove();
    }
}
