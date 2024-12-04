import { sql } from 'drizzle-orm';
import {
  int, mysqlTable, timestamp, index, uniqueIndex,
} from 'drizzle-orm/mysql-core';

const mmallCart = mysqlTable(
  'mmall_cart',
  {
    id: int('id').autoincrement().primaryKey().notNull(),
    userId: int('userId').notNull(),
    productId: int('productId'),
    quantity: int('quantity'),
    checked: int('checked'),
    createTime: timestamp('createTime').default(sql`now()`).notNull(),
    updateTime: timestamp('updateTime').default(sql`now()`).notNull(),
  },
  // 调整索引命名以保持一致
  (cart) => ({
    uniqueUserIdIndex: uniqueIndex('mmall_cart__user_id__unique').on(
      cart.userId
    ),
    userIdIndex: index('mmall_cart__user_id__idx').on(cart.userId),
  })
);

export default mmallCart;
export {mmallCart}