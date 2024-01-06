import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';
import { SelectCategoryComponent } from '../select-category/select-category.component';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Filter } from '../filter';
import { TranslocoDirective } from '@ngneat/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronUpDown } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    SelectCategoryComponent,
    FormsModule,
    DecimalPipe,
    TranslocoDirective,
    NgIcon,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  providers: provideIcons({ heroChevronUpDown }),
})
export class FilterComponent {
  @Input() categories: Category[] = [];
  @Input({ required: true }) filter!: Filter;
  @Input({ required: true }) monthNames!: readonly string[];
  @Output() filterChange = new EventEmitter<Filter>();

  get years() {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let i = 0; i < 5; i++) {
      years.push(currentYear - i);
    }

    return years;
  }

  submit() {
    this.filterChange.emit({ ...this.filter });
  }
}
