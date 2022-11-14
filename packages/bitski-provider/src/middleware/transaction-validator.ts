import { EthMethod, EthTransaction } from 'eth-provider-types';
import { createAsyncMiddleware, JsonRpcMiddleware } from 'json-rpc-engine';
import { getRequestContext } from '../utils/request-context';
import { expect } from '../utils/type-utils';

export const createTransactionValidatorMiddleware = (): JsonRpcMiddleware<
  [transaction: Partial<EthTransaction>],
  unknown
> => {
  return createAsyncMiddleware(async (req, _res, next) => {
    if (
      req.method === EthMethod.eth_sendTransaction ||
      req.method === EthMethod.eth_signTransaction
    ) {
      const [transaction] = expect(req.params, `${req.method} request missing required parameters`);
      const context = getRequestContext(req);

      if (transaction.from === undefined) {
        const accounts = await context.request({ method: EthMethod.eth_accounts });
        transaction.from = accounts[0];
      }
    }

    next();
  });
};
