import { Address, getAddress, ProviderConnectInfo } from 'viem';
import {
  BaseError,
  Connector,
  createConnector,
  normalizeChainId,
  ProviderNotFoundError,
} from 'wagmi';
import type { BitskiProviderShim } from 'bitski/lib/provider-shim';
import {
  BlockchainAccount,
  getBlockchainAccounts,
  LOCAL_STORAGE_LABEL,
} from '../utils/getBlockchainAccounts';
import { AuthenticationStatus, Bitski } from 'bitski';
import { LoginMethod } from '../components/BitskiWidget/constants';
import { configurator } from './loginMethodConnectorConfigurator';
import { openLocalStoragePopup } from './localStoragePopup';

export const CONNECTOR_TYPE_BITSKI = 'bitski';

type WagmiAccounts = `0x${string}`[];

export interface BitskiConnector extends Connector {
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
}

export interface BitskiParameters {
  appId: string;
  callbackUrl: string;
  loginMethod: LoginMethod;
  shimDisconnect?: boolean | undefined;
}

export function bitski(parameters: BitskiParameters) {
  const providerSearchParams = new URLSearchParams();
  let email: string | undefined;
  let phone: string | undefined;

  const { appId, callbackUrl, loginMethod, shimDisconnect = false } = parameters;

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
  const bitski = new Bitski(appId, callbackUrl);
  let { id, login, name, type, loginHint, icon } = configurator(loginMethod, email);

  if (loginHint) {
    providerSearchParams.set('login_hint', loginHint);
  }

  const url = new URL(window.location.href);
  const enableLocalStorage = url.searchParams.get('useLocalStorage') === 'true';

  return createConnector<Provider, Properties, StorageItem>((config) => {
    return {
      id,
      name,
      icon,
      description: 'Connect to Web3 via Bitski',
      type,

      setEmail(value: string) {
        email = value;
      },

      setPhone(value: string) {
        phone = value;
      },

      async connect(parameters) {
        const provider = await this.getProvider();
        if (!provider) throw new ProviderNotFoundError();

        const status = await bitski.getAuthStatus();
        const chainId: number = parameters?.chainId ?? (await this.getChainId());

        if (status === AuthenticationStatus.Connected) {
          const accounts = await this.getAccounts();
          return {
            accounts,
            chainId,
          } as {
            accounts: WagmiAccounts;
            chainId: number;
          };
        }

        await login(bitski, { email, phoneNumber: phone });
        let accounts = await this.getAccounts();

        if (!accounts && enableLocalStorage) {
          await openLocalStoragePopup();
          accounts = await this.getAccounts();
        }

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

        const token = await bitski.getCurrentAccessToken();
        const blockchainAccounts = await getBlockchainAccounts(fetch, token);
        // Signing not supported with AA, embedded wallets will be Bitski
        return blockchainAccounts
          .filter((account) =>
            enableLocalStorage
              ? account.kind === 'view' && !!account.labels[LOCAL_STORAGE_LABEL]
              : account.kind === 'bitski',
          )
          .map((account) => {
            return account.address;
          }) as WagmiAccounts;
      },

      async getChainId() {
        const provider = await this.getProvider();
        if (!provider) throw new ProviderNotFoundError();

        const chainId = normalizeChainId(await provider.request({ method: 'eth_chainId' }));

        return chainId;
      },

      async getProvider() {
        if (!provider_) {
          provider_ = await bitski.getProvider({
            signerQueryParams: providerSearchParams,
            additionalSigningContext: {
              embedded: true,
            },
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
          await localStorage.removeItem('bitski.email');
        }
      },
    };
  });
}
