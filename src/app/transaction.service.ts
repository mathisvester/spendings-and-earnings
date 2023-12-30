import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Transaction } from './transaction';
import * as uuid from 'uuid';
import { NewTransaction } from './new-transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  readonly transactions: Signal<Transaction[]>;
  private readonly _transactions: WritableSignal<Transaction[]> = signal([]);

  constructor() {
    this.transactions = this._transactions.asReadonly();
  }

  add(transaction: NewTransaction) {
    this._transactions.update(transactions => [
      ...transactions,
      { id: uuid.v4(), ...transaction },
    ]);
  }
}
