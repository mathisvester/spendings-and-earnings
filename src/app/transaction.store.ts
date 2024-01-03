import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Filter } from './filter';
import { Transaction } from './transaction';
import { defaultFilter } from './default-filter';
import { computed, inject } from '@angular/core';
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

export const TransactionStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ transactions, filter, selectedTransactionId }) => ({
    filteredTransactions: computed(() =>
      filterTransactions(transactions(), filter()).sort(
        (a, b) => +b.date - +a.date
      )
    ),
    totalEarnings: computed(() =>
      transactions()
        .filter(t => t.type === 'EARNING')
        .reduce((sum, t) => sum + t.amount, 0)
    ),
    totalSpendings: computed(() =>
      transactions()
        .filter(t => t.type === 'SPENDING')
        .reduce((sum, t) => sum + t.amount, 0)
    ),
    selectedTransaction: computed(
      () => transactions().find(t => t.id === selectedTransactionId()) ?? null
    ),
  })),
  withMethods(
    (
      store,
      transactionService = inject(TransactionService),
      router = inject(Router)
    ) => ({
      load: rxMethod<void>(
        pipe(
          switchMap(() =>
            transactionService
              .load()
              .pipe(tap(transactions => patchState(store, { transactions })))
          )
        )
      ),
      create: rxMethod<{ createTransaction: NewTransaction; forward?: string }>(
        pipe(
          exhaustMap(({ createTransaction, forward }) =>
            transactionService.create(createTransaction).pipe(
              tap(transaction => {
                patchState(store, state => ({
                  transactions: [...state.transactions, transaction],
                }));

                if (!!forward) {
                  router.navigate([forward]);
                }
              })
            )
          )
        )
      ),
      update: rxMethod<{ updateTransaction: Transaction; forward?: string }>(
        pipe(
          exhaustMap(({ updateTransaction, forward }) =>
            transactionService.update(updateTransaction).pipe(
              tap(transaction => {
                patchState(store, state => ({
                  transactions: state.transactions.map(t =>
                    t.id === transaction.id ? transaction : t
                  ),
                }));

                if (!!forward) {
                  router.navigate([forward]);
                }
              })
            )
          )
        )
      ),
      delete: rxMethod<number>(
        pipe(
          exhaustMap(transactionId =>
            transactionService.delete(transactionId).pipe(
              tap(() =>
                patchState(store, state => ({
                  transactions: state.transactions.filter(
                    transaction => transaction.id !== transactionId
                  ),
                }))
              )
            )
          )
        )
      ),
      updateFilter(filter: Filter) {
        patchState(store, { filter });
      },
      select(transactionId: number) {
        patchState(store, { selectedTransactionId: transactionId });
      },
      deselect() {
        patchState(store, { selectedTransactionId: null });
      },
    })
  ),
  withHooks({
    onInit({ load }) {
      load();
    },
  })
);
