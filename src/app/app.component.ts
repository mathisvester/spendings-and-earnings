import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { ListComponent } from './list/list.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { ListFilterComponent } from './list-filter/list-filter.component';
import { Category } from './category';
import { CategoryService } from './category.service';
import { NewCategory } from './new-category';
import { NewTransaction } from './new-transaction';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NewTransactionComponent,
    ListComponent,
    NewCategoryComponent,
    ListFilterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly categories: Signal<Category[]>;
  readonly transactions: Signal<Transaction[]>;

  private readonly categoryService = inject(CategoryService);
  private readonly transactionService = inject(TransactionService);

  constructor() {
    this.categories = this.categoryService.categories;
    this.transactions = this.transactionService.transactions;
  }

  addCategory(category: NewCategory) {
    this.categoryService.add(category);
  }

  addTransaction(transaction: NewTransaction) {
    this.transactionService.add(transaction);
  }
}
