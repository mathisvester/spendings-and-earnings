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
  @Output() addTransaction = new EventEmitter<NewTransaction>();

  date = new Date();
  amount: number = 0;
  description = '';
  categoryId = '';

  submit() {
    if (this.type) {
      const transaction: NewTransaction = {
        type: this.type,
        date: this.date,
        amount: this.amount,
        ...(this.description && { description: this.description }),
        ...(this.categoryId && { categoryId: this.categoryId }),
      };

      this.addTransaction.emit(transaction);
      this.form.reset({ date: new Date() });
    }
  }
}
