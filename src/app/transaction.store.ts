import { patchState, signalState } from '@ngrx/signals';
import { Filter } from './filter';
import { Transaction } from './transaction';
import { defaultFilter } from './default-filter';
import { computed, inject, Injectable } from '@angular/core';
import { TransactionService } from './transaction.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';
import { NewTransaction } from './new-transaction';
import { Router } from '@angular/router';
import { filterTransactions } from './transaction-filter';

export interface TransactionState {
  transactions: Transaction[];
  filter: Filter;
  selectedTransactionId: number | null;
}

const initialState: TransactionState = {
  transactions: [],
  filter: defaultFilter(),
  selectedTransactionId: null,
};

const transactionState = signalState(initialState);

@Injectable({ providedIn: 'root' })
export class TransactionStore {
  readonly transactions = computed(() =>
    filterTransactions(
      transactionState.transactions(),
      transactionState.filter()
    ).sort((a, b) => +b.date - +a.date)
  );

  readonly totalEarnings = computed(() =>
    this.transactions()
      .filter(t => t.type === 'EARNING')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly totalSpendings = computed(() =>
    this.transactions()
      .filter(t => t.type === 'SPENDING')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  readonly selectedTransaction = computed(
    () =>
      transactionState
        .transactions()
        .find(t => t.id === transactionState.selectedTransactionId()) ?? null
  );

  readonly filter = computed(() => transactionState.filter());

  load = rxMethod<void>(
    pipe(
      switchMap(() =>
        this.transactionService
          .load()
          .pipe(
            tap(transactions => patchState(transactionState, { transactions }))
          )
      )
    )
  );

  create = rxMethod<{ createTransaction: NewTransaction; forward?: string }>(
    pipe(
      exhaustMap(({ createTransaction, forward }) =>
        this.transactionService.create(createTransaction).pipe(
          tap(transaction => {
            patchState(transactionState, state => ({
              transactions: [...state.transactions, transaction],
            }));

            if (!!forward) {
              this.router.navigate([forward]);
            }
          })
        )
      )
    )
  );

  update = rxMethod<{ updateTransaction: Transaction; forward?: string }>(
    pipe(
      exhaustMap(({ updateTransaction, forward }) =>
        this.transactionService.update(updateTransaction).pipe(
          tap(transaction => {
            patchState(transactionState, state => ({
              transactions: state.transactions.map(t =>
                t.id === transaction.id ? transaction : t
              ),
            }));

            if (!!forward) {
              this.router.navigate([forward]);
            }
          })
        )
      )
    )
  );

  delete = rxMethod<{ transactionId: number; forward?: string }>(
    pipe(
      exhaustMap(({ transactionId, forward }) =>
        this.transactionService.delete(transactionId).pipe(
          tap(() => {
            patchState(transactionState, state => ({
              transactions: state.transactions.filter(
                transaction => transaction.id !== transactionId
              ),
            }));

            if (!!forward) {
              this.router.navigate([forward]);
            }
          })
        )
      )
    )
  );

  updateFilter(filter: Filter) {
    patchState(transactionState, { filter });
  }

  select(transactionId: number) {
    patchState(transactionState, { selectedTransactionId: transactionId });
  }

  deselect() {
    patchState(transactionState, { selectedTransactionId: null });
  }

  private readonly transactionService = inject(TransactionService);
  private readonly router = inject(Router);
}
