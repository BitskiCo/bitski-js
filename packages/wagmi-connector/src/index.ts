import type { BitskiProviderShim } from 'bitski/lib/provider-shim';
import type { Chain } from 'viem/chains';

import { Bitski, Mainnet, Network } from 'bitski';
import { Connector, ConnectorData, WalletClient } from '@wagmi/core';
import { createWalletClient, custom, getAddress } from 'viem';

export interface BitskiWagmiConnectorOptions {
  id?: string;
  name?: string;
  bitski: Bitski;
  loginHint?: string;
  waas?: {
    enabled: boolean;
    userId?: string;
  };
}

export class BitskiWagmiConnector extends Connector<
  BitskiProviderShim,
  BitskiWagmiConnectorOptions
> {
  async getChainId(): Promise<number> {
    const provider = await this.getProvider();
    const result: any = await provider.request({ method: 'net_version' });
    return result as number;
  }
  async isAuthorized(): Promise<boolean> {
    return true;
  }

  // These never happen

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onAccountsChanged(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onChainChanged(): void {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected onDisconnect(): void {}

  readonly id;
  readonly name;
  readonly ready = true;

  bitski: Bitski;
  #provider?: BitskiProviderShim;
  loginHint?: string;
  waasEnabled: boolean;
  userId?: string;

  constructor({ chains, options }: { chains?: Chain[]; options: BitskiWagmiConnectorOptions }) {
    super({
      chains,
      options,
    });
    this.id = options.id ?? 'bitski';
    this.name = options.name ?? 'Bitski';

    this.bitski = options.bitski;
    this.loginHint = options.loginHint;
    this.waasEnabled = options.waas?.enabled ?? false;
    this.userId = options.waas?.userId;
  }

  async getProvider(): Promise<BitskiProviderShim> {
    if (this.#provider) {
      return this.#provider;
    }

    return await this.getProviderInternal();
  }

  async getProviderInternal(config?: { chainId?: number }): Promise<BitskiProviderShim> {
    const chainId = config?.chainId ?? this.chains[0].id ?? 1;

    const chain = this.chains.find((chain) => {
      return chain.id === chainId;
    });

    const network = (chain && getNetwork(chain)) ?? {
      chainId: chainId,
      rpcUrl: `https://api.bitski.com/v1/web3/${chainId}`,
    };

    const provider = await this.bitski.getProvider({
      network,
      waas: {
        enabled: this.waasEnabled,
        userId: this.userId,
      },
    });
    this.#provider = provider;

    return provider;
  }

  async connect(config?: { chainId?: number }): Promise<Required<ConnectorData>> {
    await this.bitski.start({ login_hint: this.loginHint, prompt: 'login' });

    const provider = await this.getProviderInternal(config);
    const result: any = await provider.request({ method: 'eth_accounts', params: [] });
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

  async getWalletClient(config?: { chainId?: number }): Promise<WalletClient> {
    const chainId = config?.chainId ?? 1;
    const chain = this.chains.find((x) => x.id === chainId);
    const network = chain ? getNetwork(chain) : undefined;
    const provider = this.bitski.getProvider({
      network,
      waas: {
        enabled: this.waasEnabled,
        userId: this.userId,
      },
    });
    if (!provider) throw new Error('provider is required.');
    const account = await this.getAccount();
    const walletClient = createWalletClient({
      account,
      chain,
      transport: custom(provider),
    });

    return walletClient as WalletClient;
  }
}

function getNetwork(chain: Chain): Network {
  const chainId = chain.id;
  const rpcUrl = getBitskiRpcUrl(chain);
  return {
    chainId,
    rpcUrl,
  };
}

function getBitskiRpcUrl(chain: Chain): string {
  switch (chain.id) {
    case 1:
      return Mainnet.rpcUrl;
    default:
      return chain.rpcUrls.public.http[0];
  }
}
