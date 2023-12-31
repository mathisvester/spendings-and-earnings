import { Component, inject, OnInit, Signal } from '@angular/core';
import { CategoryListComponent } from '../category-list/category-list.component';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { NewCategory } from '../new-category';
import { Category } from '../category';
import { isCategory } from '../is-category';
import { CategoryService } from '../category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CategoryListComponent, NewCategoryComponent, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  readonly categories: Signal<Category[]>;
  readonly selectedCategory: Signal<Category | null>;

  private readonly categoryService = inject(CategoryService);

  constructor() {
    this.categories = this.categoryService.categories;
    this.selectedCategory = this.categoryService.selectedCategory;
  }

  ngOnInit() {
    this.categoryService.load();
  }

  saveCategory(category: NewCategory | Category) {
    if (isCategory(category)) {
      this.categoryService.update(category);
    } else {
      this.categoryService.add(category);
    }
  }

  deleteCategory(categoryId: number) {
    this.categoryService.delete(categoryId);
  }

  selectCategory(categoryId: number | null) {
    this.categoryService.selectCategory(categoryId);
  }
}
