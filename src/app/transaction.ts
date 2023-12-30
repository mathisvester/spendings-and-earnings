import { NewTransaction } from './new-transaction';
import { WithID } from 'ngx-indexed-db';

export type Transaction = NewTransaction & WithID;
