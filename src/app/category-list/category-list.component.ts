import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Output() deleteCategory = new EventEmitter<number>();
  @Output() updateCategory = new EventEmitter<number>();
}
