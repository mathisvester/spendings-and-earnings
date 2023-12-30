import { Transaction } from './transaction';
import { Filter } from './filter';

export function filterTransactions(
  transactions: Transaction[],
  filter: Filter
): Transaction[] {
  return transactions.filter(
    t =>
      t.date.getMonth() === filter.month && t.date.getFullYear() === filter.year
  ); // todo: apply filter by category
}
