import { dir } from 'i18next';
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
      <body className="flex h-full flex-col">
        <AppProviders
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <HomeNav locale={locale} />
          {/* <img src="/file.svg" />
          <video
            // src="http://bj.bcebos.com/v1/adtdp-octopus/origin_data/01LNNB2F835D8BC9F0D8F66ECE0CB79C/2_01LNNB2F835D8BC9F0D8F66ECE0CB79C_1728010416732/decrypt/raw1728010416732/scene/scene_render_video.mp4?authorization=bce-auth-v1%2F95deff15750a45fea5a676f7d1df7f74%2F2024-12-20T06%3A41%3A55Z%2F1800%2F%2F36e74c329a2dbc458ce24f3572e853b5a8455dc059583a9a360afb60f83e9b47"
            src="/scene_render_video.mp4"
            controls
          >
            Your browser does not support the video tag.
          </video> */}

          <main className="mx-auto w-full py-24">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
