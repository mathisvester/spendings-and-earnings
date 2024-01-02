import { TransactionType } from './transaction-type';
import { TransactionInterval } from './transaction-interval';

export interface NewTransaction {
  type: TransactionType;
  date: Date;
  amount: number;
  description?: string;
  categoryId: number | null;
  interval: TransactionInterval;
}
