import { OpenDialog } from '.';
import { addPostMessageHandler } from './shared';

const POPUP_HEIGHT = 620;
const POPUP_WIDTH = 390;

export const openPopupDialog: OpenDialog = (opts) => {
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - POPUP_WIDTH) / 2 / systemZoom + dualScreenLeft;
  const top = (height - POPUP_HEIGHT) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    opts.url,
    '_blank',
    `
      width=${POPUP_WIDTH / systemZoom},
      height=${POPUP_HEIGHT / systemZoom},
      top=${top},
      left=${left}
      `,
  );

  if (!newWindow) {
    throw new Error('Could not open the signer window, please enable popups.');
  }

  return {
    result: new Promise((resolve, reject) => {
      let finished = false;

      addPostMessageHandler(
        opts.handleMessage,
        () => {
          finished = true;
          newWindow.close();
        },
        resolve,
        reject,
      );

      const pollTimer = window.setInterval(() => {
        if (newWindow.closed !== false) {
          window.clearInterval(pollTimer);

          if (finished) return;

          try {
            resolve(opts.handleClose());
          } catch (e) {
            reject(e);
          }
        }
      }, 200);

      newWindow.focus();
    }),
    cancel: () => newWindow.close(),
  };
};
