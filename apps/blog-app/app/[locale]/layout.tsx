import { dir } from 'i18next';
import type { ReactNode } from 'react';
import { inter, lexend } from '~/app/[locale]/fonts';
import CodeSnippet from '~/components/code-snippet';
import HomeNav from '~/components/home-nav';
import i18nConfig from '~/i18nConfig';
import { AppProviders } from '~/providers/app-providers';
import initTranslations from '../i18n';
// import 'highlight.js/styles/github.css';
import './globals.css';

const i18nNamespaces = ['home'];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t('page.title'),
  };
}

interface LayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const RootLayout = async function ({
  children,
  params: { locale },
}: LayoutProps) {
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
          <CodeSnippet />
          <HomeNav />
          <main className="grow overflow-y-auto">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
