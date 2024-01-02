import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../transaction';
import { TranslocoDirective } from '@ngneat/transloco';
import { provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { TransactionListItemComponent } from '../transaction-list-item/transaction-list-item.component';
import { Category } from '../category';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [TranslocoDirective, TransactionListItemComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  providers: provideIcons({ heroTrash, heroPencilSquare }),
})
export class TransactionListComponent {
  @Input({ required: true }) transactions!: Transaction[];
  @Input({ required: true }) categories!: Category[];
  @Output() deleteTransaction = new EventEmitter<number>();
  @Output() updateTransaction = new EventEmitter<number>();
}
