import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Category } from '../category';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective } from '@ngneat/transloco';
import { LabelDirective } from '../label.directive';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronUpDown } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-select-category',
  standalone: true,
  imports: [FormsModule, TranslocoDirective, LabelDirective, NgIcon],
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: provideIcons({ heroChevronUpDown }),
})
export class SelectCategoryComponent {
  @Input() categories: Category[] = [];
  @Input() categoryId: number | null = null;
  @Input() defaultOptionLabel: string | null = null;
  @Output() categoryIdChange = new EventEmitter<number>();
}
