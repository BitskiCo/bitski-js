import { JsonRpcMiddleware } from 'json-rpc-engine';
import legacyCreateFilterMiddleware from 'eth-json-rpc-filters';
import { createLegacyMiddleware } from '../utils/legacy-middleware';

export const createFilterMiddleware = (): JsonRpcMiddleware<unknown[], unknown> =>
  createLegacyMiddleware(({ blockTracker, provider, context }) => {
    const middleware = legacyCreateFilterMiddleware({
      blockTracker,
      provider,
    }) as JsonRpcMiddleware<unknown[], unknown> & { destroy(): void };

    context.addDestructor(middleware.destroy);

    return middleware;
  });
