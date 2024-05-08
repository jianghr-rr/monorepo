/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { db } from '~/db';
import { users } from '~/db/schema';
import { authOptions } from '~lib/auth/auth-options';

export const getSession = async () => {
  return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
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
