import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { FilterComponent } from './filter/filter.component';
import { Category } from './category';
import { CategoryService } from './category.service';
import { NewCategory } from './new-category';
import { NewTransaction } from './new-transaction';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction';
import { isTransaction } from './is-transaction';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NewTransactionComponent,
    TransactionListComponent,
    NewCategoryComponent,
    FilterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly categories: Signal<Category[]>;
  readonly transactions: Signal<Transaction[]>;
  readonly selectedTransaction: Signal<Transaction | null>;

  private readonly categoryService = inject(CategoryService);
  private readonly transactionService = inject(TransactionService);

  constructor() {
    this.categories = this.categoryService.categories;
    this.transactions = this.transactionService.transactions;
    this.selectedTransaction = this.transactionService.selectedTransaction;
  }

  addCategory(category: NewCategory) {
    this.categoryService.add(category);
  }

  saveTransaction(transaction: NewTransaction | Transaction) {
    if (isTransaction(transaction)) {
      this.transactionService.update(transaction);
    } else {
      this.transactionService.add(transaction);
    }
  }

  deleteTransaction(transactionId: string) {
    this.transactionService.delete(transactionId);
  }

  selectTransaction(transactionId: string | null) {
    this.transactionService.selectTransaction(transactionId);
  }
}
