import type { BitskiProviderShim } from 'bitski/lib/provider-shim';

import { Bitski, ProviderOptions } from 'bitski';
import { Chain, Wallet } from '@rainbow-me/rainbowkit';
import { Connector, ConnectorData, WalletClient } from 'wagmi';
import {
  ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
  createWalletClient,
  custom,
  getAddress,
} from 'viem';

import {
  normalizeChainId,
  ConnectorNotFoundError,
  ChainNotConfiguredForConnectorError,
} from '@wagmi/connectors';

export interface BitskiConnectorOptions {
  id?: string;
  name?: string;
  appId: string;
  bitskiOptions?: ProviderOptions;
  shimDisconnect?: boolean;
}

export class BitskiConnector extends Connector<BitskiProviderShim, BitskiConnectorOptions> {
  readonly id: string;
  readonly name: string;
  readonly ready = true;

  provider?: BitskiProviderShim;
  bitski: Bitski;

  bitskiOptions: ProviderOptions;

  protected shimDisconnectKey = `${this.id}.shimDisconnect`;

  constructor({
    chains,
    options: options_,
  }: {
    chains?: Chain[];
    options: BitskiConnectorOptions;
  }) {
    const options = {
      shimDisconnect: true,
      ...options_,
    };

    super({
      chains,
      options,
    });

    this.id = options.id ?? 'bitski';
    this.name = options.name ?? 'Bitski';

    const { bitskiOptions = {} } = options;

    this.bitski = new Bitski(options.appId, bitskiOptions.callbackURL);
    this.bitskiOptions = bitskiOptions;
  }

  async connect(config?: { chainId?: number }): Promise<Required<ConnectorData>> {
    if (this.bitskiOptions.waas?.enabled) {
      const loginHint = `fa_${btoa(this.options.appId)}`;
      await this.bitski.start({
        login_hint: loginHint,
        prompt: 'login',
      });
    } else {
      await this.bitski.signIn();
    }

    const provider = await this.getProvider();

    const result: any = await provider.request({
      method: 'eth_requestAccounts',
    });
    const account = result[0];
    const chain = this.chains.find((x) => x.id === config?.chainId);

    return {
      account: account as any,
      chain: {
        id: chain?.id ?? 1,
        unsupported: chain ? true : false,
      },
    };
  }

  async disconnect(): Promise<void> {
    await this.bitski.signOut();
  }

  async getAccount(): Promise<`0x${string}`> {
    const provider = await this.getProvider();
    const result: any = await provider.request({ method: 'eth_accounts' });
    // return checksum address
    return getAddress(result[0] as string);
  }

  async getChainId(): Promise<number> {
    const provider = await this.getProvider();
    if (!provider) throw new ConnectorNotFoundError();

    const chainId = normalizeChainId((await provider.request({ method: 'eth_chainId' })) as number);

    return chainId;
  }

  async getProvider(): Promise<BitskiProviderShim> {
    if (!this.provider) {
      this.provider = await this.bitski.getProvider(this.bitskiOptions);
    }

    return this.provider;
  }

  async getWalletClient(config?: { chainId?: number }): Promise<WalletClient> {
    const chainId = config?.chainId ?? 1;
    const chain = this.chains.find((x) => x.id === chainId);
    const provider = await this.getProvider();
    if (!provider) throw new Error('provider is required.');
    const account = await this.getAccount();
    const walletClient = createWalletClient({
      account,
      chain,
      transport: custom(provider),
    });

    return walletClient as WalletClient;
  }

  async isAuthorized(): Promise<boolean> {
    try {
      if (
        this.options.shimDisconnect &&
        // If shim does not exist in storage, wallet is disconnected
        !this.storage?.getItem(this.shimDisconnectKey)
      )
        return false;

      const provider = await this.getProvider();
      if (!provider) throw new ConnectorNotFoundError();
      const account = await this.getAccount();
      return !!account;
    } catch {
      return false;
    }
  }

  async switchChain(chainId: number): Promise<Chain> {
    const provider = await this.getProvider();
    if (!provider) throw new ConnectorNotFoundError();
    const id = chainId.toString(16);

    try {
      await Promise.all([
        provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: id }],
        }),
        new Promise<void>((res) =>
          this.on('change', ({ chain }) => {
            if (chain?.id === chainId) res();
          }),
        ),
      ]);
      return (
        this.chains.find((x) => x.id === chainId) ?? {
          id: chainId,
          name: `Chain ${id}`,
          network: `${id}`,
          nativeCurrency: { name: 'Ether', decimals: 18, symbol: 'ETH' },
          rpcUrls: { default: { http: [''] }, public: { http: [''] } },
        }
      );
    } catch (error) {
      const chain = this.chains.find((x) => x.id === chainId);
      if (!chain)
        throw new ChainNotConfiguredForConnectorError({
          chainId,
          connectorId: this.id,
        });

      if (
        (error as ProviderRpcError).code === 4902 ||
        (error as ProviderRpcError<{ originalError?: { code: number } }>)?.data?.originalError
          ?.code === 4902
      ) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: id,
                chainName: chain.name,
                nativeCurrency: chain.nativeCurrency,
                rpcUrls: [chain.rpcUrls.public?.http[0] ?? ''],
                blockExplorerUrls: this.getBlockExplorerUrls(chain),
              },
            ],
          });

          const currentChainId = await this.getChainId();
          if (currentChainId !== chainId)
            throw new UserRejectedRequestError(
              new Error('User rejected switch after adding network.'),
            );

          return chain;
        } catch (error) {
          throw new UserRejectedRequestError(error as Error);
        }
      }

      if (this.isUserRejectedRequestError(error))
        throw new UserRejectedRequestError(error as Error);
      throw new SwitchChainError(error as Error);
    }
  }

  protected onAccountsChanged = (accounts: string[]): void => {
    if (accounts.length === 0) this.onDisconnect();
    else
      this.emit('change', {
        account: getAddress(accounts[0] as string),
      });
  };

  protected onChainChanged = (chainId: number | string): void => {
    const id = normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit('change', { chain: { id, unsupported } });
  };

  protected onDisconnect = async (): Promise<void> => {
    this.emit('disconnect');
    if (this.options.shimDisconnect) this.storage?.removeItem(this.shimDisconnectKey);
  };

  protected isUserRejectedRequestError(error: unknown): boolean {
    return (error as ProviderRpcError).code === 4001;
  }
}

export interface BitskiWalletOptions {
  chains: Chain[];
  options: BitskiConnectorOptions;
}

export const bitskiWallet = ({ chains, options }: BitskiWalletOptions): Wallet => ({
  id: 'bitski',
  name: 'Bitski',
  iconUrl: 'https://cdn.bitskistatic.com/docs-web/bitskiWallet.svg',
  iconBackground: '#fff',
  downloadUrls: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/bitski/feejiigddaafeojfddjjlmfkabimkell',
    desktop: 'https://chrome.google.com/webstore/detail/bitski/feejiigddaafeojfddjjlmfkabimkell',
    ios: 'https://apps.apple.com/us/app/bitski-wallet/id1587199538',
    mobile: 'https://apps.apple.com/us/app/bitski-wallet/id1587199538',
  },
  createConnector: () => ({
    connector: new BitskiConnector({ chains, options }),
  }),
});
