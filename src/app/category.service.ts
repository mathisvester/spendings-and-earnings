import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Category } from './category';
import { NewCategory } from './new-category';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  readonly categories: Signal<Category[]>;
  private readonly _categories: WritableSignal<Category[]> = signal([]);

  constructor() {
    this.categories = this._categories.asReadonly();
  }

  add(category: NewCategory) {
    this._categories.update(categories => [
      ...categories,
      { id: uuid.v4(), ...category },
    ]);
  }

  delete(categoryId: string) {
    this._categories.update(categories =>
      categories.filter(category => category.id !== categoryId)
    );
  }

  update(category: Category) {
    this._categories.update(categories =>
      categories.map(c => (c.id === c.id ? category : c))
    );
  }
}
