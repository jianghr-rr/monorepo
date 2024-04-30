'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect } from 'react';
import WujieReact from 'wujie-react';
import HomeNav from '~/components/home-nav';
import hostMap from '~/micro/hostmap';
import lifecycle from '~/micro/lifecycle';
import plugins from '~/micro/plugin';
// const { setupApp, preloadApp } = WujieReact;
// const isProduction = process.env.NODE_ENV === 'production';
// bus.$on('click', (msg) => window.alert(msg));

function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const degrade =
        window.localStorage.getItem('degrade') === 'true' ||
        !window.Proxy ||
        !window.CustomElementRegistry;
      const { setupApp, preloadApp } = WujieReact;
      /**
       * 配置应用，主要是设置默认配置
       * preloadApp、startApp的配置会基于这个配置做覆盖
       */
      setupApp({
        name: 'knowledge',
        url: hostMap('//localhost:4001/'),
        exec: true,
        fetch: (url: RequestInfo, options: any) => {
          return window.fetch(url, { ...options, credentials: 'omit' });
        },
        plugins,
        // prefix: { 'prefix-dialog': '/dialog', 'prefix-location': '/location' },
        degrade,
        ...lifecycle,
      } as any);

      if (window.localStorage.getItem('preload') !== 'false') {
        preloadApp({
          name: 'knowledge',
          url: '//localhost:4001/',
        });
      }
    }
  });

  return (
    <main className="flex min-h-screen flex-col justify-center text-center">
      <HomeNav />
      <h2 className="scroll-m-20 text-4xl tracking-tight lg:text-5xl">
        <span className="font-extrabold">知识库</span>
      </h2>
      <section className="mt-10 flex justify-center space-x-4"></section>
    </main>
  );
}

export default Home;
