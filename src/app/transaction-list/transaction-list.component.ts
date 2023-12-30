import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction';
import { CurrencyPipe, JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CurrencyPipe, JsonPipe, NgClass],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
}
