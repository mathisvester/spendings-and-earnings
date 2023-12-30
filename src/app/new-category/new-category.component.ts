import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NewCategory } from '../new-category';
import { Category } from '../category';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.scss',
})
export class NewCategoryComponent {
  @ViewChild('f') form!: NgForm;
  @Output() saveCategory = new EventEmitter<NewCategory>();
  @Input() set selectedCategory(category: Category | null) {
    this._selectedCategory = category;

    if (this._selectedCategory) {
      this.setFormValue(this._selectedCategory);
    }
  }

  get selectedCategory(): Category | null {
    return this._selectedCategory;
  }

  title = '';

  private _selectedCategory: Category | null = null;

  submit() {
    const category: Category | NewCategory = {
      ...(this.selectedCategory && { id: this.selectedCategory.id }),
      title: this.title,
    };

    this.saveCategory.emit(category);
    this.form.reset();
  }

  setFormValue(category: Category) {
    this.title = category.title;
  }
}
