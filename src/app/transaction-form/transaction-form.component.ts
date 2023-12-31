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
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    FormsModule,
    LocalDateValueAccessor,
    SelectCategoryComponent,
    TranslocoDirective,
    ButtonComponent,
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
  @Output() saveTransaction = new EventEmitter<NewTransaction | Transaction>();

  date = new Date();
  amount: number = 0;
  description = '';
  categoryId: number | null = null;
  recurring: 'MONTHLY' | 'YEARLY' | null = null;

  private _transaction: Transaction | null = null;

  submit() {
    if (this.type) {
      const transaction: NewTransaction | Transaction = {
        ...(this.transaction && { id: this.transaction.id }),
        type: this.type,
        date: this.date,
        amount: this.amount,
        ...(this.description && { description: this.description }),
        categoryId: this.categoryId,
        ...(!!this.recurring && { recurring: this.recurring }),
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
    if (!!transaction.recurring) {
      this.recurring = transaction.recurring;
    }
  }
}
