import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../transaction';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
  @Output() deleteTransaction = new EventEmitter<string>();
  @Output() updateTransaction = new EventEmitter<string>();
}
