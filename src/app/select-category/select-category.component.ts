import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective } from '@ngneat/transloco';
import { LabelComponent } from '../ui/label/label.component';

@Component({
  selector: 'app-select-category',
  standalone: true,
  imports: [FormsModule, TranslocoDirective, LabelComponent],
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.scss',
})
export class SelectCategoryComponent {
  @Input() categories: Category[] = [];
  @Input() categoryId: number | null = null;
  @Output() categoryIdChange = new EventEmitter<number>();
}
