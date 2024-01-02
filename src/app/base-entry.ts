import { WithID } from 'ngx-indexed-db';

export interface BaseEntry extends WithID {
  createdAt: Date;
  updatedAt: Date;
  version: number;
}
