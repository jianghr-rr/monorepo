import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { db } from '~/db';
import { mmallUser, sessions } from '~/db/migrations/schema';
import { encrypt } from '~/lib/auth/session';
import { errorResponse, successResponse } from '~/utils/api-response';
import { logger } from '~/utils/logger';
// import { withCleanResponse } from '~/utils/with-clean-response';
import type { ISingUp } from '~types/user.types';

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as ISingUp;
    console.log('--------- req ---------');
    console.log(body);
    const params = body;
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

      // Response.json(successResponse('注册成功', rest));
      return new Response(JSON.stringify(successResponse('注册成功', rest)), {
        status: 200, // 设置 HTTP 状态码为 200
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(
        JSON.stringify(errorResponse(1001, '注册失败，未获取到用户数据')),
        { status: 200 } // 设置 HTTP 状态码为 200
      );
    }
  } catch (error) {
    // 捕获错误并返回失败的响应
    logger.error(`Error: ${(error as Error).message}`);
    return new Response(
      JSON.stringify(errorResponse(1001, '业务异常请联系管理员', '注册失败')),
      {
        status: 200, // 设置 HTTP 状态码为 200
      }
    );
  }
};
