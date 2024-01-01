import { Component, inject, OnInit, Signal } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { Category } from '../category';
import { Transaction } from '../transaction';
import { Filter } from '../filter';
import { CategoryService } from '../category.service';
import { TransactionService } from '../transaction.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslocoDirective } from '@ngneat/transloco';
import { PageComponent } from '../page/page.component';
import { HeadlineDirective } from '../headline.directive';
import { ButtonDirective } from '../button.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TransactionListComponent,
    FilterComponent,
    TranslocoDirective,
    PageComponent,
    HeadlineDirective,
    RouterLink,
    ButtonDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly categories: Signal<Category[]>;
  readonly transactions: Signal<Transaction[]>;
  readonly filter: Signal<Filter>;
  readonly totalEarnings: Signal<number>;
  readonly totalSpendings: Signal<number>;

  private readonly categoryService = inject(CategoryService);
  private readonly transactionService = inject(TransactionService);
  private readonly router = inject(Router);

  constructor() {
    this.categories = this.categoryService.categories;
    this.transactions = this.transactionService.transactions;
    this.filter = this.transactionService.filter;
    this.totalEarnings = this.transactionService.totalEarnings;
    this.totalSpendings = this.transactionService.totalSpendings;
  }

  ngOnInit() {
    this.categoryService.load();
    this.transactionService.load();
  }

  deleteTransaction(transactionId: number) {
    this.transactionService.delete(transactionId);
  }

  updateTransaction(transactionId: number) {
    this.router.navigateByUrl(`/update-transaction/${transactionId}`);
  }

  filterTransactions(filter: Filter) {
    this.transactionService.updateFilter(filter);
  }
}
