/* eslint-disable @typescript-eslint/no-unsafe-argument */
import 'server-only';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { cache } from 'react';
import { db } from '~/db';
import { users } from '~/db/schema';
import { authOptions } from '~lib/auth/auth-options';

export const getSessionFn = async () => {
  return await getServerSession(authOptions);
};

export const getSession = cache(getSessionFn);

export const getCurrentUserFn = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const [currentUser] = await db
      .select({
        userId: users.id,
        email: users.email,
        name: users.name,
        image: users.image,
        createdAt: users.created_at,
      })
      .from(users)
      .where(eq(users.id, (session.user as { id: string }).id));
    return currentUser;
  }

  return null;
};

export const getCurrentUser = cache(getCurrentUserFn);
