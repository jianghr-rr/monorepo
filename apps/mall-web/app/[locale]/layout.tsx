import { ThemeModeScript } from 'flowbite-react';
import { dir } from 'i18next';
import NextTopLoader from 'nextjs-toploader';
import type { ReactNode } from 'react';
import { inter, lexend } from '~/app/[locale]/fonts';
import { HomeNav } from '~/components/home-nav';
import i18nConfig from '~/i18nConfig';
import initTranslations from '~/lib/i18n';
import { AppProviders } from '~/providers/app-providers';
import './globals.css';

export const metadata = {
  title: 'mall-web',
  description: 'mall-web',
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

const i18nNamespaces = ['common', 'home', 'auth'];

const RootLayout = async function ({ children, params }: LayoutProps) {
  const { locale } = await Promise.resolve(params); // 处理异步 `params`
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`h-full scroll-smooth ${inter.variable} ${inter.className} ${lexend.className}`}
    >
      <head>
        <ThemeModeScript />
      </head>

      <body className="flex h-full flex-col">
        <NextTopLoader />
        <AppProviders
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <HomeNav locale={locale} />
          <main className="mx-auto size-full">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
