import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.scss',
})
export class SelectCategoryComponent {
  @Input() categories: Category[] = [];
  @Input() categoryId: number | null = null;
  @Output() categoryIdChange = new EventEmitter<number>();
}
