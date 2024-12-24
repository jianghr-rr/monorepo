import { z } from 'zod';

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters long.' })
    .trim(),
  password: z
    .string()
    .min(3, { message: 'Be at least 3 characters long' })
    // .regex(/[a-z]/i, { message: 'Contain at least one letter.' })
    // .regex(/\d/, { message: 'Contain at least one number.' })
    // .regex(/[^a-z0-9]/i, {
    //   message: 'Contain at least one special character.',
    // })
    .trim(),
});

export type FormState<T = undefined, D = undefined> =
  | {
      errors?: {
        username?: string[];
        password?: string[];
      };
      message?: string; // 异常返回的消息;
      formData?: T;
      data?: D;
    }
  | undefined;

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};
