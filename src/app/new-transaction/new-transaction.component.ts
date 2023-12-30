import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { TransactionType } from '../transaction-type';
import { FormsModule, NgForm } from '@angular/forms';
import { NewTransaction } from '../new-transaction';
import { SelectCategoryComponent } from '../select-category/select-category.component';
import { Category } from '../category';
import { DatePipe, NgIf } from '@angular/common';
import { LocalDateValueAccessor } from 'angular-date-value-accessor';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-new-transaction',
  standalone: true,
  imports: [
    FormsModule,
    SelectCategoryComponent,
    NgIf,
    DatePipe,
    LocalDateValueAccessor,
  ],
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.scss',
})
export class NewTransactionComponent {
  @ViewChild('f') form!: NgForm;
  @Input({ required: true }) type: TransactionType | undefined;
  @Input() categories: Category[] = [];
  @Output() saveTransaction = new EventEmitter<NewTransaction | Transaction>();
  @Input() set selectedTransaction(transaction: Transaction | null) {
    this._selectedTransaction = transaction;

    if (
      this._selectedTransaction &&
      this._selectedTransaction.type === this.type
    ) {
      this.setFormValue(this._selectedTransaction);
    }
  }

  get selectedTransaction(): Transaction | null {
    return this._selectedTransaction;
  }

  date = new Date();
  amount: number = 0;
  description = '';
  categoryId = '';
  recurring: 'MONTHLY' | 'YEARLY' | null = null;

  private _selectedTransaction: Transaction | null = null;

  submit() {
    if (this.type) {
      const transaction: NewTransaction | Transaction = {
        ...(this.selectedTransaction && { id: this.selectedTransaction.id }),
        type: this.type,
        date: this.date,
        amount: this.amount,
        ...(this.description && { description: this.description }),
        ...(this.categoryId && { categoryId: this.categoryId }),
        ...(!!this.recurring && { recurring: this.recurring }),
      };

      this.saveTransaction.emit(transaction);
      this.form.reset({ date: new Date() });
    }
  }

  setFormValue(transaction: Transaction) {
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
