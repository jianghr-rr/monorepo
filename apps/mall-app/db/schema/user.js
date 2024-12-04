import { sql } from 'drizzle-orm';
import {
    mysqlTable, serial, int, varchar, timestamp, uniqueIndex,
} from "drizzle-orm/mysql-core";

const mmallUser = mysqlTable("mmall_user", {
    id: serial('id').autoincrement().primaryKey().notNull(), // 用户表id 自增主键
    username: varchar("username", { length: 50 }).notNull(), // 用户名 用户名
    password: varchar("password", { length: 50 }).notNull(), // 用户密码，MD5加密 用户密码
    email: varchar("email", { length: 50 }), // 邮箱 邮箱
    phone: varchar("phone", { length: 20 }), // 电话号码 电话号码
    question: varchar("question", { length: 100 }), // 找回密码问题 找回密码问题
    answer: varchar("answer", { length: 100 }), // 找回密码答案 找回密码答案
    role: int("role").notNull(), // 角色0-管理员,1-普通用户 用户角色
    createTime: timestamp("createTime").notNull().default(sql`now()`), // 创建时间 创建时间
    updateTime: timestamp("updateTime").notNull().default(sql`now()`), // 最后一次更新时间 最后一次更新时间
},
(table) => ({
    usernameUniqueIndex: uniqueIndex('user_name_unique').on(table.username), // 唯一索引：用户名
}));

export default mmallUser;
export { mmallUser }
