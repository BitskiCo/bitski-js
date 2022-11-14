import { BitskiProvider, BitskiProviderConfig, createBitskiProvider } from '../../src/index';
import createRpcSigner from '../../src/signers/rpc';
import MemStore from './mem-store';

export const TEST_CLIENT_ID = 'test-client-id';

export const createTestProvider = (opts?: Partial<BitskiProviderConfig>): BitskiProvider => {
  return createBitskiProvider({
    clientId: TEST_CLIENT_ID,
    store: new MemStore(),
    sign: createRpcSigner(),
    ...opts,
  });
};
