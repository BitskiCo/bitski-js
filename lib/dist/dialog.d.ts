export declare class Dialog {
    private content;
    private container;
    private body;
    private dialog;
    private closeButton;
    constructor(content: any);
    dismiss(): void;
    private addChildren();
    private createCloseButton();
    private createDialog();
    private createContainer();
    private createBody();
    private render();
}
