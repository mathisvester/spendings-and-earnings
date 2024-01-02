import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Transaction } from '../transaction';
import { Category } from '../category';
import { ButtonDirective } from '../button.directive';
import { CurrencyPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { Filter } from '../filter';
import { defaultFilter } from '../default-filter';
import { lastDayOfMonth, validateDayOfMonth } from '../day-of-month';

@Component({
  selector: 'app-transaction-list-item',
  standalone: true,
  imports: [
    ButtonDirective,
    CurrencyPipe,
    DatePipe,
    LowerCasePipe,
    NgIcon,
    TranslocoPipe,
    TranslocoDirective,
  ],
  templateUrl: './transaction-list-item.component.html',
  styleUrl: './transaction-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListItemComponent {
  @Input({ required: true }) transaction!: Transaction;
  @Input({ required: true }) categories!: Category[];
  @Input() filter: Filter = defaultFilter();
  @Output() deleteTransaction = new EventEmitter<number>();
  @Output() updateTransaction = new EventEmitter<number>();

  get category(): Category | undefined {
    return this.categories.find(
      category => category.id === this.transaction.categoryId
    );
  }

  /**
   * If the transaction date is either 'MONTHLY' or 'YEARLY' create a constructed date based on current month and year of filter
   * If the transaction date is not valid (e.g. 02-31-2024) for the current month and year of filter, return the last day of the month
   * */
  get date(): Date {
    if (
      this.transaction.interval === 'MONTHLY' ||
      this.transaction.interval === 'YEARLY'
    ) {
      let date: Date | undefined = undefined;
      const { month: filterMonth, year: filterYear } = this.filter;

      if (this.transaction.interval === 'MONTHLY') {
        date = new Date(
          filterYear,
          filterMonth,
          this.transaction.date.getDate()
        );
      } else {
        date = new Date(
          filterYear,
          this.transaction.date.getMonth(),
          this.transaction.date.getDate()
        );
      }

      if (validateDayOfMonth(this.transaction.date, filterYear, filterMonth)) {
        return date;
      } else {
        return lastDayOfMonth(filterYear, filterMonth);
      }
    } else {
      return this.transaction.date;
    }
  }
}
