import {
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
  ],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
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

  private _transaction: Transaction | null = null;

  submit() {
    if (this.type && this.amount) {
      const transaction: NewTransaction | Transaction = {
        ...(this.transaction && { id: this.transaction.id }),
        type: this.type,
        date: this.date,
        amount: this.amount,
        ...(this.description && { description: this.description }),
        categoryId: this.categoryId,
        interval: this.interval,
      };

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
    this.interval = transaction.interval;
  }
}
