import { sql } from 'drizzle-orm';
import {
    mysqlTable, serial, int, varchar, timestamp, index, uniqueIndex
} from "drizzle-orm/mysql-core";

const mmallShipping = mysqlTable("mmall_shipping", {
    id: serial('id').autoincrement().primaryKey().notNull(), // 自增主键
    userId: int("userId"), // 用户id 用户id
    receiverName: varchar("receiverName", { length: 20 }), // 收货姓名 收货姓名
    receiverPhone: varchar("receiverPhone", { length: 20 }), // 收货固定电话 收货固定电话
    receiverMobile: varchar("receiverMobile", { length: 20 }), // 收货移动电话 收货移动电话
    receiverProvince: varchar("receiverProvince", { length: 20 }), // 省份 省份
    receiverCity: varchar("receiverCity", { length: 20 }), // 城市 城市
    receiverDistrict: varchar("receiverDistrict", { length: 20 }), // 区/县 区/县
    receiverAddress: varchar("receiverAddress", { length: 200 }), // 详细地址 详细地址
    receiverZip: varchar("receiverZip", { length: 6 }), // 邮编 邮编
    createTime: timestamp("createTime").default(sql`now()`), // 创建时间 创建时间
    updateTime: timestamp("updateTime").default(sql`now()`), // 更新时间 更新时间
},
(table) => ({
    uniqueIdIndex: uniqueIndex('mmall_shipping_id__unique').on(table.id),
    idIndex: index('mmall_shipping_id__idx').on(table.id), // 索引定义
}));

export default mmallShipping;
export { mmallShipping };
