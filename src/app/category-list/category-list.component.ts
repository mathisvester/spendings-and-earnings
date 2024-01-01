import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';
import { TranslocoDirective } from '@ngneat/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { ButtonDirective } from '../button.directive';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [TranslocoDirective, NgIcon, ButtonDirective],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  providers: provideIcons({ heroTrash, heroPencilSquare }),
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Output() deleteCategory = new EventEmitter<number>();
  @Output() updateCategory = new EventEmitter<number>();
}
