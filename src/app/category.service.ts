import {
  computed,
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Category } from './category';
import { NewCategory } from './new-category';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readonly categories: Signal<Category[]>;
  readonly selectedCategory: Signal<Category | null>;
  private readonly _categories: WritableSignal<Category[]> = signal([]);
  private readonly _selectedCategoryId: WritableSignal<number | null> =
    signal(null);

  private readonly dbService = inject(NgxIndexedDBService);

  constructor() {
    this.categories = this._categories.asReadonly();
    this.selectedCategory = computed(
      () =>
        this._categories().find(
          category => category.id === this._selectedCategoryId()
        ) ?? null
    );
  }

  load() {
    this.dbService.getAll<Category>('categories').subscribe(categories => {
      this._categories.update(() => categories);
    });
  }

  create(createCategory: NewCategory) {
    const transaction: Omit<Category, 'id'> = {
      ...createCategory,
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
    };

    this.dbService.add('categories', transaction).subscribe(key => {
      this._categories.update(categories => [...categories, key]);
    });
  }

  delete(categoryId: number) {
    this.dbService
      .deleteByKey('categories', categoryId)
      .pipe(filter(Boolean))
      .subscribe(() => {
        this._categories.update(categories =>
          categories.filter(category => category.id !== categoryId)
        );
      });
  }

  update(updateCategory: Category) {
    const category: Category = {
      ...updateCategory,
      updatedAt: new Date(),
      version: updateCategory.version + 1,
    };

    this.dbService.update('categories', category).subscribe(key => {
      this._categories.update(categories =>
        categories.map(c => (c.id === key.id ? key : c))
      );
      this.selectCategory(null);
    });
  }

  selectCategory(categoryId: number | null) {
    this._selectedCategoryId.set(categoryId);
  }
}
