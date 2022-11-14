import { createBlockCacheMiddleware as legacyCreateBlockCacheMiddleware } from 'eth-json-rpc-middleware/dist/block-cache';
import { JsonRpcMiddleware } from 'json-rpc-engine';
import { createLegacyMiddleware } from '../utils/legacy-middleware';

export const createBlockCacheMiddleware = (): JsonRpcMiddleware<unknown[], unknown> =>
  createLegacyMiddleware(({ blockTracker }) => {
    // TODO type mismatch but they should be compatible
    return legacyCreateBlockCacheMiddleware({ blockTracker: blockTracker as any });
  });
