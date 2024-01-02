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
import { Filter } from './filter';
import { defaultFilter } from './default-filter';
import { filterTransactions } from './transaction-filter';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  readonly transactions: Signal<Transaction[]>;
  readonly transaction: Signal<Transaction | null>;
  readonly filter: Signal<Filter>;
  readonly totalEarnings: Signal<number>;
  readonly totalSpendings: Signal<number>;
  private readonly _transactions: WritableSignal<Transaction[]> = signal([]);
  private readonly _transaction: WritableSignal<Transaction | null> =
    signal(null);
  private readonly _filter: WritableSignal<Filter> = signal(defaultFilter());
  private readonly dbService = inject(NgxIndexedDBService);
  private readonly router = inject(Router);

  constructor() {
    this.transactions = computed(() =>
      filterTransactions(this._transactions(), this._filter()).sort(
        (a, b) => +b.date - +a.date
      )
    );
    this.transaction = this._transaction.asReadonly();
    this.filter = this._filter.asReadonly();
    this.totalEarnings = computed(() =>
      this.transactions()
        .filter(t => t.type === 'EARNING')
        .reduce((sum, t) => sum + t.amount, 0)
    );
    this.totalSpendings = computed(() =>
      this.transactions()
        .filter(t => t.type === 'SPENDING')
        .reduce((sum, t) => sum + t.amount, 0)
    );
  }

  load() {
    this.dbService
      .getAll<Transaction>('transactions')
      .subscribe(transactions => {
        this._transactions.update(() => transactions);
      });
  }

  create(createTransaction: NewTransaction, forward?: string) {
    const transaction: Omit<Transaction, 'id'> = {
      ...createTransaction,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };

    this.dbService.add('transactions', transaction).subscribe(key => {
      this._transactions.update(transactions => [...transactions, key]);

      if (!!forward) {
        this.router.navigate([forward]);
      }
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

  update(updateTransaction: Transaction, forward?: string) {
    const transaction: Transaction = {
      ...updateTransaction,
      updatedAt: new Date(),
      version: updateTransaction.version + 1,
    };

    this.dbService.update('transactions', transaction).subscribe(key => {
      this._transactions.update(transactions =>
        transactions.map(t => (t.id === key.id ? key : t))
      );

      if (!!forward) {
        this.router.navigate([forward]);
      }
    });
  }

  loadOne(transactionId: number) {
    this.dbService
      .getByID<Transaction | undefined>('transactions', transactionId)
      .subscribe(transaction => {
        if (!!transaction) {
          this._transaction.set(transaction);
        }
      });
  }

  updateFilter(filter: Filter) {
    this._filter.update(() => filter);
  }

  clearTransaction() {
    this._transaction.set(null);
  }
}
