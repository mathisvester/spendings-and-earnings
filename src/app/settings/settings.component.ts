import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  Signal,
} from '@angular/core';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoryComponent } from '../category/category.component';
import { NewCategory } from '../new-category';
import { Category } from '../category';
import { isCategory } from '../is-category';
import { CategoryService } from '../category.service';
import { TranslocoDirective } from '@ngneat/transloco';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CategoryListComponent,
    CategoryComponent,
    TranslocoDirective,
    PageComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {
    this.selectCategory(null);
  }

  saveCategory(category: NewCategory | Category) {
    if (isCategory(category)) {
      this.categoryService.update(category);
    } else {
      this.categoryService.create(category);
    }
  }

  deleteCategory(categoryId: number) {
    this.categoryService.delete(categoryId);
  }

  selectCategory(categoryId: number | null) {
    this.categoryService.selectCategory(categoryId);
  }
}
