import {
    mysqlTable, int, bigint, varchar, decimal, datetime, uniqueIndex, index
} from "drizzle-orm/mysql-core";

const mmallOrderItem = mysqlTable("mmall_order_item", {
  id: int("id").notNull().autoincrement().primaryKey(), // 订单子表id
  userId: int("userId"), // 用户id
  orderNo: bigint("orderNo", { mode: "number" }), // 订单号
  productId: int("productId"), // 商品id
  productName: varchar("productName", { length: 100 }), // 商品名称
  productImage: varchar("productImage", { length: 500 }), // 商品图片地址
  currentUnitPrice: decimal("currentUnitPrice",  { precision: 20, scale: 2 }), // 生成订单时的商品单价，单位是元,保留两位小数
  quantity: int("quantity"), // 商品数量
  totalPrice: decimal("totalPrice",  { precision: 20, scale: 2 }), // 商品总价,单位是元,保留两位小数
  createTime: datetime("createTime"), // 创建时间
  updateTime: datetime("updateTime"), // 更新时间
}, (orderItem) => ({
    uniqueIdIndex: uniqueIndex('mmall_order_item_id__unique').on(orderItem.id),
    idIndex: index('mmall_order_item_id__idx__order_no').on(orderItem.id, orderItem.orderNo),
}));

export default mmallOrderItem;
export {mmallOrderItem}
