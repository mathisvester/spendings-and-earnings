import { Transaction } from './transaction';
import { Filter } from './filter';

export function filterTransactions(
  transactions: Transaction[],
  filter: Filter
): Transaction[] {
  return transactions.filter(t => {
    if (filter.categoryId === null) {
      return (
        createdAtFilter(t, filter) &&
        dateFilter(t, filter) &&
        startEndFilter(t, filter)
      );
    } else {
      return (
        createdAtFilter(t, filter) &&
        dateFilter(t, filter) &&
        startEndFilter(t, filter) &&
        t.categoryId === filter.categoryId
      );
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

function createdAtFilter(t: Transaction, filter: Filter): boolean {
  return (
    t.createdAt.getMonth() <= filter.month &&
    t.createdAt.getFullYear() <= filter.year
  );
}

function startEndFilter(t: Transaction, filter: Filter): boolean {
  if (!!t.start && !!t.end) {
    return (
      t.start.getMonth() <= filter.month &&
      t.start.getFullYear() <= filter.year &&
      t.end.getMonth() >= filter.month &&
      t.end.getFullYear() >= filter.year
    );
  } else {
    return true;
  }
}
