import { EthMethod } from 'eth-provider-types';
import { createAsyncMiddleware, JsonRpcMiddleware } from 'json-rpc-engine';
import { SIGN_METHODS, SUPPORTED_CHAIN_IDS } from '../constants';
import { getRequestContext } from '../utils/request-context';
import { EthSignMethod, EthSignMethodParams } from '../types';

export const createSignatureMiddleware = (): JsonRpcMiddleware<unknown[], unknown> => {
  return createAsyncMiddleware(async (req, res, next) => {
    if (!SIGN_METHODS.includes(req.method)) {
      return next();
    }

    const context = getRequestContext(req);

    const requiresLocalSend =
      !SUPPORTED_CHAIN_IDS.includes(context.chain.chainId) &&
      req.method === EthMethod.eth_sendTransaction;

    // When we don't support a chain on the server (e.g. custom RPC url), we need
    // to sign the transaction via our flow, then send the signed payload locally
    const method = requiresLocalSend
      ? EthMethod.eth_signTransaction
      : (req.method as EthSignMethod);

    const signedResponse = await context.config.sign(
      method,
      req.params as EthSignMethodParams[EthSignMethod],
      context,
    );

    res.result = requiresLocalSend
      ? context.request({ method: EthMethod.eth_sendRawTransaction, params: [signedResponse] })
      : signedResponse;
  });
};
