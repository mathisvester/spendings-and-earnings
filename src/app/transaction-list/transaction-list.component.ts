import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../transaction';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CurrencyPipe, NgClass, DatePipe, TranslocoDirective],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
  @Input() totalEarnings = 0;
  @Input() totalSpendings = 0;
  @Output() deleteTransaction = new EventEmitter<number>();
  @Output() updateTransaction = new EventEmitter<number>();
}
