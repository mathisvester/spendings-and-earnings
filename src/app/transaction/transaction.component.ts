import {
  ChangeDetectionStrategy,
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
import { DatePipe } from '@angular/common';
import { LocalDateValueAccessor } from 'angular-date-value-accessor';
import { Transaction } from '../transaction';
import { isTransaction } from '../is-transaction';
import { CategoryService } from '../category.service';
import { transactionTypeAttribute } from '../transaction-type-attribute';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { TranslocoDirective, TranslocoService } from '@ngneat/transloco';
import { PageComponent } from '../page/page.component';
import { LanguageService } from '../language.service';
import { TransactionStore } from '../transaction.store';
import { ButtonDirective } from '../button.directive';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    FormsModule,
    SelectCategoryComponent,
    DatePipe,
    LocalDateValueAccessor,
    TransactionFormComponent,
    TranslocoDirective,
    PageComponent,
    ButtonDirective,
  ],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionComponent implements OnDestroy {
  @ViewChild('f') form!: NgForm;
  @Input({ alias: 'type', transform: transactionTypeAttribute })
  type: TransactionType | undefined;
  @Input({ alias: 'transactionId', transform: numberAttribute })
  set transactionId(transactionId: number | undefined) {
    this._transactionId = transactionId;

    if (!!transactionId) {
      this.transactionStore.select(transactionId);
    }
  }

  get transactionId(): number | undefined {
    return this._transactionId;
  }

  get title(): string {
    if (!!this.transactionId) {
      if (this.transaction()?.type === 'EARNING') {
        return this.translocoService.translate('updateEarning');
      } else {
        return this.translocoService.translate('updateSpending');
      }
    } else {
      if (this.type === 'EARNING') {
        return this.translocoService.translate('newEarning');
      } else {
        return this.translocoService.translate('newSpending');
      }
    }
  }

  readonly categories: Signal<Category[]>;
  readonly transaction: Signal<Transaction | null>;
  readonly currencySymbol: string;

  private _transactionId: number | undefined;

  private readonly categoryService = inject(CategoryService);
  private readonly transactionStore = inject(TransactionStore);
  private readonly translocoService = inject(TranslocoService);
  private readonly languageService = inject(LanguageService);

  constructor() {
    this.categories = this.categoryService.categories;
    this.transaction = this.transactionStore.selectedTransaction;
    this.currencySymbol = this.languageService.currencySymbol;
  }

  ngOnDestroy() {
    if (this.transaction()) {
      this.transactionStore.deselect();
    }
  }

  saveTransaction(transaction: NewTransaction | Transaction) {
    if (isTransaction(transaction)) {
      this.transactionStore.update({
        updateTransaction: transaction,
        forward: '/',
      });
    } else {
      this.transactionStore.create({
        createTransaction: transaction,
        forward: '/',
      });
    }
  }

  deleteTransaction() {
    const transactionId = this.transaction()?.id;

    if (!!transactionId) {
      this.transactionStore.delete({ transactionId, forward: '/' });
    }
  }
}
