import { sleep } from '../utils/async';
import css from '../styles/dialog';
import { OpenDialog } from '.';
import { addPostMessageHandler } from './shared';

const TEMPLATE = `
  <div class='bitski-dialog'>
      <button class='bitski-close-button'>Close</button>
      <div class='bitski-dialog-body bitski-loading'></div>
  </div>
`;

/**
 * Embeds Bitski's dialog styles
 */
const injectStyles = () => {
  if (document.getElementById('BitskiSDKEmbeddedStyles')) {
    return;
  }
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('id', 'BitskiSDKEmbeddedStyles');
  style.appendChild(document.createTextNode(css));
  const head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(style);
};

const findOrCreateContainer = (iframe: HTMLElement): HTMLElement => {
  const existingContainer = document.querySelector('#bitski-dialog-container') as HTMLElement;
  if (existingContainer) {
    return existingContainer;
  }
  const container = document.createElement('div');
  container.id = 'bitski-dialog-container';
  document.body.appendChild(container);

  container.innerHTML = TEMPLATE;
  const body = container.querySelector('.bitski-dialog-body');
  if (body) {
    body.appendChild(iframe);
  }

  return container;
};

const createIframe = (url: string): HTMLElement => {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'absolute';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.frameBorder = '0';
  iframe.src = url;

  return iframe;
};

const addCloseHandlers = (container: HTMLElement, close: () => void) => {
  // Close on click outside of the dialog
  container.addEventListener('click', (event) => {
    if (event.target === container) {
      close();
    }
  });

  // Close on escape press
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      close();
    }
  });

  // Close on close button click
  const closeButton = container.querySelector('.bitski-close-button');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      close();
    });
  }
};

export const openIframeDialog: OpenDialog = (opts) => {
  injectStyles();
  const iframe = createIframe(opts.url);
  const container = findOrCreateContainer(iframe);

  const close = async () => {
    container.classList.remove('bitski-visible', 'bitski-loaded');
    await sleep(500);
    container.remove();
  };

  return {
    result: new Promise((resolve, reject) => {
      addCloseHandlers(container, () => {
        try {
          resolve(opts.handleClose());
        } catch (e) {
          reject(e);
        } finally {
          close();
        }
      });

      addPostMessageHandler(opts.handleMessage, close, resolve, reject);

      // A short delay is required before triggering animations
      setTimeout(() => {
        container.classList.add('bitski-visible', 'bitski-loaded');
      }, 10);
    }),
    cancel: close,
  };
};
