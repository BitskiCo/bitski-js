import { Subprovider } from '@bitski/provider-engine';
import { AccessTokenProvider, JSONRPCRequestPayload, Network } from 'bitski-provider';
import JsonRpcError from 'json-rpc-error';
import uuid from 'uuid';
import { DEFAULT_AUTHORIZED_METHODS as DEFAULT_SIGNATURE_METHODS } from '../constants';
import { SignerError } from '../errors/signer-error';
import { BitskiTransactionSigner } from '../signing/transaction-signer';

type JSONRPCResponseHandler = (error?: JsonRpcError, result?: any) => void;

export enum TransactionKind {
  SendTransaction = 'ETH_SEND_TRANSACTION',
  SignTransaction = 'ETH_SIGN_TRANSACTION',
  Sign = 'ETH_SIGN',
  SignTypedData = 'ETH_SIGN_TYPED_DATA',
}

export interface Transaction {
  id: string;
  kind: TransactionKind;
  payload: TransactionPayload | SignaturePayload;
  context: TransactionContext;
}

export interface TransactionContext {
  chainId?: number;
  currentBalance?: string;
  from?: string;
}

export interface SignaturePayload {
  from: string;
  message: string;
}

export interface TransactionPayload {
  from: string;
  to?: string;
  value?: string;
  data?: string;
  nonce?: string;
  gas?: string;
  gasPrice?: string;
}

export interface TypedDataDefinition {
  name: string; // name of the property
  type: string; // 'string', 'uint', 'address', or 'CustomType' for nested structs
}
/**
 * Example usage:
 * ```javascript
 * const payload: TypedDataPayload = {
 *   types: {
 *     EIP712Domain: [
 *       { name: 'name', type: 'string' },
 *       { name: 'version', type: 'string' },
 *       { name: 'chainId', type: 'uint256' },
 *       { name: 'verifyingContract', type: 'address' },
 *     ],
 *     Person: [
 *       { name: 'name', type: 'string' },
 *       { name: 'wallet', type: 'address' }
 *     ],
 *     Mail: [
 *       { name: 'from', type: 'Person' },
 *       { name: 'to', type: 'Person' },
 *       { name: 'contents', type: 'string' }
 *     ],
 *   },
 *   primaryType: 'Mail',
 *   domain: {
 *     name: 'Ether Mail',
 *     version: '1',
 *     chainId: 1,
 *     verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
 *   },
 *   message: {
 *     from: {
 *       name: 'Cow',
 *       wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
 *     },
 *     to: {
 *       name: 'Bob',
 *       wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
 *     },
 *     contents: 'Hello, Bob!',
 *   },
 * }
 * ```
 */

export interface TypedDataPayload {
  types: {
    EIP712Domain: TypedDataDefinition[]; // Required. Specify the domain fields you are using.
    [propName: string]: TypedDataDefinition[]; // Include your custom types here.
  };
  domain: object; // Provide object format of domain according to spec in `types`
  primaryType: string; // The name of the top-level type being used in `message`
  message: object; // The values for your object, starting from the `primaryType`
}

/**
 * A Subprovider that manages the interface between JSON-RPC and Bitski's proprietary transaction signing flow.
 * This class is responsible for transforming the JSON-RPC request into a Transaction object that the Bitski signer understands.
 * Also responsible for submitting the transaction to the network, and converting the response back into an RPC response.
 *
 * Important: this class assumes the transaction has all the necessary fields populated. The TransactionValidatorSubprovider
 * should be placed in front of this subprovider.
 */
export class SignatureSubprovider extends Subprovider {
  protected network: Network;
  protected tokenProvider: AccessTokenProvider;
  protected signer: BitskiTransactionSigner;
  protected signatureMethods: string[];

  constructor(
    network: Network,
    signer: BitskiTransactionSigner,
    tokenProvider: AccessTokenProvider,
    signatureMethods?: string[],
  ) {
    super();
    this.network = network;
    this.tokenProvider = tokenProvider;
    this.signer = signer;
    this.signatureMethods = signatureMethods || DEFAULT_SIGNATURE_METHODS;
  }

  /**
   * Handle RPC request from engine (called by)
   * @param payload RPC request payload
   * @param next Callback to skip handling this request
   * @param end Completion handler
   */
  public handleRequest(payload: JSONRPCRequestPayload, next: () => void, end: JSONRPCResponseHandler): void {
    if (this.requiresSignature(payload.method)) {
      this.handleSignatureRequest(payload, end);
      return;
    }
    next();
  }

  /**
   * Called when a payload is received that needs a signature
   * @param payload The JSON-RPC request
   * @param callback The callback to call when the request has been handled
   */
  public async handleSignatureRequest(payload: JSONRPCRequestPayload, callback: JSONRPCResponseHandler) {
    try {
      // Get access token
      const accessToken = await this.tokenProvider.getAccessToken();
      // Prepare a transaction object
      const transaction = await this.createBitskiTransaction(payload);
      // Sign the transaction object
      const signedResponse = await this.signer.sign(transaction, accessToken);
      // Send the transaction if needed
      const result = await this.sendIfNeeded(payload, signedResponse);
      // Call the callback with the result
      callback(undefined, result);
    } catch (error) {
      // Call with the error if any of the steps fail
      callback(error, undefined);
    }
  }

