import { AuthCard } from '~components/auth-card';
import { SignOutButton } from '~components/sign-out-button';
import { getSession } from '~lib/auth/session';

export default async function Home() {
  const session = await getSession();
  console.log('session::', session);
  return (
    <main className="flex min-h-screen items-center justify-center">
      {!session ? <AuthCard /> : <SignOutButton user={session?.user} />}
    </main>
  );
}
