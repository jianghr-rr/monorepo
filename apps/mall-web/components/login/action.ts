/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server';
import CryptoJS from 'crypto-js';
import { eq, and } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { db } from '~/db';
import { mmallUser, sessions } from '~/db/migrations/schema';
import { encrypt } from '~/lib/auth/session';
import { initServerTranslations } from '~/lib/i18n';
import type { IUserInfo } from '~/types/user.types';
import { createLoginFormSchema, type FormState } from './definitions';

const login = async (
  state: FormState<FormData, IUserInfo>,
  { formData, locale }: { formData: FormData; locale: string }
) => {
  // const { t } = useTranslation();
  // Validate form fields
  const i18n = await initServerTranslations(locale, ['common', 'auth']);
  const t = i18n.t.bind(i18n); // 使用服务器端翻译实例

  const LoginFormSchema = createLoginFormSchema(t);

  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formData: formData,
    };
  }

  // 客户端校验通过后准备插入数据
  const { username, password } = validatedFields.data;
  const hashedPassword = CryptoJS.MD5(password + process.env.SALT).toString();

  try {
    const params = {
      username,
      password: hashedPassword,
    };
    // 查询数据, 匹配名字和密码
    const searchData = await db
      .select()
      .from(mmallUser)
      .where(
        and(
          eq(mmallUser.username, params.username),
          eq(mmallUser.password, params.password)
        )
      )
      .execute();

    if (searchData[0]) {
      const { id, username, email, phone, question, answer, role } =
        searchData[0];
      const expiresAt = new Date(Date.now() + 1 * 1 * 60 * 60 * 1000);

      // 先查询是否存在该用户的session, 若存在则进行更新, 若不存在则进行插入
      const session = await db
        .select()
        .from(sessions)
        .where(eq(sessions.userId, String(id)))
        .execute();
      if (session[0]) {
        await db
          .update(sessions)
          .set({ expiresAt })
          .where(eq(sessions.userId, String(id)))
          .execute();
      } else {
        // 插入新的session记录
        await db.insert(sessions).values({ userId: String(id), expiresAt });
      }

      const sessionToken = await encrypt({ userId: String(id), expiresAt });
      const cookieStore = await cookies();
      cookieStore.set('Authentication', sessionToken, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        path: '/',
      });

      return {
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
      return {
        msg: t('loginError'),
        formData: formData,
      };
    }
  } catch (e) {
    return {
      msg: t('dbError'),
      formData: formData,
    };
  }
};

const loginAdapter = async (
  state: FormState<FormData, IUserInfo>,
  payload: { formData: FormData; locale: string }
): Promise<FormState<FormData, IUserInfo>> => {
  const result = await login(state, payload);

  // 确保返回值符合类型
  return {
    ...result,
    msg: result?.msg ?? undefined, // message 必须是 string | undefined
  };
};

export { loginAdapter };
export default loginAdapter;
