import { Filter } from './filter';

export const defaultFilter: Filter = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  categoryId: '',
};
