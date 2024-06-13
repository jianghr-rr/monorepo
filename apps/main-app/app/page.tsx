import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1 className="mb-8 text-5xl font-bold">Next.js Tutorial</h1>
      <Link href="/client" className="btn btn-accent">
        get started
      </Link>
    </div>
  );
};
export default HomePage;

// import { AuthCard } from '~components/auth-card';
// import { SignOutButton } from '~components/sign-out-button';
// import { getSession } from '~lib/auth/session';

// export default async function Home() {
//   const session = await getSession();
//   console.log('session::', session);

//   return (
//     <main className="flex min-h-screen items-center justify-center">
//       {!session ? <AuthCard /> : <SignOutButton user={session?.user} />}
//     </main>
//   );
// }
