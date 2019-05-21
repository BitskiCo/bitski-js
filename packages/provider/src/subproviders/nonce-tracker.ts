import { Subprovider } from '@bitski/provider-engine';

/**
 * A subprovider that tracks and automatically increments the nonce on the client.
 * Heavily based on the provider-engine NonceTrackerSubprovider, but modified for
 * Bitski's transaction flow.
 */
export class NonceTrackerSubprovider extends Subprovider {

  protected nonceCache: Map<string, string>;

  constructor() {
    super();
    this.nonceCache = new Map<string, string>();
  }

  public handleRequest(payload, next, end) {
    switch (payload.method) {
      case 'eth_getTransactionCount':
        this.handleTransactionCountRequest(payload, next, end);
        return;
      case 'eth_sendTransaction':
        this.handleSendTransactionRequest(payload, next);
        return;
      default:
        next();
        return;
    }
  }

  // Return cached result if present
  protected handleTransactionCountRequest(payload, next, end) {
    const blockTag = payload.params.length > 1 ? payload.params[1] : null;
    // Only handle pending tag
    if (blockTag !== 'pending') {
      next();
      return;
    }

    const address = payload.params[0].toLowerCase();
    const cachedResult = this.nonceCache.get(address);

    // Return cached result it we have it
    if (cachedResult) {
      end(null, cachedResult);
      return;
    }

    // Fallthrough and populate cache
    next((err, result, cb) => {
      if (!err) {
        this.nonceCache.set(address, result);
      }
      cb();
    });
  }

  protected toHex(num: number): string {
    const base16 = num.toString(16);
    let hex = base16;
    if (base16.length % 2 !== 0) {
      hex = '0' + base16;
    }
    return '0x' + hex;
  }

  protected fromHex(str: string): number {
    return parseInt(str, 16);
  }

  protected nextNonce(nonce: string): string {
    const submittedNonce = this.fromHex(nonce);
    const nextNonce = submittedNonce + 1;
    return this.toHex(nextNonce);
  }

  // Increment next nonce for address
  protected handleSendTransactionRequest(payload, next) {
    // Submit the request, then monitor the result
    next((err, result, cb) => {
      const transaction = payload.params.length > 0 ? payload.params[0] : {};
      const submittedNonce = transaction.nonce;
      const address = transaction.from;
      if (!err) {
        if (submittedNonce && address) {
          // Increment nonce
          const nextNonce = this.nextNonce(submittedNonce);
          this.nonceCache.set(address, nextNonce);
        }
      } else {
        // Remove cached value if we encounter an error
        this.nonceCache.delete(address);
      }
      cb();
    });
  }

}
