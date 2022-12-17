import { EthMethod, EthRequest } from 'eth-provider-types';
import { JsonRpcMiddleware, JsonRpcRequest } from 'json-rpc-engine';
import { RequestContext } from '../types';
import { PollingBlockTracker } from 'eth-block-tracker';
import type { Provider } from 'eth-block-tracker/dist/BaseBlockTracker';
import { getRequestContext } from './request-context';

export default class LegacyMiddlewareProvider {
  blockTracker: PollingBlockTracker;

  constructor(private context: RequestContext) {
    this.blockTracker = new PollingBlockTracker({
      // The only method used in block trackers is `sendAsync`
      provider: this as unknown as Provider,
      pollingInterval: context.config.pollingInterval,
      setSkipCacheFlag: true,
    });
  }

  sendAsync<T extends EthMethod>(
    // Skip cache comes from block tracker and legacy middlewares
    request: JsonRpcRequest<unknown[]> & { skipCache: boolean },
    callback: (err: unknown, result?: unknown) => void,
  ): void {
    this.context
      .request({ method: request.method, params: request.params } as EthRequest<T>, {
        skipCache: request.skipCache,
      })
      .then((result) => {
        callback(null, { result });
      })
      .catch((err) => {
        callback(err);
      });
  }
}

const PROVIDERS = new Map<string, LegacyMiddlewareProvider>();

// exported for tests
export const clearLegacyProviders = (): void => PROVIDERS.clear();

export const getLegacyMiddlewareProviderFor = (
  context: RequestContext,
): LegacyMiddlewareProvider => {
  let provider = PROVIDERS.get(context.chain.chainId);

  if (!provider) {
    provider = new LegacyMiddlewareProvider(context);
    PROVIDERS.set(context.chain.chainId, provider);
  }

  return provider;
};

export const createLegacyMiddleware = (
  createMiddleware: (params: {
    blockTracker: PollingBlockTracker;
    provider: LegacyMiddlewareProvider;
    context: RequestContext;
  }) => JsonRpcMiddleware<any, any>,
): JsonRpcMiddleware<unknown[], unknown> => {
  const MIDDLEWARES = new Map<string, JsonRpcMiddleware<unknown[], unknown>>();

  const getMiddlewareFor = (context: RequestContext) => {
    let middleware = MIDDLEWARES.get(context.chain.chainId);

    if (!middleware) {
      const legacyProvider = getLegacyMiddlewareProviderFor(context);
      middleware = createMiddleware({
        context,
        provider: legacyProvider,
        blockTracker: legacyProvider.blockTracker,
      });

      MIDDLEWARES.set(context.chain.chainId, middleware);
    }

    return middleware;
  };

  return (req, res, next, end) => {
    const context = getRequestContext(req);

    const middleware = getMiddlewareFor(context);

    middleware(req, res, next, end);
  };
};
