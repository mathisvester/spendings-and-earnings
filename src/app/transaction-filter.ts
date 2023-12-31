import { Transaction } from './transaction';
import { Filter } from './filter';

export function filterTransactions(
  transactions: Transaction[],
  filter: Filter
): Transaction[] {
  return transactions.filter(t => {
    const dateFilter =
      t.date.getMonth() === filter.month &&
      t.date.getFullYear() === filter.year;

    if (filter.categoryId === null) {
      return dateFilter;
    } else {
      return dateFilter && t.categoryId === filter.categoryId;
    }
  });
}
