import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../transaction';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TranslocoDirective } from '@ngneat/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { ButtonDirective } from '../button.directive';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    TranslocoDirective,
    NgIcon,
    ButtonDirective,
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  providers: provideIcons({ heroTrash, heroPencilSquare }),
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
  @Output() deleteTransaction = new EventEmitter<number>();
  @Output() updateTransaction = new EventEmitter<number>();
}
