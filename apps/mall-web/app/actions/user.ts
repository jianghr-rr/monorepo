'use server';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { db } from '~/db';
import { mmallUser, sessions } from '~/db/migrations/schema';
import { encrypt, deleteSession } from '~/lib/auth/session';
import { CustomError } from '~/lib/custom-error';
import { verifySession } from '~/lib/dal';

const getUserInfo = async () => {
  try {
    const session = await verifySession();
    if (!session.isAuth) {
      return {
        message: '未登录',
      };
    }
    const { userId } = session;
    const user = await db
      .select()
      .from(mmallUser)
      .where(eq(mmallUser.id, Number(userId)))
      .execute();
    if (user[0]) {
      const { id, username, email, phone, question, answer, role } = user[0];
      return {
        message: '登录成功',
        data: {
          id,
          username,
          email,
          phone,
          question,
          answer,
          role,
        },
      };
    } else {
      throw new CustomError('用户不存在', 400);
    }
  } catch (error) {
    // 对于非自定义错误，抛出默认的 500 错误
    throw new Error('Internal Server Error');
  }
};

export default getUserInfo;
export { getUserInfo };

const logout = async (id: number | string) => {
  try {
    await deleteSession(String(id));
    return {
      data: {
        message: '登出成功',
      },
    };
    // 删除会话
    // const sessionId = cookieStore.get('sessionId')?.value;
    // if (!sessionId) {
    //   throw new CustomError('会话不存在', 400);
    // }
    // await db.delete(sessions).where(eq(sessions.id, sessionId));
    // cookieStore.delete('sessionId');
    // return {
    //   message: '登出成功',
    // };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      throw new Error('Internal Server Error');
    }
  }
};
export { logout };
