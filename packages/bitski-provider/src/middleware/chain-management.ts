import {
  EthChainDefinition,
  EthEvent,
  EthMethod,
  SwitchEthereumChainParameter,
} from 'eth-provider-types';
import { ethErrors } from 'eth-rpc-errors';
import { createAsyncMiddleware, JsonRpcMiddleware } from 'json-rpc-engine';
import { getRequestContext } from '../utils/request-context';
import { expect } from '../utils/type-utils';

export const createEthChainMiddleware = (): JsonRpcMiddleware<unknown[], unknown> => {
  return createAsyncMiddleware(async (req, res, next) => {
    const { method } = req;
    const context = getRequestContext(req);

    if (method === EthMethod.eth_chainId) {
      res.result = context.chain.chainId;

      return;
    }

    if (method === EthMethod.wallet_addEthereumChain) {
      const definition = expect(
        req.params?.[0],
        'addEthereumChain requires a chain definition parameter',
      ) as EthChainDefinition;

      context.store.addChain(definition);

      res.result = null;

      return;
    }

    if (method === EthMethod.wallet_switchEthereumChain) {
      const chainDetails = expect(
        req.params?.[0],
        'switchEthereumChain requires a chainId',
      ) as SwitchEthereumChainParameter;

      const chain = context.store.findChain(chainDetails.chainId);

      if (!chain) {
        throw ethErrors.provider.userRejectedRequest({ message: 'Chain does not exist' });
      }

      await context.store.setCurrentChainId(chainDetails.chainId);
      context.emit(EthEvent.chainChanged, chainDetails.chainId);

      res.result = null;

      return;
    }

    return next();
  });
};
