import { TransactionType } from './transaction-type';

export function transactionTypeAttribute(
  type: string
): TransactionType | undefined {
  let transactionType: TransactionType | undefined;

  switch (type) {
    case 'earning':
      transactionType = 'EARNING';
      break;
    case 'spending':
      transactionType = 'SPENDING';
      break;
    default:
      transactionType = undefined;
      break;
  }

  return transactionType;
}
