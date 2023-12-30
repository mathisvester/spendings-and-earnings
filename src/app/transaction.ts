import { NewTransaction } from './new-transaction';

export interface Transaction extends NewTransaction {
  id: string;
}
