import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../transaction';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CurrencyPipe, NgClass, DatePipe],
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
