import { injected, InjectedParameters } from 'wagmi/connectors';

export function phantom(parameters: InjectedParameters) {
  return injected({
    ...parameters,
    target() {
      return {
        id: 'phantom',
        name: 'Phantom',
        provider(window) {
          if (window?.phantom?.ethereum) return window.phantom?.ethereum;
          if (window?.ethereum?.providers)
            return window?.ethereum.providers.find((provider) => provider.isPhantom);
          if (window?.ethereum && window?.ethereum.isPhantom) return window?.ethereum;
          return undefined;
        },
      };
    },
  });
}
