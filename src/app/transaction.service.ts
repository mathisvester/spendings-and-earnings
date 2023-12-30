import {
  computed,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Transaction } from './transaction';
import * as uuid from 'uuid';
import { NewTransaction } from './new-transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  readonly transactions: Signal<Transaction[]>;
  readonly selectedTransaction: Signal<Transaction | null>;
  private readonly _transactions: WritableSignal<Transaction[]> = signal([]);
  private readonly _selectedTransactionId: WritableSignal<string | null> =
    signal(null);

  constructor() {
    this.transactions = this._transactions.asReadonly();
    this.selectedTransaction = computed(
      () =>
        this._transactions().find(
          transaction => transaction.id === this._selectedTransactionId()
        ) ?? null
    );
  }

  add(transaction: NewTransaction) {
    this._transactions.update(transactions => [
      ...transactions,
      { id: uuid.v4(), ...transaction },
    ]);
  }

  delete(transactionId: string) {
    this._transactions.update(transactions =>
      transactions.filter(transaction => transaction.id !== transactionId)
    );
  }

  update(transaction: Transaction) {
    this._transactions.update(transactions =>
      transactions.map(t => (t.id === transaction.id ? transaction : t))
    );
    this.selectTransaction(null);
  }

  selectTransaction(transactionId: string | null) {
    this._selectedTransactionId.set(transactionId);
  }
}
