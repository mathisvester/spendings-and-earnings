import { Component, Input } from '@angular/core';
import { Category } from '../category';
import { SelectCategoryComponent } from '../select-category/select-category.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [SelectCategoryComponent, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Input() categories: Category[] = [];
  categoryId = '';
}
