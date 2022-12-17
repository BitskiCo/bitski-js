import { JsonRpcRequest } from 'json-rpc-engine';
import { RequestContext } from '../types';
import { expect } from './type-utils';

export const getRequestContext = (req: JsonRpcRequest<unknown[]>): RequestContext => {
  return expect(
    (req as unknown as { context: RequestContext }).context,
    'no context found on this request',
  );
};

export const setRequestContext = (
  req: JsonRpcRequest<unknown[]>,
  context: RequestContext,
): void => {
  (req as unknown as { context: RequestContext }).context = context;
};
