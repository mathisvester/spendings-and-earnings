import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from '../transaction';
import { Category } from '../category';
import { ButtonDirective } from '../button.directive';
import { CurrencyPipe, DatePipe, LowerCasePipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';

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
})
export class TransactionListItemComponent {
  @Input({ required: true }) transaction!: Transaction;
  @Input({ required: true }) categories!: Category[];
  @Output() deleteTransaction = new EventEmitter<number>();
  @Output() updateTransaction = new EventEmitter<number>();

  get category(): Category | undefined {
    return this.categories.find(
      category => category.id === this.transaction.categoryId
    );
  }
}
