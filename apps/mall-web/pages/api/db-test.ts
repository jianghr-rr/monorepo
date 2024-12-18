import { sql } from 'drizzle-orm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/db'; // 引入你配置的 Drizzle ORM 数据库连接模块

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // 尝试执行一条简单的 SQL 查询，例如获取当前时间
    const result = await db.execute(sql`SELECT NOW() AS currentTime`); // 假设SQLWrapper是一个类，需要实例化

    // 返回成功的响应
    res
      .status(200)
      .json({ message: 'Database connected successfully!', result });
  } catch (error) {
    // 捕获错误并返回失败的响应
    console.error('Database connection failed:', error);
    res
      .status(500)
      .json({ message: 'Database connection failed.', error: String(error) });
  }
}