  /** Should this subprovider handle the request?
   * @param method The RPC method of the request
   */
  protected requiresSignature(method: string): boolean {
    return this.signatureMethods.includes(method);
  }

  /**
   * This will forward transactions that should be automatically submitted to the network, otherwise
   * resolve with the original value.
   * @param payload The original request payload
   * @param signedData signed data for the transaction
   */
  protected sendIfNeeded(payload: JSONRPCRequestPayload, signedData: string): Promise<any> {
    if (payload.method === 'eth_sendTransaction') {
      // Create a send raw transaction payload
      const sendPayload = {
        id: 0,
        jsonrpc: '2.0',
        method: 'eth_sendRawTransaction',
        params: [signedData],
      };
      return this.performRequest(sendPayload);
    }
    return Promise.resolve(signedData);
  }

  /**
   * Load the balance so the web approval dialog can give the user better context
   * @param payload Payload for the request
   */
  protected loadBalanceIfNeeded(payload: JSONRPCRequestPayload): Promise<any> {
    // Only necessary if this is a transaction
    const isTransaction = payload.method === 'eth_sendTransaction' || payload.method === 'eth_signTransaction';
    const isCustomRPC = !this.network.rpcUrl.includes('api.bitski.com');
    if (isTransaction && isCustomRPC) {
      const transaction = payload.params[0];
      const balancePayload = {
        id: 0,
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [transaction.from, 'latest'],
      };
      return this.performRequest(balancePayload);
    }
    return Promise.resolve();
  }

  /**
   * Responsible for creating the Transaction object from a given RPC payload
   * @param payload JSON-RPC payload to extract the values from
   */
  protected async createBitskiTransaction(payload: JSONRPCRequestPayload): Promise<Transaction> {
    const context = await this.createContext(payload);
    const kind = this.kindForMethod(payload.method);
    const extractedPayload = this.createPayload(payload);
    const transaction = {
      id: uuid(),
      kind,
      payload: extractedPayload,
      context,
    };
    return transaction as Transaction;
  }

  private async createContext(request: JSONRPCRequestPayload): Promise<TransactionContext> {
    switch (request.method) {
      case 'eth_sendTransaction':
      case 'eth_signTransaction':
        const balance = await this.loadBalanceIfNeeded(request);
        return { chainId: this.network.chainId, currentBalance: balance };
      case 'eth_signTypedData':
      case 'eth_signTypedData_v3':
        // The from address should be the first parameter as a 20 byte hex string
        if (request.params && request.params.length > 0) {
          return { from: request.params[0] };
        }
        throw SignerError.MissingFrom();
      default:
        // Other transaction types do not need context
        return {};
    }
  }

  /**
   * Responsible for creating the payload from a given RPC request
   * @param request JSON-RPC request to extract params from
   */
  private createPayload(request: JSONRPCRequestPayload): TransactionPayload | SignaturePayload | TypedDataPayload {
    switch (request.method) {
      case 'eth_sendTransaction':
      case 'eth_signTransaction':
        if (request.params && request.params.length > 0) {
          return request.params[0] as TransactionPayload;
        } else {
          throw SignerError.MissingTransaction();
        }
      case 'eth_sign':
        if (request.params && request.params.length > 1) {
          return { from: request.params[0], message: request.params[1] };
        } else {
          throw SignerError.MissingMessage();
        }
      case 'personal_sign':
        if (request.params && request.params.length > 1) {
          return { from: request.params[1], message: request.params[0] };
        } else {
          throw SignerError.MissingMessage();
        }
      case 'eth_signTypedData':
      case 'eth_signTypedData_v3':
        if (request.params && request.params.length > 1) {
          return request.params[1] as TypedDataPayload;
        } else {
          throw SignerError.MissingTypedData();
        }
      default:
        throw SignerError.UnsupportedMethod();
    }
  }

  /**
   * Determines a BitskiTransaction.Kind value from a given RPC method name
   * @param method The JSON-RPC method being requested
   */
  private kindForMethod(method: string): TransactionKind {
    switch (method) {
      case 'eth_sendTransaction':
      case 'eth_signTransaction':
        // Convert both *sign* and *send* methods into a sign transaction.
        // (we will forward the transaction locally if needed)
        return TransactionKind.SignTransaction;
      case 'eth_sign':
      case 'personal_sign':
        return TransactionKind.Sign;
      case 'eth_signTypedData':
      case 'eth_signTypedData_v3':
        return TransactionKind.SignTypedData;
      default:
        throw SignerError.UnsupportedMethod();
    }
  }

  // Wraps emitPayload in a promise
  private performRequest(payload): Promise<any> {
    return new Promise((fulfill, reject) => {
      this.emitPayload(payload, (err, result) => {
        if (err) {
          reject(err);
        } else {
          fulfill(result.result);
        }
      });
    });
  }
}
