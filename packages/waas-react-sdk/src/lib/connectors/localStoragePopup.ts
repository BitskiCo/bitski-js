const POPUP_HEIGHT = 500;
const POPUP_WIDTH = 500;

export const openLocalStoragePopup = (): Promise<void> =>
  new Promise((resolve, reject) => {
    const width = window.screen.width;
    const height = window.screen.height;

    const leftOffset = (width - POPUP_WIDTH) / 2;
    const topOffset = (height - POPUP_HEIGHT) / 2;

    const closeId = crypto.randomUUID();

    window.addEventListener(
      'message',
      (event) => {
        if (event.origin !== window.location.origin) return;

        if (event.data?.closeId === closeId || event.data?.closeId === null) {
          resolve();
        }
      },
      false,
    );

    const popup = window.open(
      `https://sign.bitski.com/import-local?closeId=${closeId}`,
      '_blank',
      `popup=yes,
      width=${POPUP_WIDTH},
      height=${POPUP_HEIGHT},
      top=${topOffset},
      left=${leftOffset}
    `,
    );
  });
