import { Category } from './category';
import { NewCategory } from './new-category';

export function isCategory(
  category: Category | NewCategory
): category is Category {
  return (category as Category).id !== undefined;
}
