import { inject, Injectable } from '@angular/core';
import { Transaction } from './transaction';
import { NewTransaction } from './new-transaction';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly dbService = inject(NgxIndexedDBService);

  load() {
    return this.dbService.getAll<Transaction>('transactions');
  }

  create(createTransaction: NewTransaction): Observable<Transaction> {
    const transaction: Omit<Transaction, 'id'> = {
      ...createTransaction,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };

    return this.dbService.add('transactions', transaction);
  }

  delete(transactionId: number) {
    return this.dbService.deleteByKey('transactions', transactionId);
  }

  update(updateTransaction: Transaction): Observable<Transaction> {
    const transaction: Transaction = {
      ...updateTransaction,
      updatedAt: new Date(),
      version: updateTransaction.version + 1,
    };

    return this.dbService.update('transactions', transaction);
  }
}
