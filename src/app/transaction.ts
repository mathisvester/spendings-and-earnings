import { NewTransaction } from './new-transaction';
import { BaseEntry } from './base-entry';

export type Transaction = NewTransaction & BaseEntry;
