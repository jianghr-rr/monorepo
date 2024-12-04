import { sql } from 'drizzle-orm';
import {
    mysqlTable, serial, int, varchar, decimal, text, timestamp,
    index, uniqueIndex
} from "drizzle-orm/mysql-core";

const mmallProduct = mysqlTable("mmall_product", {
    id: serial('id').autoincrement().primaryKey().notNull(), // 商品id  自增主键
    categoryId: int("categoryId").notNull(), // 分类id, 对应mmall_category表的主键  分类id
    name: varchar("name", { length: 100 }).notNull(), // 商品名称  商品名称
    subtitle: varchar("subtitle", { length: 200 }), // 商品副标题  商品副标题
    mainImage: varchar("mainImage", { length: 500 }), // 产品主图,url相对地址  产品主图
    subImages: text("subImages"), // 图片地址,json格式,扩展用  图片地址
    detail: text("detail"), // 商品详情  商品详情
    price: decimal("price", { precision: 20, scale: 2 }).notNull(), // 价格,单位-元保留两位小数  商品价格
    stock: int("stock").notNull(), // 库存数量  库存数量
    status: int("status").default(1), // 商品状态.1-在售 2-下架 3-删除  商品状态
    createTime: timestamp("createTime").default(sql`now()`), // 创建时间  创建时间
    updateTime: timestamp("updateTime").default(sql`now()`), // 更新时间  更新时间
},
(table) => ({
    uniqueIdIndex: uniqueIndex('mmall_product_id__unique').on(table.id),
    idIndex: index('mmall_product_id__idx').on(table.id), // 索引定义
}));

export default mmallProduct;
export { mmallProduct };
