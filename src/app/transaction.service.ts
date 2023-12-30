import {
  computed,
  inject,
  Injectable,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { Transaction } from './transaction';
import { NewTransaction } from './new-transaction';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  readonly transactions: Signal<Transaction[]>;
  readonly selectedTransaction: Signal<Transaction | null>;
  private readonly _transactions: WritableSignal<Transaction[]> = signal([]);
  private readonly _selectedTransactionId: WritableSignal<number | null> =
    signal(null);

  private readonly dbService = inject(NgxIndexedDBService);

  constructor() {
    this.transactions = this._transactions.asReadonly();
    this.selectedTransaction = computed(
      () =>
        this._transactions().find(
          transaction => transaction.id === this._selectedTransactionId()
        ) ?? null
    );
  }

  load() {
    this.dbService
      .getAll<Transaction>('transactions')
      .subscribe(transactions => {
        this._transactions.update(() => transactions);
      });
  }

  add(transaction: NewTransaction) {
    this.dbService.add('transactions', transaction).subscribe(key => {
      this._transactions.update(transactions => [...transactions, key]);
    });
  }

  delete(transactionId: number) {
    this.dbService
      .deleteByKey('transactions', transactionId)
      .pipe(filter(Boolean))
      .subscribe(() => {
        this._transactions.update(transactions =>
          transactions.filter(transaction => transaction.id !== transactionId)
        );
      });
  }

  update(transaction: Transaction) {
    this.dbService.update('transactions', transaction).subscribe(key => {
      this._transactions.update(transactions =>
        transactions.map(t => (t.id === key.id ? key : t))
      );
      this.selectTransaction(null);
    });
  }

  selectTransaction(transactionId: number | null) {
    this._selectedTransactionId.set(transactionId);
  }
}
