import { Transaction } from './transaction';
import { Filter } from './filter';

export function filterTransactions(
  transactions: Transaction[],
  filter: Filter
): Transaction[] {
  return transactions.filter(t => {
    if (filter.categoryId === null) {
      return dateFilter(t, filter);
    } else {
      return dateFilter(t, filter) && t.categoryId === filter.categoryId;
    }
  });
}

function dateFilter(t: Transaction, filter: Filter): boolean {
  const monthFilter = t.date.getMonth() === filter.month;
  const yearFilter = t.date.getFullYear() === filter.year;

  switch (t.interval) {
    case 'MONTHLY':
      return true;
    case 'YEARLY':
      return monthFilter;
    default:
      return monthFilter && yearFilter;
  }
}
