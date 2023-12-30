import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'SpendingsAndEarningsDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'transactions',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'type', keypath: 'type', options: { unique: false } },
        { name: 'date', keypath: 'date', options: { unique: false } },
        { name: 'amount', keypath: 'amount', options: { unique: false } },
        {
          name: 'description',
          keypath: 'description',
          options: { unique: false },
        },
        {
          name: 'categoryId',
          keypath: 'categoryId',
          options: { unique: false },
        },
        { name: 'recurring', keypath: 'recurring', options: { unique: false } },
      ],
    },
    {
      store: 'categories',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'title', keypath: 'title', options: { unique: false } },
      ],
    },
  ],
};
