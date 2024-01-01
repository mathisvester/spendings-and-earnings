import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TranslocoDirective } from '@ngneat/transloco';
import { Filter } from '../filter';
import { defaultFilter } from '../default-filter';

@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, TranslocoDirective],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.scss',
})
export class TransactionSummaryComponent {
  @Input() totalEarnings = 0;
  @Input() totalSpendings = 0;
  @Input() filter: Filter = defaultFilter();

  get currentDate(): Date {
    return new Date(this.filter.year, this.filter.month);
  }
}
