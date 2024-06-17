import { dir } from 'i18next';
import type { ReactNode } from 'react';
import { inter, lexend } from '~/app/[locale]/fonts';
import HomeNav from '~/components/home-nav';
import i18nConfig from '~/i18nConfig';
import { AppProviders } from '~/providers/app-providers';
import initTranslations from '../i18n';
import './globals.css';

// export async function generateMetadata({
//   params: { lng, ns },
// }: {
//   params: { lng: string; ns: string };
// }) {
//   if (languages.indexOf(lng) < 0) lng = fallbackLng;
//   const { t } = await useTranslation(lng, ns);
//   return {
//     title: t('title'),
//     content:
//       'A playground to explore new Next.js 13/14 app directory features such as nested layouts, instant loading states, streaming, and component level data fetching.',
//   };
// }
export const metadata = {
  title: '智能知识库',
  description: '知识库',
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
          <HomeNav />
          <main className="mx-auto max-w-6xl px-8 py-24 ">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
