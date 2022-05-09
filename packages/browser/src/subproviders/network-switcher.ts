import { Subprovider } from '@bitski/provider-engine';
import { JSONRPCRequestPayload } from 'bitski-provider';

import { isSupportedNetworkId } from '../utils/network-utils';

const HEX_RADIX = 16;

export class NetworkSwitcherSubprovider extends Subprovider {
  public handleRequest(payload: JSONRPCRequestPayload, end: (error, response) => void) {
    if (payload.method === 'wallet_switchEthereumChain') {
      try {
        const networkId = parseInt(payload.params[0].chainId, HEX_RADIX);

        if (isSupportedNetworkId(networkId)) {
          window.postMessage({ chainId: networkId }, window.location.origin);
        }
      } catch (err) {
        return end(err, undefined);
      }
    }
  }
}
