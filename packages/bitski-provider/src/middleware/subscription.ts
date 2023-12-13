import { JsonRpcMiddleware } from 'json-rpc-engine';
import createSubscriptionManager from 'eth-json-rpc-filters/subscriptionManager';
import { createLegacyMiddleware } from '../utils/legacy-middleware';
import SafeEventEmitter from '@metamask/safe-event-emitter';
import { EthEvent, EthProviderMessageType } from 'eth-provider-types';

interface SubNotification {
  params: {
    subscription: string;
    result: unknown;
  };
}

export const createSubscriptionMiddleware = (): JsonRpcMiddleware<unknown[], unknown> =>
  createLegacyMiddleware(({ blockTracker, provider, context }) => {
    const manager = createSubscriptionManager({ blockTracker, provider }) as {
      middleware: JsonRpcMiddleware<unknown[], unknown> & { destroy(): void };
      events: SafeEventEmitter;
    };

    manager.events.on('notification', (notification: SubNotification) => {
      const data = {
        ...notification.params,
        subscription: `${context.chain.chainId}:${notification.params.subscription}`,
      };

      context.emit(EthEvent.message, {
        type: EthProviderMessageType.eth_subscription,
        data,
      });

      context.emit(EthEvent.data, null, { params: data });
    });

    context.addDestructor(manager.middleware.destroy);

    return manager.middleware;
  });
