import { IFRAME_MESSAGE_ORIGIN_ENDS_WITH } from '../constants';

export const addPostMessageHandler = <Message, Result>(
  handleMessage: (message: Message) => Result,
  close: () => void,
  resolve: (result: Result) => void,
  reject: (e: unknown) => void,
) => {
  if (typeof window === 'undefined') return;

  window.addEventListener('message', (event: MessageEvent) => {
    // Ignore messages from the current window, and from frames that aren't on Bitski.com
    if (event.source === window || !event.origin.endsWith(IFRAME_MESSAGE_ORIGIN_ENDS_WITH)) {
      return;
    }

    const data = event.data;

    // Ignore message events that don't actually have data
    if (data === undefined || data === null) {
      return;
    }

    try {
      resolve(handleMessage(data));
    } catch (e) {
      reject(e);
    } finally {
      close();
    }
  });
};
