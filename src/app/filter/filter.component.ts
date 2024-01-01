import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';
import { SelectCategoryComponent } from '../select-category/select-category.component';
import { FormsModule } from '@angular/forms';
import {
  DecimalPipe,
  FormStyle,
  getLocaleMonthNames,
  TranslationWidth,
} from '@angular/common';
import { Filter } from '../filter';
import { TranslocoDirective } from '@ngneat/transloco';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    SelectCategoryComponent,
    FormsModule,
    DecimalPipe,
    TranslocoDirective,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Input() categories: Category[] = [];
  @Input({ required: true }) filter!: Filter;
  @Output() filterChange = new EventEmitter<Filter>();

  get years() {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let i = 0; i < 5; i++) {
      years.push(currentYear - i);
    }

    return years;
  }

  readonly months = getLocaleMonthNames(
    'en-US',
    FormStyle.Format,
    TranslationWidth.Wide
  );

  submit() {
    this.filterChange.emit({ ...this.filter });
  }
}
