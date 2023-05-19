/**
 * Provider API types from: https://eips.ethereum.org/EIPS/eip-1193#appendix-i-consumer-facing-api-documentation
 * JSON RPC API types from: https://ethereum.org/en/developers/docs/apis/json-rpc/#web3_clientversion
 */

/***** JSON RPC *****/

export enum EthMethod {
  alchemy_requestPaymasterAndData = 'alchemy_requestPaymasterAndData',
  web3_clientVersion = 'web3_clientVersion',
  web3_sha3 = 'web3_sha3',
  net_version = 'net_version',
  net_listening = 'net_listening',
  net_peerCount = 'net_peerCount',
  eth_protocolVersion = 'eth_protocolVersion',
  eth_syncing = 'eth_syncing',
  eth_coinbase = 'eth_coinbase',
  eth_createAccessList = 'eth_createAccessList',
  eth_feeHistory = 'eth_feeHistory',
  eth_mining = 'eth_mining',
  eth_hashrate = 'eth_hashrate',
  eth_gasPrice = 'eth_gasPrice',
  eth_accounts = 'eth_accounts',
  eth_requestAccounts = 'eth_requestAccounts',
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
  eth_signTypedData = 'eth_signTypedData',
  eth_signTypedData_v1 = 'eth_signTypedData_v1',
  eth_signTypedData_v3 = 'eth_signTypedData_v3',
  eth_signTypedData_v4 = 'eth_signTypedData_v4',
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
  eth_maxPriorityFeePerGas = 'eth_maxPriorityFeePerGas',
  eth_newFilter = 'eth_newFilter',
  eth_newBlockFilter = 'eth_newBlockFilter',
  eth_newPendingTransactionFilter = 'eth_newPendingTransactionFilter',
  eth_uninstallFilter = 'eth_uninstallFilter',
  eth_getFilterChanges = 'eth_getFilterChanges',
  eth_getFilterLogs = 'eth_getFilterLogs',
  eth_getLogs = 'eth_getLogs',
  eth_getProof = 'eth_getProof',
  eth_getWork = 'eth_getWork',
  eth_submitWork = 'eth_submitWork',
  eth_submitHashrate = 'eth_submitHashrate',
  eth_chainId = 'eth_chainId',
  eth_subscribe = 'eth_subscribe',
  eth_unsubscribe = 'eth_unsubscribe',
  eth_estimateUserOperationGas = 'eth_estimateUserOperationGas',
  eth_getUserOperationByHash = 'eth_getUserOperationByHash',
  eth_getUserOperationReceipt = 'eth_getUserOperationReceipt',
  eth_supportedEntryPoints = 'eth_supportedEntryPoints',
  eth_sendUserOperation = 'eth_sendUserOperation',
  wallet_addEthereumChain = 'wallet_addEthereumChain',
  wallet_switchEthereumChain = 'wallet_switchEthereumChain',
  wallet_requestPermissions = 'wallet_requestPermissions',
  wallet_getPermissions = 'wallet_getPermissions',
}

export enum EthBlockNumberTag {
  Latest = 'latest',
  Earliest = 'earliest',
  Pending = 'pending',
}

export interface EthTransactionSend {
  from?: string;
  to?: string;
  gas?: string;
  gasPrice?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  value?: string;
  data?: string;
  nonce?: string;
}

export interface EthTransactionCall {
  from?: string;
  to: string;
  gas?: string;
  gasPrice?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
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

export interface EthTransactionReceipt<IsContractCreation extends boolean = boolean> {
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

export type EthGetBlockParams<T extends boolean> = [
  blockHashOrNumber: string,
  returnFullTransaction: T,
];

export interface TypedPropertyDef {
  name: string;
  type: string;
}

export type TypedDataDefinition = TypedPropertyDef[];

export interface TypedDataTypes {
  EIP712Domain: TypedDataDefinition; // Required. Specify the domain fields you are using.
  [typeName: string]: TypedDataDefinition;
}

export interface TypedData {
  types: TypedDataTypes;
  domain: Record<string, unknown>; // Provide object format of domain according to spec in `types`
  primaryType: string; // The name of the top-level type being used in `message`
  message: Record<string, unknown>; // The values for your object, starting from the `primaryType`
}

export interface EthChainDefinition {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName?: string;
  nativeCurrency?: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: number;
  };
  rpcUrls?: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export interface AccessList {
  address: string;
  storageKeys: string[];
}

export interface SwitchEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
}

export interface Web3WalletPermission {
  // The name of the method corresponding to the permission
  parentCapability: string;

