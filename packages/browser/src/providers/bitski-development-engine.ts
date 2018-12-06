import { BitskiEngine } from 'bitski-provider';
import RpcSource from 'web3-provider-engine/subproviders/fetch';
import { LocalDialogSubprovider } from '../subproviders/local-dialog';

export class BitskiDevelopmentEngine extends BitskiEngine {

  private rpcUrl: string;

  constructor(options, rpcUrl) {
    super(options);
    this.rpcUrl = rpcUrl;
    this.addSubproviders();
  }

  protected addSubproviders() {
    this.addProvider(new LocalDialogSubprovider());

    const fetchSubprovider = new RpcSource({ rpcUrl: this.rpcUrl });
    this.addProvider(fetchSubprovider);
  }

}
