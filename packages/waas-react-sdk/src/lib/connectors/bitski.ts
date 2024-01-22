import { Address, getAddress, ProviderConnectInfo } from 'viem';
import { AuthenticationStatus, Bitski, ProviderOptions } from 'bitski';
import {
  BaseError,
  Connector,
  createConnector,
  normalizeChainId,
  ProviderNotFoundError,
} from 'wagmi';
import type { BitskiProviderShim } from 'bitski/lib/provider-shim';

const BitskiIcon = 'https://cdn.bitskistatic.com/docs-web/bitskiWallet.svg';

const APPLE_LOGIN_HINT = 'fa_ZWY0YTdjNTAtZDkzZC00YmI4LWI3MTktYzFjNDU0ZjRkMTYw';
const GOOGLE_LOGIN_HINT = 'fa_NTcyYjUyZWUtZjk4Yi00NTdhLTgzOTItYzI2MjM0YTU0MjIx';
const X_LOGIN_HINT = 'x';

type WagmiAccounts = `0x${string}`[];

export interface BitskiConnector extends Connector {
  setEmail: (email: string) => void;
}

type BitskiOptions = ProviderOptions & {
  includeX?: boolean;
  includeApple?: boolean;
  includeGoogle?: boolean;
};

export interface BitskiParameters {
  appId: string;
  icon?: string;
  bitskiOptions?: BitskiOptions;
  shimDisconnect?: boolean | undefined;
}

export function bitski(parameters: BitskiParameters) {
  let email: string | undefined;

  const {
    appId,
    icon = BitskiIcon,
    bitskiOptions = { waas: { enabled: false } },
    shimDisconnect = false,
  } = parameters;
  const { waas, includeApple, includeGoogle, includeX } = bitskiOptions;

  type Provider = BitskiProviderShim | undefined;
  type Properties = {
    connect(parameters?: { chainId?: number; isReconnecting?: boolean }): Promise<{
      accounts: readonly Address[];
      chainId: number;
    }>;
    onConnect(connectInfo: ProviderConnectInfo): void;
  };
  type StorageItem = { 'bitski.disconnected': true };

  let provider_: Provider | undefined;
  const bitski = new Bitski(appId, bitskiOptions.callbackURL);

  return createConnector<Provider, Properties, StorageItem>((config) => {
    let id = 'bitkiSDK';
    let name = 'bitski';
    let type = 'bitski';

    if (includeApple) {
      id = 'apple';
      name = 'Apple';
      type = 'apple';
    }

    if (includeGoogle) {
      id = 'google';
      name = 'Google';
      type = 'google';
    }

    if (includeX) {
      id = 'x';
      name = 'X';
      type = 'x';
    }

    return {
      id,
      name,
      icon,
      description: 'Connect to Web3 via Bitski',
      type,

      setEmail(value: string) {
        email = value;
      },

      async connect(parameters) {
        const provider = await this.getProvider();
        if (!provider) throw new ProviderNotFoundError();

        const status = await bitski.getAuthStatus();
        const chainId: number = parameters?.chainId ?? (await this.getChainId());

        if (status === AuthenticationStatus.Connected) {
          const accounts: string[] = (await provider.request({
            method: 'eth_accounts',
          })) as string[];

          return {
            accounts,
            chainId,
          } as {
            accounts: WagmiAccounts;
            chainId: number;
          };
        }

        if (waas?.enabled) {
          const loginHint = `fa_${btoa(appId)}`;
          await bitski.start({
            login_hint: loginHint,
            prompt: 'login',
          });
        } else if (email) {
          const loginHint = email;
          await bitski.start({
            login_hint: loginHint,
            prompt: 'login',
          });
        } else if (includeApple) {
          const loginHint = APPLE_LOGIN_HINT;
          await bitski.start({
            login_hint: loginHint,
            prompt: 'login',
          });
        } else if (includeGoogle) {
          const loginHint = GOOGLE_LOGIN_HINT;
          await bitski.start({
            login_hint: loginHint,
            prompt: 'login',
          });
        } else if (includeX) {
          const loginHint = X_LOGIN_HINT;
          await bitski.start({
            login_hint: loginHint,
            prompt: 'login',
          });
        } else {
          await bitski.signIn();
        }

        const accounts: string[] = (await provider.request({
          method: 'eth_requestAccounts',
        })) as string[];

        if (!accounts) {
          throw new BaseError('No Accounts found');
        }

        return {
          accounts,
          chainId,
        } as {
          accounts: WagmiAccounts;
          chainId: number;
        };
      },

      async disconnect() {
        await bitski.signOut();
      },

      async getAccounts() {
        const provider = await this.getProvider();
        if (!provider) throw new ProviderNotFoundError();

        const status = await bitski.getAuthStatus();

        if (status !== AuthenticationStatus.Connected) {
          await this.connect();
        }

        const { accounts = [] } = await bitski.getUser();

        return accounts as WagmiAccounts;
      },

      async getChainId() {
        const provider = await this.getProvider();
        if (!provider) throw new ProviderNotFoundError();

        const chainId = normalizeChainId(await provider.request({ method: 'eth_chainId' }));

        return chainId;
      },

      async getProvider() {
        if (!provider_) {
          const searchParams = new URLSearchParams();
          if (includeApple) {
            searchParams.set('loginHint', APPLE_LOGIN_HINT);
          } else if (includeGoogle) {
            searchParams.set('loginHint', GOOGLE_LOGIN_HINT);
          } else if (includeX) {
            searchParams.set('loginHint', X_LOGIN_HINT);
          }
          provider_ = await bitski.getProvider({
            signerQueryParams: searchParams,
          });
        }
        return provider_;
      },

      async isAuthorized() {
        try {
          const isDisconnected =
            shimDisconnect && (await config.storage?.getItem('bitski.disconnected'));

          if (isDisconnected) return false;

          return bitski.getAuthStatus().then((status) => status === AuthenticationStatus.Connected);
        } catch {
          return false;
        }
      },

      async onAccountsChanged(accounts) {
        if (accounts.length === 0) {
          this.onDisconnect();
        } else if (config.emitter.listenerCount('connect') && this.onConnect) {
          const chainId = (await this.getChainId()).toString();
          await this.onConnect({ chainId });
          await config.storage?.removeItem('bitski.disconnected');
        } else {
          config.emitter.emit('change', { accounts: accounts.map(getAddress) });
        }
      },

      onChainChanged(chain) {
        const chainId = normalizeChainId(chain);
        config.emitter.emit('change', { chainId });
      },

      async onConnect(connectInfo) {
        const accounts = await this.getAccounts();
        if (accounts.length === 0) return;

        const chainId = normalizeChainId(connectInfo.chainId);
        config.emitter.emit('connect', { accounts, chainId });

        if (shimDisconnect) {
          await config.storage?.removeItem('bitski.disconnected');
        }
      },

      async onDisconnect() {
        config.emitter.emit('disconnect');
        if (!shimDisconnect) {
          await config.storage?.setItem('bitski.disconnected', true);
        }
      },
    };
  });
}
