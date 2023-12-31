import { Filter } from './filter';

export function defaultFilter(): Filter {
  return {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    categoryId: '',
  };
}