  // The date the permission was granted, in UNIX epoch time
  date?: number;
}

export interface UserOperation {
  sender: string;
  nonce: string;
  initCode?: string;
  callData: string;
  callGasLimit?: string;
  verificationGasLimit?: string;
  preVerificationGas?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  paymasterAndData?: string;
  signature?: string;
}

export interface UserOperationReceipt {
  userOpHash: string;
  entryPoint: string;
  sender: string;
  nonce: string;
  paymaster: string;
  actualGasCost: string;
  actualGasUsed: string;
  success: boolean;
  reason: string;
  logs: EthLog[];
  receipt: EthTransactionReceipt;
}

export interface RequestedPermissions {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [methodName: string]: {}; // an empty object, for future extensibility
}

export type EthMethodParams = {
  [EthMethod.alchemy_requestPaymasterAndData]: [
    policyId: string,
    entrypointAddress: string,
    userOperation: UserOperation,
  ];
  [EthMethod.web3_clientVersion]: void;
  [EthMethod.web3_sha3]: void;
  [EthMethod.net_version]: void;
  [EthMethod.net_listening]: void;
  [EthMethod.net_peerCount]: void;
  [EthMethod.eth_protocolVersion]: void;
  [EthMethod.eth_syncing]: void;
  [EthMethod.eth_coinbase]: void;
  [EthMethod.eth_createAccessList]: [
    transaction: EthTransaction,
    block?: EthBlockNumberTag | string,
  ];
  [EthMethod.eth_feeHistory]: [
    blockCount: string,
    newestBlock: EthBlockNumberTag | string,
    rewardPercentiles: number[],
  ];
  [EthMethod.eth_mining]: void;
  [EthMethod.eth_hashrate]: void;
  [EthMethod.eth_gasPrice]: void;
  [EthMethod.eth_accounts]: void;
  [EthMethod.eth_requestAccounts]: void;
  [EthMethod.eth_blockNumber]: void;
  [EthMethod.eth_getBalance]: [address: string, tag?: EthBlockNumberTag | string];
  [EthMethod.eth_getStorageAt]: [
    address: string,
    position: string,
    tag?: EthBlockNumberTag | string,
  ];
  [EthMethod.eth_getTransactionCount]: [address: string, tag?: EthBlockNumberTag | string];
  [EthMethod.eth_getBlockTransactionCountByHash]: [blockHash: string];
  [EthMethod.eth_getBlockTransactionCountByNumber]: [tag: EthBlockNumberTag | string];
  [EthMethod.eth_getUncleCountByBlockHash]: [blockHash: string];
  [EthMethod.eth_getUncleCountByBlockNumber]: [tag: EthBlockNumberTag | string];
  [EthMethod.eth_getCode]: [address: string, tag?: EthBlockNumberTag | string];
  [EthMethod.eth_sign]: [address: string, data: string];
  [EthMethod.eth_signTransaction]: [transaction: EthTransactionSend];
  [EthMethod.eth_signTypedData]: [address: string, data: string | TypedData];
  [EthMethod.eth_signTypedData_v1]: [address: string, data: string | TypedData];
  [EthMethod.eth_signTypedData_v3]: [address: string, data: string | TypedData];
  [EthMethod.eth_signTypedData_v4]: [address: string, data: string | TypedData];
  [EthMethod.eth_sendTransaction]: [transaction: EthTransactionSend];
  [EthMethod.eth_sendRawTransaction]: [data: string];
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
  [EthMethod.eth_maxPriorityFeePerGas]: void;
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
  [EthMethod.eth_getProof]: [
    address: string,
    storageKeys: string[],
    block: EthBlockNumberTag | string,
  ];
  [EthMethod.eth_getWork]: void;
  [EthMethod.eth_submitWork]: [nonce: string, headerHash: string, mixDigest: string];
  [EthMethod.eth_submitHashrate]: [hashrate: string, id: string];
  [EthMethod.eth_chainId]: void;
  [EthMethod.eth_subscribe]: [subscriptionName: string, data?: unknown];
  [EthMethod.eth_unsubscribe]: [subscriptionId: string];
  [EthMethod.wallet_addEthereumChain]: [definition: EthChainDefinition];
  [EthMethod.wallet_switchEthereumChain]: [SwitchEthereumChainParameter];
  [EthMethod.wallet_getPermissions]: void;
  [EthMethod.wallet_requestPermissions]: RequestedPermissions[];
  [EthMethod.eth_estimateUserOperationGas]: [
    userOperations: UserOperation[],
    entrypointAddress: string,
  ];
  [EthMethod.eth_getUserOperationByHash]: [hash: string];
  [EthMethod.eth_getUserOperationReceipt]: [hash: string];
  [EthMethod.eth_supportedEntryPoints]: void;
  [EthMethod.eth_sendUserOperation]: [userOperations: UserOperation[], entrypointAddress: string];
};

export type EthMethodResults = {
  [EthMethod.alchemy_requestPaymasterAndData]: string;
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
  [EthMethod.eth_createAccessList]: { accessList: AccessList[]; gasUsed: string };
  [EthMethod.eth_feeHistory]: { accessList: AccessList[]; gasUsed: string };
  [EthMethod.eth_mining]: boolean;
  [EthMethod.eth_hashrate]: string;
  [EthMethod.eth_gasPrice]: string;
  [EthMethod.eth_accounts]: string[];
  [EthMethod.eth_requestAccounts]: string[];
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
  [EthMethod.eth_signTypedData]: string;
  [EthMethod.eth_signTypedData_v1]: string;
  [EthMethod.eth_signTypedData_v3]: string;
  [EthMethod.eth_signTypedData_v4]: string;
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
  [EthMethod.eth_maxPriorityFeePerGas]: {
    oldestBlock: string;
    baseFeePerGas: string[];
    gasUsedRatio?: number[];
    reward?: string[][];
  };
  [EthMethod.eth_newBlockFilter]: string;
  [EthMethod.eth_newPendingTransactionFilter]: string;
  [EthMethod.eth_uninstallFilter]: boolean;
  [EthMethod.eth_getFilterChanges]: string[] | EthLog[];
  [EthMethod.eth_getFilterLogs]: string[] | EthLog[];
  [EthMethod.eth_getLogs]: string[] | EthLog[];
  [EthMethod.eth_getProof]: {
    address: string;
    accountProof: string[];
    balance: string;
    codeHash: string;
    nonce: string;
    storageHash: string;
    storageProof?: { key: string; value: string; proof: string[] }[];
  };
  [EthMethod.eth_getWork]: [headerHash: string, seedHash: string, boundaryCondition: string];
  [EthMethod.eth_submitWork]: boolean;
  [EthMethod.eth_submitHashrate]: true;
  [EthMethod.eth_chainId]: string;
  [EthMethod.eth_subscribe]: string;
  [EthMethod.eth_unsubscribe]: boolean;
  [EthMethod.wallet_addEthereumChain]: null;
  [EthMethod.wallet_switchEthereumChain]: null;
  [EthMethod.wallet_getPermissions]: Web3WalletPermission[];
  [EthMethod.wallet_requestPermissions]: Web3WalletPermission[];
  [EthMethod.eth_estimateUserOperationGas]: [
    preVerificationGas: string,
    verificationGasLimit: string,
    callGasLimit: string,
  ];
  [EthMethod.eth_getUserOperationByHash]:
    | (UserOperation & {
        entryPoint: string;
        blockNumber: string;
        blockHash: string;
        transactionHash: string;
      })
    | null;
  [EthMethod.eth_getUserOperationReceipt]: UserOperation | null;
  [EthMethod.eth_supportedEntryPoints]: string[];
  [EthMethod.eth_sendUserOperation]: string;
};

/***** RPC Errors *****/

export enum EthProviderRpcErrorCode {
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

export enum EthEvent {
  message = 'message',
  connect = 'connect',
  disconnect = 'disconnect',
  chainChanged = 'chainChanged',
  accountsChanged = 'accountsChanged',
  data = 'data',
}

export enum EthProviderMessageType {
  eth_subscription = 'eth_subscription',
}

export interface EthSubscriptionData {
  readonly subscription: string;
  readonly result: unknown;
}

export type EthProviderMessageData = {
  [EthProviderMessageType.eth_subscription]: EthSubscriptionData;
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
  [EthEvent.data]: [null, { params: EthSubscriptionData }];
};

/***** Provider *****/

export type EthRequest<T extends EthMethod = EthMethod> = EthMethodParams[T] extends void
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
  request<T extends EthMethod>(req: EthRequest<T>): EthResult<T>;

  on<T extends EthEvent>(eventName: T, listener: EthEventListener<T>): void;
  removeListener<T extends EthEvent>(eventName: T, listener: EthEventListener<T>): void;
}
