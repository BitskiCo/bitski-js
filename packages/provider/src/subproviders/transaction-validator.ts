import Subprovider from 'web3-provider-engine/subproviders/subprovider';

/**
 * A subprovider that automatically populates missing transaction details.
 * This is needed because it has become common to submit transactions with
 * only some of the parameters and rely on the provider or node to fill in the rest.
 */
export class TransactionValidatorSubprovider extends Subprovider {

  public handleRequest(payload, next, end) {
    // Only handle eth_sendTransaction
    if (payload.method === 'eth_sendTransaction') {
      this.populateTransactionFields(payload).then((updated) => {
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
  protected populateTransactionFields(payload): Promise<any> {
    const params = payload.params || [];

    let transaction: any = {};

    if (params.length > 0) {
      transaction = params[0];
    }

    const promises: Array<Promise<any>> = [];

    if (transaction.gasPrice === undefined) {
      const getGasPrice = { method: 'eth_gasPrice', params: []};
      promises.push(this.performRequest(getGasPrice));
    } else {
      promises.push(transaction.gasPrice);
    }

    if (transaction.nonce === undefined) {
      const getNextNonce = { method: 'eth_getTransactionCount', params: [transaction.from, 'pending']};
      promises.push(this.performRequest(getNextNonce));
    } else {
      promises.push(transaction.nonce);
    }

    if (transaction.gas === undefined) {
      const estimateGas = { method: 'eth_estimateGas', params: [transaction] };
      promises.push(this.performRequest(estimateGas));
    } else {
      promises.push(transaction.gas);
    }

    return Promise.all(promises).then((values) => {
      // Update parameters with loaded values
      transaction.gasPrice = values[0];
      transaction.nonce = values[1];
      transaction.gas = values[2];
      // Set the params on the payload
      payload.params[0] = transaction;
      return payload;
    });
  }

    // Wraps emitPayload in a promise
    protected performRequest(payload): Promise<any> {
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
