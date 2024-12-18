// import { sql } from 'drizzle-orm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/db';
import { mmallUser } from '~/db/migrations/schema';
import { errorResponse, successResponse } from '~/utils/api-response';
import { logger } from '~/utils/logger';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('req', req);
    const result = await db.select().from(mmallUser);
    res.status(200).json(successResponse('查询成功', result));
  } catch (error) {
    // 捕获错误并返回失败的响应
    console.error('Database connection failed:', error);
    logger.error(`Error: ${(error as Error).message}`);
    res.status(200).json(errorResponse(1001, '业务异常请联系管理员', error));
  }
}
