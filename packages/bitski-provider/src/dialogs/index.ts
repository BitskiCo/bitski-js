export interface DialogOpts<Message, Result> {
  url: string;
  handleMessage: (message: Message) => Result;
  handleClose: () => Result;
}

export type OpenDialog = <Message, Result>(
  opts: DialogOpts<Message, Result>,
) => {
  result: Promise<Result>;
  cancel: () => void;
};

export { openIframeDialog } from './iframe';
export { openPopupDialog } from './popup';
