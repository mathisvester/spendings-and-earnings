import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { FilterComponent } from '../filter/filter.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { Category } from '../category';
import { Filter } from '../filter';
import { CategoryService } from '../category.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslocoDirective } from '@ngneat/transloco';
import { PageComponent } from '../page/page.component';
import { HeadlineDirective } from '../headline.directive';
import { ButtonDirective } from '../button.directive';
import { TransactionSummaryComponent } from '../transaction-summary/transaction-summary.component';
import { LanguageService } from '../language.service';
import { TransactionStore } from '../transaction.store';

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
    TransactionSummaryComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  readonly categories: Signal<Category[]>;
  readonly monthNames: readonly string[];
  readonly transactionStore = inject(TransactionStore);

  private readonly categoryService = inject(CategoryService);
  private readonly languageService = inject(LanguageService);
  private readonly router = inject(Router);

  constructor() {
    this.categories = this.categoryService.categories;
    this.monthNames = this.languageService.localeMonthNames;
  }

  ngOnInit() {
    this.categoryService.load();
    this.transactionStore.load();
  }

  updateTransaction(transactionId: number) {
    this.router.navigateByUrl(`/update-transaction/${transactionId}`);
  }

  filterTransactions(filter: Filter) {
    this.transactionStore.updateFilter(filter);
  }
}
