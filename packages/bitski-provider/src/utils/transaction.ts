import { EthMethod, EthTransactionSend, TypedData } from 'eth-provider-types';
import { ethErrors } from 'eth-rpc-errors';
import { SUPPORTED_CHAIN_IDS } from '../constants';
import {
  EthSignMethod,
  EthSignMethodParams,
  EthChainDefinitionWithRpcUrl,
  RequestContext,
} from '../types';
import { v4 as uuid } from 'uuid';

export const enum TransactionKind {
  SendTransaction = 'ETH_SEND_TRANSACTION',
  SignTransaction = 'ETH_SIGN_TRANSACTION',
  Sign = 'ETH_SIGN',
  SignTypedData = 'ETH_SIGN_TYPED_DATA',
  SignTypedDataV3 = 'ETH_SIGN_TYPED_DATA_V3',
  SignTypedDataV4 = 'ETH_SIGN_TYPED_DATA_V4',
}

export interface Transaction {
  id: string;
  kind: TransactionKind;
  payload: EthTransactionSend | SignaturePayload | TypedData;
  context: TransactionContext;
}

export interface TransactionContext {
  chainId?: number;
  rpcUrl?: string;
  from?: string;
  [key: string]: unknown;
}

export interface SignaturePayload {
  from: string;
  message: string;
}

/**
 * Responsible for creating the Transaction object from a given RPC payload
 * @param req JSON-RPC payload to extract the values from
 */
export const createBitskiTransaction = <T extends EthSignMethod>(
  method: T,
  params: EthSignMethodParams[T],
  requestContext: Pick<RequestContext, 'chain' | 'signContext'>,
): Transaction => {
  const context = createContext(method, params, requestContext.chain, requestContext);
  const kind = kindForMethod(method);
  const extractedPayload = createPayload(method, params);
  return {
    id: uuid(),
    kind,
    payload: extractedPayload,
    context,
  };
};

const createContext = <T extends EthSignMethod>(
  method: T,
  params: EthSignMethodParams[T],
  chain: EthChainDefinitionWithRpcUrl,
  requestContext: Pick<RequestContext, 'chain' | 'signContext'>,
): TransactionContext => {
  switch (method) {
    case 'personal_sign':
    case EthMethod.eth_sign:
    case EthMethod.eth_sendTransaction:
    case EthMethod.eth_signTransaction: {
      return {
        chainId: parseInt(chain.chainId, 16),
        rpcUrl: !SUPPORTED_CHAIN_IDS.includes(chain.chainId) ? chain.rpcUrls[0] : undefined,
        ...requestContext.signContext,
      };
    }
    case EthMethod.eth_signTypedData:
    case EthMethod.eth_signTypedData_v1:
    case EthMethod.eth_signTypedData_v3:
    case EthMethod.eth_signTypedData_v4:
      // The from address should be the first parameter as a 20 byte hex string
      if (params && params?.length > 0) {
        return {
          from: params[0] as string,
          ...requestContext.signContext,
        };
      }
      throw ethErrors.rpc.invalidParams('Missing from');
    default:
      throw ethErrors.rpc.internal('Unsupported method');
  }
};

/**
 * Responsible for creating the payload from a given RPC request
 * @param req JSON-RPC request to extract params from
 */
const createPayload = <T extends EthSignMethod>(
  method: T,
  params: EthSignMethodParams[T],
): EthTransactionSend | SignaturePayload | TypedData => {
  switch (method) {
    case EthMethod.eth_sendTransaction:
    case EthMethod.eth_signTransaction:
      if (params && params.length > 0) {
        return params[0] as EthTransactionSend;
      } else {
        throw ethErrors.rpc.invalidParams('Missing transaction');
      }

    case EthMethod.eth_sign:
      if (params && params.length > 1) {
        return { from: params[0] as string, message: params[1] as string };
      } else {
        throw ethErrors.rpc.invalidParams('Missing message');
      }

    case 'personal_sign':
      if (params && params.length > 1) {
        // If the first param is a wallet address, flip the parameter ordering for personal_sign
        // so that it matches eth_sign. This is to gracefully respect Dapps who adopted Metamask's
        // API for personal_sign early, and recover from the wrong param order
        // when it is clearly identifiable.

        const [first, second] = params as string[];

        if (first.startsWith('0x') && first.length === 42) {
          return { from: first, message: second };
        }
        return { from: second, message: first };
      } else {
        throw ethErrors.rpc.invalidParams('Missing message');
      }

    case EthMethod.eth_signTypedData:
    case EthMethod.eth_signTypedData_v3:
    case EthMethod.eth_signTypedData_v4:
      if (params && params.length > 1) {
        return params[1] as TypedData;
      } else {
        throw ethErrors.rpc.invalidParams('Missing typed data');
      }

    default:
      throw ethErrors.rpc.internal('Unsupported method');
  }
};

/**
 * Determines a BitskiTransaction.Kind value from a given RPC method name
 * @param method The JSON-RPC method being requested
 */
const kindForMethod = (method: string): TransactionKind => {
  switch (method) {
    case EthMethod.eth_sendTransaction:
      return TransactionKind.SendTransaction;
    case EthMethod.eth_signTransaction:
      return TransactionKind.SignTransaction;
    case EthMethod.eth_sign:
    case 'personal_sign':
      return TransactionKind.Sign;
    case EthMethod.eth_signTypedData:
      return TransactionKind.SignTypedData;
    case EthMethod.eth_signTypedData_v3:
      return TransactionKind.SignTypedDataV3;
    case EthMethod.eth_signTypedData_v4:
      return TransactionKind.SignTypedDataV4;
    default:
      throw ethErrors.rpc.internal('Unsupported method');
  }
};
