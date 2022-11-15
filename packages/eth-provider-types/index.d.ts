/**
 * Provider API types from: https://eips.ethereum.org/EIPS/eip-1193#appendix-i-consumer-facing-api-documentation
 * JSON RPC API types from: https://ethereum.org/en/developers/docs/apis/json-rpc/#web3_clientversion
 */

/***** JSON RPC *****/

export const enum EthMethod {
  web3_clientVersion = 'web3_clientVersion',
  web3_sha3 = 'web3_sha3',
  net_version = 'net_version',
  net_listening = 'net_listening',
  net_peerCount = 'net_peerCount',
  eth_protocolVersion = 'eth_protocolVersion',
  eth_syncing = 'eth_syncing',
  eth_coinbase = 'eth_coinbase',
  eth_mining = 'eth_mining',
  eth_hashrate = 'eth_hashrate',
  eth_gasPrice = 'eth_gasPrice',
  eth_accounts = 'eth_accounts',
  eth_blockNumber = 'eth_blockNumber',
  eth_getBalance = 'eth_getBalance',
  eth_getStorageAt = 'eth_getStorageAt',
  eth_getTransactionCount = 'eth_getTransactionCount',
  eth_getBlockTransactionCountByHash = 'eth_getBlockTransactionCountByHash',
  eth_getBlockTransactionCountByNumber = 'eth_getBlockTransactionCountByNumber',
  eth_getUncleCountByBlockHash = 'eth_getUncleCountByBlockHash',
  eth_getUncleCountByBlockNumber = 'eth_getUncleCountByBlockNumber',
  eth_getCode = 'eth_getCode',
  eth_sign = 'eth_sign',
  eth_signTransaction = 'eth_signTransaction',
  eth_sendTransaction = 'eth_sendTransaction',
  eth_sendRawTransaction = 'eth_sendRawTransaction',
  eth_call = 'eth_call',
  eth_estimateGas = 'eth_estimateGas',
  eth_getBlockByHash = 'eth_getBlockByHash',
  eth_getBlockByNumber = 'eth_getBlockByNumber',
  eth_getTransactionByHash = 'eth_getTransactionByHash',
  eth_getTransactionByBlockHashAndIndex = 'eth_getTransactionByBlockHashAndIndex',
  eth_getTransactionByBlockNumberAndIndex = 'eth_getTransactionByBlockNumberAndIndex',
  eth_getTransactionReceipt = 'eth_getTransactionReceipt',
  eth_getUncleByBlockHashAndIndex = 'eth_getUncleByBlockHashAndIndex',
  eth_getUncleByBlockNumberAndIndex = 'eth_getUncleByBlockNumberAndIndex',
  eth_newFilter = 'eth_newFilter',
  eth_newBlockFilter = 'eth_newBlockFilter',
  eth_newPendingTransactionFilter = 'eth_newPendingTransactionFilter',
  eth_uninstallFilter = 'eth_uninstallFilter',
  eth_getFilterChanges = 'eth_getFilterChanges',
  eth_getFilterLogs = 'eth_getFilterLogs',
  eth_getLogs = 'eth_getLogs',
  eth_getWork = 'eth_getWork',
  eth_submitWork = 'eth_submitWork',
  eth_submitHashrate = 'eth_submitHashrate',
}

export const enum EthBlockNumberTag {
  Latest = 'latest',
  Earliest = 'earliest',
  Pending = 'pending',
}

export interface EthTransactionSend {
  from: string;
  to?: string;
  gas?: string;
  gasPrice?: string;
  value?: string;
  data: string;
  nonce?: string;
}

export interface EthTransactionCall {
  from?: string;
  to: string;
  gas?: string;
  gasPrice?: string;
  value?: string;
  data?: string;
}

interface EthTransactionBase {
  blockHash: string | null;
  blockNumber: string | null;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to: string | null;
  transactionIndex: string | null;
  value: string;
  v: string;
  r: string;
  s: string;
}

