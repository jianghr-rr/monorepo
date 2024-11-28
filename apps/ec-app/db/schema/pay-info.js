import { sql } from 'drizzle-orm';
import {
    mysqlTable, serial, int, varchar, bigint, timestamp,
    uniqueIndex, index,
} from "drizzle-orm/mysql-core";

const mmallPayInfo = mysqlTable("mmall_pay_info", {
    id: serial('id').autoincrement().primaryKey().notNull(), // 自增主键
    userId: int("userId"), // 用户id"), // 用户ID
    orderNo: bigint("orderNo", { mode: "bigint" }), // 订单号"), // 订单号
    payPlatform: int("payPlatform"), // 支付平台:1-支付宝,2-微信"), // 支付平台
    platformNumber: varchar("platformNumber", { length: 200 }), // 支付宝支付流水号"), // 支付流水号
    platformStatus: varchar("platformStatus", { length: 20 }), // 支付宝支付状态"), // 支付状态
    createTime: timestamp("createTime").default(sql`now()`).notNull(),
    updateTime: timestamp("updateTime").default(sql`now()`).notNull(),
},
// 调整索引命名以保持一致
(table) => ({
  uniqueIdIndex: uniqueIndex('mmall_pay_info_id__unique').on(table.id),
  idIndex: index('mmall_pay_info_id__idx').on(table.id),
}));

export default mmallPayInfo;
export { mmallPayInfo };
