import { BitskiTransactionSigner } from '../../src/-private/signing/transaction-signer';
import { Transaction } from '../../src/-private/subproviders/signature';

export class MockSigner extends BitskiTransactionSigner {
  private result: string;

  constructor(result: string) {
    super('', '', {});
    this.result = result;
  }

  public async sign(transaction: Transaction): Promise<string> {
    return Promise.resolve(this.result);
  }
}