export interface EthTransactionComplete extends EthTransactionBase {
  blockHash: string;
  blockNumber: string;
  transactionIndex: string;
}

export interface EthTransactionPending extends EthTransactionBase {
  blockHash: null;
  blockNumber: null;
  transactionIndex: null;
}

export type EthTransaction = EthTransactionComplete | EthTransactionPending;

interface EthTransactionReceipt<IsContractCreation extends boolean = boolean> {
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  blockNumber: string;
  from: string;
  to: IsContractCreation extends true ? null : string;
  cumulativeGasUsed: string;
  effectiveGasPrice: string;
  gasUsed: string;
  contractAddress: IsContractCreation extends true ? string : null;
  logs: EthLog[];
  logsBloom: string;
  type: '0x0' | '0x1' | '0x2';
  status?: '0x0' | '0x1';
  root?: string;
}

export type EthTopic = string | null | [string, string];

interface EthLogBase {
  removed: boolean;
  logIndex: string | null;
  transactionIndex: string | null;
  transactionHash: string | null;
  blockHash: string | null;
  blockNumber: string | null;
  address: string;
  data: string;
  topics: EthTopic[];
}

export interface EthLogComplete extends EthLogBase {
  logIndex: string;
  transactionIndex: string;
  transactionHash: string;
  blockHash: string;
  blockNumber: string;
}

export interface EthLogPending extends EthLogBase {
  logIndex: null;
  transactionIndex: null;
  transactionHash: null;
  blockHash: null;
  blockNumber: null;
}

export type EthLog = EthLogComplete | EthLogPending;

interface EthBlockBase<ReturnFullTransaction extends boolean> {
  number: string | null;
  hash: string | null;
  parentHash: string | null;
  nonce: string;
  sha3Uncles: string | null;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  extraData: string;
  size: string;
  gasLimit: string;
  gasUsed: string;
  timestamp: string;
  transactions: ReturnFullTransaction extends true ? EthTransaction[] : string[];
  uncles: string[];
}

export interface EthBlockComplete<T extends boolean = boolean> extends EthBlockBase<T> {
  number: string;
  hash: string;
  parentHash: string;
  sha3Uncles: string;
}

export interface EthBlockPending<T extends boolean = boolean> extends EthBlockBase<T> {
  number: null;
  hash: null;
  parentHash: null;
  sha3Uncles: null;
}

export type EthBlock<T extends boolean = boolean> = EthBlockComplete<T> | EthBlockPending<T>;

type EthGetBlockParams<T extends boolean> = [blockHashOrNumber: string, returnFullTransaction: T];

