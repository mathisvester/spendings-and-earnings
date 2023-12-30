import { Component, Input } from '@angular/core';
import { Category } from '../category';
import { SelectCategoryComponent } from '../select-category/select-category.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-filter',
  standalone: true,
  imports: [SelectCategoryComponent, FormsModule],
  templateUrl: './list-filter.component.html',
  styleUrl: './list-filter.component.scss',
})
export class ListFilterComponent {
  @Input() categories: Category[] = [];
  categoryId = '';
}
