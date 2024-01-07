import { DBConfig, ObjectStoreSchema } from 'ngx-indexed-db';

const baseObjectStoreSchema: ObjectStoreSchema[] = [
  { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
  { name: 'updatedAt', keypath: 'updatedAt', options: { unique: false } },
  { name: 'version', keypath: 'version', options: { unique: false } },
];

export const dbConfig: DBConfig = {
  name: 'SpendingsAndEarningsDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'transactions',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        ...baseObjectStoreSchema,
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
        { name: 'interval', keypath: 'interval', options: { unique: false } },
        { name: 'start', keypath: 'start', options: { unique: false } },
        { name: 'end', keypath: 'end', options: { unique: false } },
      ],
    },
    {
      store: 'categories',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        ...baseObjectStoreSchema,
        { name: 'title', keypath: 'title', options: { unique: false } },
      ],
    },
  ],
};
