import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LocalDateValueAccessor } from 'angular-date-value-accessor';
import { Transaction } from '../transaction';
import { Category } from '../category';
import { NewTransaction } from '../new-transaction';
import { TransactionType } from '../transaction-type';
import { SelectCategoryComponent } from '../select-category/select-category.component';
import { TranslocoDirective } from '@ngneat/transloco';
import { InputDirective } from '../input.directive';
import { LabelDirective } from '../label.directive';
import { ButtonDirective } from '../button.directive';
import { TransactionInterval } from '../transaction-interval';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    FormsModule,
    LocalDateValueAccessor,
    SelectCategoryComponent,
    TranslocoDirective,
    InputDirective,
    LabelDirective,
    ButtonDirective,
    JsonPipe,
    DatePipe,
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionFormComponent {
  @ViewChild('f') form!: NgForm;
  @Input() set transaction(transaction: Transaction | null) {
    this._transaction = transaction;

    if (this._transaction) {
      this.setFormValue(this._transaction);
    }
  }

  get transaction(): Transaction | null {
    return this._transaction;
  }

  @Input() type: TransactionType | undefined;
  @Input() categories: Category[] = [];
  @Input() currencySymbol = '';
  @Output() saveTransaction = new EventEmitter<NewTransaction | Transaction>();

  date = new Date();
  amount: number | null = null;
  description = '';
  categoryId: number | null = null;
  interval: TransactionInterval = 'ONE_TIME';
  start: Date | null = null;
  end: Date | null = null;

  private _transaction: Transaction | null = null;

  submit() {
    if (this.type && this.amount) {
      const transaction: NewTransaction | Transaction = {
        ...(this.transaction && { ...this.transaction }),
        type: this.type,
        date: this.date,
        amount: this.amount,
        description: this.description,
        categoryId: this.categoryId,
        interval: this.interval,
        ...(this.start && { start: this.start }),
        ...(this.end && { end: this.end }),
      };

      if (!this.description) {
        delete transaction.description;
      }
      if (!this.start) {
        delete transaction.start;
      }
      if (!this.end) {
        delete transaction.end;
      }

      this.saveTransaction.emit(transaction);
      this.form.reset({ date: new Date() });
    }
  }

  private setFormValue(transaction: Transaction) {
    this.date = transaction.date;
    this.amount = transaction.amount;
    if (!!transaction.description) {
      this.description = transaction.description;
    }
    if (!!transaction.categoryId) {
      this.categoryId = transaction.categoryId;
    }
    if (!!transaction.start) {
      this.start = transaction.start;
    }
    if (!!transaction.end) {
      this.end = transaction.end;
    }
    this.interval = transaction.interval;
  }
}
