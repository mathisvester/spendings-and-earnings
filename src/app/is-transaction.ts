import { Transaction } from './transaction';
import { NewTransaction } from './new-transaction';

export function isTransaction(
  transaction: Transaction | NewTransaction
): transaction is Transaction {
  return (transaction as Transaction).id !== undefined;
}
