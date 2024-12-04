import { sql } from 'drizzle-orm';
import {
  int, serial, mysqlTable, varchar, tinyint, timestamp, uniqueIndex, index,
} from 'drizzle-orm/mysql-core';

const mmallCategory = mysqlTable(
  'mmall_category',
  {
    id: serial('id').autoincrement().primaryKey().notNull(), // 类别Id
    parentId: int("parentId"), // 父类别id当id=0时说明是根节点,一级类别
    name: varchar("name", { length: 255 }), // 类别名称
    status: tinyint("status").default(1), // 类别状态1-正常,2-已废弃
    sortOrder: int("sortOrder"), // 排序编号,同类展示顺序,数值相等则自然排序
    createTime: timestamp("createTime").default(sql`now()`).notNull(),
    updateTime: timestamp("updateTime").default(sql`now()`).notNull(),
  },
  // 调整索引命名以保持一致
  (category) => ({
    uniqueIdIndex: uniqueIndex('mmall_category_id__unique').on(category.id),
    idIndex: index('mmall_category_id__idx').on(category.id),
  })
);

export default mmallCategory;
export {mmallCategory}
