import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';
import { FormsModule } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
  selector: 'app-select-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.scss',
})
export class SelectCategoryComponent {
  @Input() categories: Category[] = [];
  @Input() categoryId = '';
  @Output() categoryIdChange = new EventEmitter<string>();
  readonly identifier = uuid.v4();
}
