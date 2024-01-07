import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-transaction-summary',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, TranslocoDirective],
  templateUrl: './transaction-summary.component.html',
  styleUrl: './transaction-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionSummaryComponent {
  @Input() totalEarnings = 0;
  @Input() totalSpendings = 0;
}
