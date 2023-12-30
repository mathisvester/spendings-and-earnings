import { NewCategory } from './new-category';
import { WithID } from 'ngx-indexed-db';

export type Category = NewCategory & WithID;
