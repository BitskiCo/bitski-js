import { Subprovider } from '@bitski/provider-engine';

/**
 * A subprovider that automatically populates missing transaction details.
 * This is needed because it has become common to submit transactions with
 * only some of the parameters and rely on the provider or node to fill in the rest.
 */
export class TransactionValidatorSubprovider extends Subprovider {
  protected minGasPrice: number;

  constructor(minGasPrice = 0) {
    super();
    this.minGasPrice = minGasPrice;
  }

  public handleRequest(payload, next, _) {
    // Only handle transactions
    if (payload.method === 'eth_sendTransaction' || payload.method === 'eth_signTransaction') {
      this.populateTransactionFields(payload).then(() => {
        // Payload was modified. Continue.
        next();
      }).catch(() => {
        // Fall through if we cannot populate fields
        next();
      });
    } else {
      next();
    }
  }

  // Examine transaction and populate missing params
  protected async populateTransactionFields(payload): Promise<any> {
    const params = payload.params || [];

    let transaction: any = {};

    if (params.length > 0) {
      transaction = params[0];
    }

    const promises: Array<Promise<any>> = [];

    // Populate missing from with default account
    if (transaction.from === undefined) {
      const accounts = await this.getAccounts();
      transaction.from = accounts[0];
    }

    // Populate missing gasPrice
    if (transaction.gasPrice === undefined) {
      promises.push(this.estimateGasPrice());
    } else {
      promises.push(transaction.gasPrice);
    }

    // Populate missing nonce
    if (transaction.nonce === undefined) {
      promises.push(this.getNonce(transaction.from));
    } else {
      promises.push(transaction.nonce);
    }

    // Populate missing gas
    if (transaction.gas === undefined) {
      promises.push(this.estimateGas(transaction));
    } else {
      promises.push(transaction.gas);
    }

    // Execute promises
    const values = await Promise.all(promises);

    // Update parameters with loaded values. Must be very careful with the indexes here.
    transaction.gasPrice = values[0];
    transaction.nonce = values[1];
    transaction.gas = values[2];

    // Set the params on the payload
    payload.params[0] = transaction;
    return payload;
  }

  private async getNonce(address) {
    const request = {
      id: 0,
      jsonrpc: '2.0',
      method: 'eth_getTransactionCount',
      params: [address, 'latest'],
    };
    return this.performRequest(request);
  }

  private async getAccounts() {
    const request = {
      id: 0,
      jsonrpc: '2.0',
      method: 'eth_accounts',
      params: [],
    };
    return this.performRequest(request);
  }

  private async estimateGas(transaction) {
    const request = {
      id: 0,
      jsonrpc: '2.0',
      method: 'eth_estimateGas',
      params: [transaction],
    };
    return this.performRequest(request);
  }

  private async estimateGasPrice() {
    const request = {
      id: 0,
      jsonrpc: '2.0',
      method: 'eth_gasPrice',
      params: [],
    };
    return this.performRequest(request).then((gasPrice) => {
      if (gasPrice === '0x0') {
        return `0x${this.minGasPrice.toString(16)}`;
      }
      return gasPrice;
    });
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
