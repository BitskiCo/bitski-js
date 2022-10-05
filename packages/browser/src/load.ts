import type { BitskiSDK, ProviderOptions } from './-private/sdk';
import { BitskiProvider } from './provider';

type BitskiSDKConstructor = typeof BitskiSDK;

declare global {
  interface Window {
    Bitski:
      | {
          BitskiSDK: BitskiSDKConstructor;
          getProvider?: (options?: ProviderOptions | string) => BitskiProvider;
        }
      | undefined;
  }
}

const BITSKI_SDK_URL = 'https://cdn.bitskistatic.com/js/sdk/v3/bitski.min.js';
const BITSKI_SDK_REGEX =
  /^https:\/\/cdn\.bitskistatic\.com\/js\/sdk\/v3\/bitski\.min\.js\/?(\?.*)?$/;

export const findScript = (): HTMLScriptElement | null => {
  const scripts = document.querySelectorAll<HTMLScriptElement>(`script[src^="${BITSKI_SDK_URL}"]`);

  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];

    if (!BITSKI_SDK_REGEX.test(script.src)) {
      continue;
    }

    return script;
  }

  return null;
};

const injectScript = (): HTMLScriptElement => {
  const script = document.createElement('script');
  script.src = BITSKI_SDK_URL;

  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error(
      'Expected document.body not to be null. The Bitski SDK requires a <body> element.',
    );
  }

  headOrBody.appendChild(script);

  return script;
};

let bitskiPromise: Promise<BitskiSDKConstructor | null> | null = null;

const windowLoadPromise = new Promise((resolve) => {
  if (typeof window === 'undefined') {
    // Resolve to null when imported server side. This makes the module
    // safe to import in an isomorphic code base.
    resolve(null);
    return;
  }

  if (window.document.readyState === 'complete') {
    resolve(null);
    return;
  }

  window.addEventListener('load', () => resolve(null));
});

export const loadScript = (): Promise<BitskiSDKConstructor | null> => {
  // Ensure that we only attempt to load Stripe.js at most once
  if (bitskiPromise !== null) {
    return bitskiPromise;
  }

  bitskiPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    windowLoadPromise.then(() => {
      if (window.Bitski) {
        resolve(window.Bitski.BitskiSDK);
        return;
      }

      try {
        let script = findScript();

        if (!script) {
          script = injectScript();
        }

        script.addEventListener('load', () => {
          if (window.Bitski) {
            resolve(window.Bitski.BitskiSDK);
          } else {
            reject(new Error('Bitski SDK not available'));
          }
        });

        script.addEventListener('error', () => {
          reject(new Error('Failed to load Bitski SDK'));
        });
      } catch (error) {
        reject(error);
        return;
      }
    });
  });

  return bitskiPromise;
};
