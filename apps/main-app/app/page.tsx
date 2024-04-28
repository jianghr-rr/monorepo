import type { AppProps } from 'next/app';
import MainView from 'components/common/main-view';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="flex min-h-screen flex-col justify-center text-center">
      <h2 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
        <span className="font-extrabold">主应用</span>
      </h2>
      <section className="mt-10 flex justify-center space-x-4">
        <MainView>
          <Component {...pageProps} />
        </MainView>
      </section>
    </main>
  );
}

export default MyApp;
