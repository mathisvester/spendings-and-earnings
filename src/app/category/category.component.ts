import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NewCategory } from '../new-category';
import { Category } from '../category';
import { TranslocoDirective } from '@ngneat/transloco';
import { InputDirective } from '../input.directive';
import { LabelDirective } from '../label.directive';
import { HeadlineDirective } from '../headline.directive';
import { ButtonDirective } from '../button.directive';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    FormsModule,
    TranslocoDirective,
    InputDirective,
    LabelDirective,
    HeadlineDirective,
    ButtonDirective,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  @ViewChild('inputTitle') inputTitle!: ElementRef;
  @ViewChild('f') form!: NgForm;
  @Output() saveCategory = new EventEmitter<NewCategory>();
  @Input() set selectedCategory(category: Category | null) {
    this._selectedCategory = category;

    if (this._selectedCategory) {
      this.setFormValue(this._selectedCategory);
      setTimeout(() => this.inputTitle.nativeElement?.focus());
    }
  }

  get selectedCategory(): Category | null {
    return this._selectedCategory;
  }

  title = '';

  private _selectedCategory: Category | null = null;

  submit() {
    const category: Category | NewCategory = {
      ...(this.selectedCategory && { ...this.selectedCategory }),
      title: this.title,
    };

    this.saveCategory.emit(category);
    this.form.reset();
  }

  setFormValue(category: Category) {
    this.title = category.title;
  }
}
