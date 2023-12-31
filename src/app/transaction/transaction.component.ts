import {
  Component,
  inject,
  Input,
  numberAttribute,
  OnDestroy,
  Signal,
  ViewChild,
} from '@angular/core';
import { TransactionType } from '../transaction-type';
import { FormsModule, NgForm } from '@angular/forms';
import { NewTransaction } from '../new-transaction';
import { SelectCategoryComponent } from '../select-category/select-category.component';
import { Category } from '../category';
import { DatePipe, JsonPipe, LowerCasePipe, NgIf } from '@angular/common';
import { LocalDateValueAccessor } from 'angular-date-value-accessor';
import { Transaction } from '../transaction';
import { TransactionService } from '../transaction.service';
import { isTransaction } from '../is-transaction';
import { CategoryService } from '../category.service';
import { transactionTypeAttribute } from '../transaction-type-attribute';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    FormsModule,
    SelectCategoryComponent,
    NgIf,
    DatePipe,
    LocalDateValueAccessor,
    TransactionFormComponent,
    JsonPipe,
    RouterLink,
    LowerCasePipe,
    TranslocoDirective,
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent implements OnDestroy {
  @ViewChild('f') form!: NgForm;
  @Input({ alias: 'type', transform: transactionTypeAttribute })
  type: TransactionType | undefined;
  @Input({ alias: 'transactionId', transform: numberAttribute })
  set transactionId(transactionId: number | undefined) {
    if (!!transactionId) {
      this.transactionService.loadOne(transactionId);
    }
  }

  readonly categories: Signal<Category[]>;
  readonly transaction: Signal<Transaction | null>;

  private readonly categoryService = inject(CategoryService);
  private readonly transactionService = inject(TransactionService);

  constructor() {
    this.categories = this.categoryService.categories;
    this.transaction = this.transactionService.transaction;
  }

  saveTransaction(transaction: NewTransaction | Transaction) {
    if (isTransaction(transaction)) {
      this.transactionService.update(transaction, '/');
    } else {
      this.transactionService.add(transaction, '/');
    }
  }

  ngOnDestroy() {
    if (this.transaction()) {
      this.transactionService.clearTransaction();
    }
  }
}
