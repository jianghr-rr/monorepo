import { index, int, mysqlTable, text, varchar } from 'drizzle-orm/mysql-core';

export const employees = mysqlTable(
  'employees',
  {
    id: varchar('id', { length: 255 }).primaryKey().notNull(),
    name: text('name'),
    salary: int('salary'),
  },
  (account) => ({
    idIndex: index('employees__id__idx').on(account.id),
  })
);
