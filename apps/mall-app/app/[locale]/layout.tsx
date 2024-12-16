import { dir } from 'i18next';
import type { ReactNode } from 'react';
import { inter, lexend } from '~/app/[locale]/fonts';
import HomeNav from '~/components/home-nav';
import { Toaster } from '~/components/ui/toaster';
import i18nConfig from '~/i18nConfig';
import { AppProviders } from '~/providers/app-providers';
import initTranslations from '../i18n';
import './globals.css';

export const metadata = {
  title: 'mall',
  description: 'mall',
};

interface LayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const i18nNamespaces = ['home'];

const RootLayout = async function ({ children, params }: LayoutProps) {
  const { locale } = await Promise.resolve(params); // 处理异步 `params`
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`h-full scroll-smooth ${inter.variable} ${inter.className} ${lexend.className}`}
    >
      <body className="flex h-full flex-col">
        <AppProviders
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <HomeNav />
          <main className="mx-auto w-full py-24 ">{children}</main>
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
