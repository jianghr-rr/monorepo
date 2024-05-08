import { AuthCard } from '~components/auth-card';
import { SignOutButton } from '~components/sign-out-button';
import { getSession } from '~lib/auth/session';

export default async function Home() {
  const session = await getSession();

  return (
    <main className="bg-dark flex min-h-screen items-center justify-center text-white">
      {!session ? <AuthCard /> : <SignOutButton />}
    </main>
  );
}
