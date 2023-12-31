import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';
import { CurrencyPipe } from '@angular/common';
import { TranslocoDirective } from '@ngneat/transloco';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CurrencyPipe, TranslocoDirective, ButtonComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Output() deleteCategory = new EventEmitter<number>();
  @Output() updateCategory = new EventEmitter<number>();
}