export type EthMethodParams = {
  [EthMethod.web3_clientVersion]: void;
  [EthMethod.web3_sha3]: void;
  [EthMethod.net_version]: void;
  [EthMethod.net_listening]: void;
  [EthMethod.net_peerCount]: void;
  [EthMethod.eth_protocolVersion]: void;
  [EthMethod.eth_syncing]: void;
  [EthMethod.eth_coinbase]: void;
  [EthMethod.eth_mining]: void;
  [EthMethod.eth_hashrate]: void;
  [EthMethod.eth_gasPrice]: void;
  [EthMethod.eth_accounts]: void;
  [EthMethod.eth_blockNumber]: void;
  [EthMethod.eth_getBalance]: [address: string, tag?: EthBlockNumberTag | string];
  [EthMethod.eth_getStorageAt]: [
    address: string,
    position: string,
    tag?: EthBlockNumberTag | string,
  ];
  [EthMethod.eth_getTransactionCount]: [address: string, tag?: EthBlockNumberTag | string];
  [EthMethod.eth_getBlockTransactionCountByHash]: { params: [blockHash: string]; result: any };
  [EthMethod.eth_getBlockTransactionCountByNumber]: [tag: EthBlockNumberTag | string];
  [EthMethod.eth_getUncleCountByBlockHash]: { params: [blockHash: string]; result: any };
  [EthMethod.eth_getUncleCountByBlockNumber]: [tag: EthBlockNumberTag | string];
  [EthMethod.eth_getCode]: [address: string, tag?: EthBlockNumberTag | string];
  [EthMethod.eth_sign]: { params: [address: string, data: string]; result: any };
  [EthMethod.eth_signTransaction]: { params: [transaction: EthTransactionSend]; result: any };
  [EthMethod.eth_sendTransaction]: { params: [transaction: EthTransactionSend]; result: any };
  [EthMethod.eth_sendRawTransaction]: { params: [data: string]; result: any };
  [EthMethod.eth_call]: [transactionCall: EthTransactionCall, tag?: EthBlockNumberTag | string];
  [EthMethod.eth_estimateGas]: [
    transactionCall: EthTransactionCall,
    tag?: EthBlockNumberTag | string,
  ];
  [EthMethod.eth_getBlockByHash]: EthGetBlockParams<boolean>;
  [EthMethod.eth_getBlockByNumber]: EthGetBlockParams<boolean>;
  [EthMethod.eth_getTransactionByHash]: [hash: string];
  [EthMethod.eth_getTransactionByBlockHashAndIndex]: [hash: string, index: string];
  [EthMethod.eth_getTransactionByBlockNumberAndIndex]: [number: string, index: string];
  [EthMethod.eth_getTransactionReceipt]: [hash: string];
  [EthMethod.eth_getUncleByBlockHashAndIndex]: [hash: string, index: string];
  [EthMethod.eth_getUncleByBlockNumberAndIndex]: [number: string, index: string];
  [EthMethod.eth_newFilter]: [
    {
      fromBlock?: string;
      toBlock?: string;
      address?: string;
      topics?: EthTopic[];
    },
  ];
  [EthMethod.eth_newBlockFilter]: void;
  [EthMethod.eth_newPendingTransactionFilter]: void;
  [EthMethod.eth_uninstallFilter]: [filterId: string];
  [EthMethod.eth_getFilterChanges]: [filterId: string];
  [EthMethod.eth_getFilterLogs]: [filterId: string];
  [EthMethod.eth_getLogs]: [
    {
      fromBlock?: string;
      toBlock?: string;
      address?: string;
      topics?: EthTopic[];
      blockHash?: string;
    },
  ];
  [EthMethod.eth_getWork]: void;
  [EthMethod.eth_submitWork]: [nonce: string, headerHash: string, mixDigest: string];
  [EthMethod.eth_submitHashrate]: [hashrate: string, id: string];
};

