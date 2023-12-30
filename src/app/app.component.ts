import { Component, inject, OnInit, Signal } from '@angular/core';
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
import { CategoryListComponent } from './category-list/category-list.component';
import { isCategory } from './is-category';
import { Filter } from './filter';

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
    CategoryListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly categories: Signal<Category[]>;
  readonly selectedCategory: Signal<Category | null>;
  readonly transactions: Signal<Transaction[]>;
  readonly selectedTransaction: Signal<Transaction | null>;
  readonly filter: Signal<Filter>;

  private readonly categoryService = inject(CategoryService);
  private readonly transactionService = inject(TransactionService);

  constructor() {
    this.categories = this.categoryService.categories;
    this.selectedCategory = this.categoryService.selectedCategory;
    this.transactions = this.transactionService.transactions;
    this.selectedTransaction = this.transactionService.selectedTransaction;
    this.filter = this.transactionService.filter;
  }

  ngOnInit() {
    this.categoryService.load();
    this.transactionService.load();
  }

  saveCategory(category: NewCategory | Category) {
    if (isCategory(category)) {
      this.categoryService.update(category);
    } else {
      this.categoryService.add(category);
    }
  }

  deleteCategory(categoryId: number) {
    this.categoryService.delete(categoryId);
  }

  selectCategory(categoryId: number | null) {
    this.categoryService.selectCategory(categoryId);
  }

  saveTransaction(transaction: NewTransaction | Transaction) {
    if (isTransaction(transaction)) {
      this.transactionService.update(transaction);
    } else {
      this.transactionService.add(transaction);
    }
  }

  deleteTransaction(transactionId: number) {
    this.transactionService.delete(transactionId);
  }

  selectTransaction(transactionId: number | null) {
    this.transactionService.selectTransaction(transactionId);
  }

  filterTransactions(filter: Filter) {
    this.transactionService.updateFilter(filter);
  }
}
