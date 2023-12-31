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

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [FormsModule, LocalDateValueAccessor, SelectCategoryComponent],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent {
  @ViewChild('f') form!: NgForm;
  @Input() set selectedTransaction(transaction: Transaction | null) {
    this._selectedTransaction = transaction;

    if (this._selectedTransaction) {
      this.setFormValue(this._selectedTransaction);
    }
  }

  get selectedTransaction(): Transaction | null {
    return this._selectedTransaction;
  }

  @Input() type: TransactionType | undefined;
  @Input() categories: Category[] = [];
  @Output() saveTransaction = new EventEmitter<NewTransaction | Transaction>();

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