export type EthMethodResults = {
  [EthMethod.web3_clientVersion]: string;
  [EthMethod.web3_sha3]: string;
  [EthMethod.net_version]: string;
  [EthMethod.net_listening]: boolean;
  [EthMethod.net_peerCount]: string;
  [EthMethod.eth_protocolVersion]: string;
  [EthMethod.eth_syncing]:
    | { startingBlock: string; currentBlock: string; highestBlock: string }
    | false;
  [EthMethod.eth_coinbase]: string;
  [EthMethod.eth_mining]: boolean;
  [EthMethod.eth_hashrate]: string;
  [EthMethod.eth_gasPrice]: string;
  [EthMethod.eth_accounts]: string[];
  [EthMethod.eth_blockNumber]: string;
  [EthMethod.eth_getBalance]: string;
  [EthMethod.eth_getStorageAt]: string;
  [EthMethod.eth_getTransactionCount]: string;
  [EthMethod.eth_getBlockTransactionCountByHash]: string;
  [EthMethod.eth_getBlockTransactionCountByNumber]: string;
  [EthMethod.eth_getUncleCountByBlockHash]: string;
  [EthMethod.eth_getUncleCountByBlockNumber]: string;
  [EthMethod.eth_getCode]: string;
  [EthMethod.eth_sign]: string;
  [EthMethod.eth_signTransaction]: string;
  [EthMethod.eth_sendTransaction]: string;
  [EthMethod.eth_sendRawTransaction]: string;
  [EthMethod.eth_call]: string;
  [EthMethod.eth_estimateGas]: string;
  [EthMethod.eth_getBlockByHash]: EthBlock<boolean>;
  [EthMethod.eth_getBlockByNumber]: EthBlock<boolean>;
  [EthMethod.eth_getTransactionByHash]: EthTransaction | null;
  [EthMethod.eth_getTransactionByBlockHashAndIndex]: EthTransaction | null;
  [EthMethod.eth_getTransactionByBlockNumberAndIndex]: EthTransaction | null;
  [EthMethod.eth_getTransactionReceipt]: EthTransactionReceipt | null;
  [EthMethod.eth_getUncleByBlockHashAndIndex]: EthBlock<false>;
  [EthMethod.eth_getUncleByBlockNumberAndIndex]: EthBlock<false>;
  [EthMethod.eth_newFilter]: string;
  [EthMethod.eth_newBlockFilter]: string;
  [EthMethod.eth_newPendingTransactionFilter]: string;
  [EthMethod.eth_uninstallFilter]: boolean;
  [EthMethod.eth_getFilterChanges]: string[] | EthLog[];
  [EthMethod.eth_getFilterLogs]: string[] | EthLog[];
  [EthMethod.eth_getLogs]: string[] | EthLog[];
  [EthMethod.eth_getWork]: [headerHash: string, seedHash: string, boundaryCondition: string];
  [EthMethod.eth_submitWork]: boolean;
  [EthMethod.eth_submitHashrate]: true;
};

/***** RPC Errors *****/

export const enum EthProviderRpcErrorCode {
  UserRejectedRequest = 4001,
  Unauthorized = 4100,
  UnsupportedMethod = 4200,
  Disconnected = 4900,
  ChainDisconnected = 4901,
}

export interface EthProviderRpcError extends Error {
  code: number;
  data?: unknown;
}

/***** Events *****/

export const enum EthEvent {
  message = 'message',
  connect = 'connect',
  disconnect = 'disconnect',
  chainChanged = 'chainChanged',
  accountsChanged = 'accountsChanged',
}

export const enum EthProviderMessageType {
  eth_subscription = 'eth_subscription',
}

export type EthProviderMessageData = {
  [EthProviderMessageType.eth_subscription]: {
    readonly subscription: string;
    readonly result: unknown;
  };
};

export interface EthProviderMessage {
  type: EthProviderMessageType;
  data: EthProviderMessageData[EthProviderMessageType];
}

interface EthProviderConnectInfo {
  readonly chainId: string;
}

export type EthEventParams = {
  [EthEvent.message]: [EthProviderMessage];
  [EthEvent.connect]: [EthProviderConnectInfo];
  [EthEvent.disconnect]: [{ error: EthProviderRpcError }];
  [EthEvent.chainChanged]: [string];
  [EthEvent.accountsChanged]: [string[]];
};

/***** Provider *****/

export type EthRequest<T extends EthMethod> = EthMethodParams[T] extends void
  ? {
      method: T;
      params?: [];
    }
  : {
      method: T;
      params: EthMethodParams[T];
    };

export type EthResult<T extends EthMethod> = Promise<EthMethodResults[T]>;

export type EthEventListener<T extends EthEvent> = (...params: EthEventParams[T]) => void;

export interface EthProvider {
  request<T extends boolean>(request: {
    method: EthMethod.eth_getBlockByHash | EthMethod.eth_getBlockByNumber;
    params: EthGetBlockParams<T>;
  }): Promise<EthBlock<T>>;
  request<T extends EthMethod>(req: EthRequest<T>): EthMethodResults[T];

  on<T extends EthEvent>(eventName: T, listener: EthEventListener<T>): void;
  removeListener<T extends EthEvent>(eventName: T, listener: EthEventListener<T>): void;
}
