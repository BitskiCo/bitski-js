# eth-provider-types

This package provides types for Ethereum JSON RPC APIs. This includes:

```ts
import {
  // The ethereum provider API interface, per EIP-1193 (https://eips.ethereum.org/EIPS/eip-1193#appendix-i-consumer-facing-api-documentation)
  EthProvider,

  /*** Enums ***/
  EthMethod, // All ethereum RPC method names
  EthEvent, // All standard event names emitted by the provider
  EthProviderMessageType, // All types of messages sent by the `message` event
  EthProviderRpcErrorCode, // Error codes
  EthBlockNumberTag, // Block tags e.g. 'latest', 'earliest', 'pending

  /*** Mappings ***/
  EthMethodParams, // Mapping from EthMethod -> method parameters
  EthMethodResults, // Mapping from EthMethod -> method results
  EthEventParams, // Mapping from EthEvent -> Event parameters
  EthProviderMessageData, // Mapping from EthProviderMessageType -> message data

  /*** Interfaces ***/

  // Ethereum transaction received from RPC (e.g. getTransactionByHash).
  // This is the union of EthTransactionComplete and EthTransactionPending.
  EthTransaction,
  EthTransactionComplete, // Completed transaction (block number, etc, are NOT null)
  EthTransactionPending, // Pending transaction (block number, etc. ARE null)
  EthTransactionSend, // Transaction partial passed to eth_sendTransaction, eth_signTransaction
  EthTransactionCall, // Transaction partial passed to eth_call
  EthTransactionReceipt,

  // Ethereum block received from RPC (e.g. getBlockByHash).
  // This is the union of EthBlockComplete and EthBlockPending.
  EthBlock,
  EthBlockComplete, // Completed block (block number, etc. are NOT null)
  EthBlockPending, // Pending block (block number, etc. ARE null)

  // Ethereum log received from RPC (e.g. getLogs)
  // This is the union of EthLogComplete and EthLogPending.
  EthLog,
  EthLogComplete, // Completed log (block number, etc. are NOT null)
  EthLogPending, // Pending log (block number, etc. ARE null)

  // Other
  EthProviderMessage,
  EthProviderRpcError,
  EthProviderConnectInfo,
} from 'eth-provider-types';
```

You can use these types to create an Ethereum provider that is strongly typed:

```ts
import { EthProvider, EthMethod, EthTransactionReceipt } from 'eth-json-rpc-types';

class MyProvider implements EthProvider {
  request({ method, params }) {
    // ...
  }

  // ...
}

const provider = new MyProvider();

// Results and parameters are both typed based on EthMethod passed into `request`
const eth_accounts: string[] = provider.request({ method: EthMethod.eth_accounts });
const eth_getTransactionReceipt: EthTransactionReceipt = provider.request({
  method: EthMethod.eth_accounts,
  params: ['0x0...'],
});

// This will throw type errors because it has incorrect parameters
const eth_getBlockByHash = provider.request({
  method: EthMethod.eth_getBlockByHash,
  params: [123],
});
```
