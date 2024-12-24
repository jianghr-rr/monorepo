/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server';
import CryptoJS from 'crypto-js';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { db } from '~/db';
import { mmallUser, sessions } from '~/db/migrations/schema';
import { encrypt } from '~/lib/auth/session';
import { SignupFormSchema, type FormState } from '~/lib/definitions';

const signup = async (state: FormState<FormData>, formData: FormData) => {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    question: formData.get('question'),
    answer: formData.get('answer'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      formData: formData,
    };
  }

  // 客户端校验通过后准备插入数据
  const { username, email, password, phone, question, answer } =
    validatedFields.data;
  const hashedPassword = CryptoJS.MD5(password + process.env.SALT).toString();

  try {
    const params = {
      username,
      email,
      password: hashedPassword,
      phone,
      question,
      answer,
      role: 1,
    };
    // const session = await verifySession();
    // if (!session.isAuth) {
    //   throw new Error('heiheihei.');
    // }
    // 校验是否重名
    const existingUser = await db
      .select()
      .from(mmallUser)
      .where(eq(mmallUser.username, username))
      .execute();
    if (existingUser.length > 0) {
      return {
        errors: {
          username: ['用户名已存在'],
        },
        formData: formData,
      };
    }

    // 校验邮箱
    const existingEmail = await db
      .select()
      .from(mmallUser)
      .where(eq(mmallUser.email, email))
      .execute();
    if (existingEmail.length > 0) {
      return {
        errors: {
          email: ['邮箱已存在'],
        },
        formData: formData,
      };
    }

    // 校验手机号
    const existingPhone = await db
      .select()
      .from(mmallUser)
      .where(eq(mmallUser.phone, phone))
      .execute();
    if (existingPhone.length > 0) {
      return {
        errors: {
          phone: ['手机号已存在'],
        },
        formData: formData,
      };
    }

    const data = await db.insert(mmallUser).values(params).execute();
    // 查询插入的数据
    const insertedData = await db
      .select()
      .from(mmallUser)
      .where(eq(mmallUser.id, data[0].insertId))
      .execute();

    if (insertedData[0]) {
      const { id } = insertedData[0];
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
    } else {
      throw new Error('An error occurred while creating your account.');
    }
  } catch (e) {
    return {
      message:
        (e as Error).message ??
        'An error occurred while creating your account.',
      formData: formData,
    };
  }
};

const signupAdapter = async (
  state: FormState<FormData>,
  payload: FormData
): Promise<FormState<FormData>> => {
  const result = await signup(state, payload);

  // 确保返回值符合类型
  return {
    ...result,
    message: result?.message ?? undefined, // message 必须是 string | undefined
  };
};

export { signupAdapter };
export default signupAdapter;
