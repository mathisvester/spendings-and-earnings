import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewCategory } from '../new-category';

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-category.component.html',
  styleUrl: './new-category.component.scss',
})
export class NewCategoryComponent {
  @Output() addCategory = new EventEmitter<NewCategory>();
  title = '';
}
