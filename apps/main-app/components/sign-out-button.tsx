'use client';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
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
    <>
      知识库首页
      <br />
      {user?.name}
      {user?.image && (
        <Image
          src={user?.image}
          width="32"
          height="32"
          alt="Picture of the author"
        />
      )}
      <br />
      <Button variant="secondary" onClick={() => signOut()}>
        Sign out
      </Button>
    </>
  );
};
