'use client';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Slogan from '~/components/slogan';
import { Button } from '~components/ui/button';

export const SignOutButton = ({
  user,
}: {
  user?: {
    name?: string | null | undefined;
    image?: string | null | undefined;
    email?: string | null | undefined;
  };
}) => {
  return (
    <div className="flex min-h-screen flex-col  justify-center text-center">
      知识库首页
      <div>
        {user?.name}
        {user?.image && (
          <Image
            style={{ margin: '0 auto' }}
            src={user?.image}
            width="32"
            height="32"
            alt="Picture of the author"
          />
        )}
        <Button variant="secondary" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
      <Slogan />
    </div>
  );
};
