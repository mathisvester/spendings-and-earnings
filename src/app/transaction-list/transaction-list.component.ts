import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../transaction';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { TranslocoDirective } from '@ngneat/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgClass,
    DatePipe,
    TranslocoDirective,
    NgIcon,
    ButtonComponent,
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  providers: provideIcons({ heroTrash, heroPencilSquare }),
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
  @Input() totalEarnings = 0;
  @Input() totalSpendings = 0;
  @Output() deleteTransaction = new EventEmitter<number>();
  @Output() updateTransaction = new EventEmitter<number>();
}
