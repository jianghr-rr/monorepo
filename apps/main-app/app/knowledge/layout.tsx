import type { AppProps } from 'next/app';
import MainView from 'components/common/main-view';

// function MicroLayout({ Component, pageProps }: AppProps) {
//   return (
//     <main className="flex min-h-screen flex-col justify-center text-center">
//       <h2 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
//         <span className="font-extrabold">子应用</span>
//       </h2>
//       <section className="mt-10 flex justify-center space-x-4">
//         123
//       </section>
//     </main>
//   );
// }

export default function MicroLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainView>
      <>{children}</>
    </MainView>
  );
}
