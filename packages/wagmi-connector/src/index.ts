import type { BitskiProviderShim } from 'bitski/lib/provider-shim';

import { Bitski, ProviderOptions } from 'bitski';
import type { Chain, Wallet } from '@rainbow-me/rainbowkit';
import { Connector, ConnectorData, WalletClient } from '@wagmi/core';
import { createWalletClient, custom, getAddress } from 'viem';

import { normalizeChainId, ConnectorNotFoundError } from '@wagmi/connectors';

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
        unsupported: chain ? false : true,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  protected onAccountsChanged(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  protected onChainChanged(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  protected onDisconnect(): void {}
}

export interface BitskiWalletOptions {
  chains: Chain[];
  options: BitskiConnectorOptions & {
    id?: string;
    name?: string;
    iconUrl?: string;
    iconBackground?: string;
    downloadUrls?: {
      browserExtension?: string;
      desktop?: string;
      ios?: string;
      mobile?: string;
    };
  };
}

export const bitskiWallet = ({ chains, options }: BitskiWalletOptions): Wallet => ({
  id: options.id ?? 'bitski',
  name: options.id ?? 'Bitski',
  iconUrl: options.iconUrl ?? 'https://cdn.bitskistatic.com/docs-web/bitskiWallet.svg',
  iconBackground: options.iconBackground ?? '#fff',
  downloadUrls: options.downloadUrls ?? {
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
