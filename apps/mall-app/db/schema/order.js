import {
    mysqlTable, serial, int, bigint, decimal, datetime, index, uniqueIndex,
} from "drizzle-orm/mysql-core";
  
const mmallOrder = mysqlTable(
    "mmall_order",
    {
        id: serial("id").autoincrement().primaryKey().notNull(), //订单id
        orderNo: bigint("orderNo", { mode: 'bigint' }), // 订单号
        userId: int("userId"), //用户id
        shippingId: int("shippingId"), //收货地址id
        payment: decimal("payment", { precision: 20, scale: 2 }), //实际付款金额,单位是元,保留两位小数
        paymentType: int("paymentType"), //支付类型,1-在线支付
        postage: int("postage"), //运费,单位是元
        status: int("status"), // 订单状态:0-已取消-10-未付款，20-已付款，40-已发货，50-交易成功，60-交易关闭
        paymentTime: datetime("paymentTime"), //支付时间
        sendTime: datetime("sendTime"), //发货时间
        endTime: datetime("endTime"), //交易完成时间
        closeTime: datetime("closeTime"), //交易关闭时间
        createTime: datetime("createTime"), //创建时间
        updateTime: datetime("updateTime"), //更新时间
    },
    // 索引定义
    (category) => ({
        uniqueIdIndex: uniqueIndex('mmall_order_id__unique').on(category.id),
        idIndex: index('mmall_order_id__idx').on(category.id),
    })
);

export default mmallOrder;
export { mmallOrder }
