'use server';
import { eq } from 'drizzle-orm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cookies } from 'next/headers';
import { db } from '~/db';
import { mmallUser, sessions } from '~/db/migrations/schema';
import { encrypt } from '~/lib/auth/session';
import { errorResponse, successResponse } from '~/utils/api-response';
import { logger } from '~/utils/logger';
// import { withCleanResponse } from '~/utils/with-clean-response';
import type { ISingUp } from '~types/user.types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params = req.body as ISingUp;
    params.role = 1;
    const data = await db.insert(mmallUser).values(params);

    // 查询插入的数据
    const insertedData = await db
      .select()
      .from(mmallUser)
      .where(eq(mmallUser.id, data[0].insertId))
      .execute();

    if (insertedData[0]) {
      const { password, id, ...rest } = insertedData[0];

      const expiresAt = new Date(Date.now() + 1 * 1 * 60 * 60 * 1000);

      await db.insert(sessions).values({ userId: String(id), expiresAt });
      const sessionToken = await encrypt({ userId: String(id), expiresAt });

      const cookieStore = await cookies();
      cookieStore.set('Authentication', sessionToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        path: '/',
      });

      res.status(200).json(successResponse('注册成功', rest));
    } else {
      res.status(200).json(errorResponse(1001, '注册失败，未获取到用户数据'));
    }
  } catch (error) {
    // 捕获错误并返回失败的响应
    logger.error(`Error: ${(error as Error).message}`);
    res
      .status(200)
      .json(errorResponse(1001, '业务异常请联系管理员', '注册失败'));
  }
};

export default handler;
