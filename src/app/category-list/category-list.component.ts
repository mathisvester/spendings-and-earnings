import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';
import { CurrencyPipe } from '@angular/common';
import { TranslocoDirective } from '@ngneat/transloco';
import { ButtonComponent } from '../ui/button/button.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CurrencyPipe, TranslocoDirective, ButtonComponent, NgIcon],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  providers: provideIcons({ heroTrash, heroPencilSquare }),
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Output() deleteCategory = new EventEmitter<number>();
  @Output() updateCategory = new EventEmitter<number>();
}
