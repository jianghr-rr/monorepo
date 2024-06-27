import { sql } from 'drizzle-orm';
import {
  boolean,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

// 这个表存储了用户账户相关的信息，如用户的身份验证令牌、访问令牌、提供商信息等。
export const task = mysqlTable('task', {
  // 账户的唯一标识符。
  id: varchar('id', { length: 255 }).primaryKey().notNull(),
  content: text('content'),
  createdAt: timestamp('createdAt')
    .default(sql`now()`)
    .notNull(),
  completed: boolean('completed').default(false),
});
