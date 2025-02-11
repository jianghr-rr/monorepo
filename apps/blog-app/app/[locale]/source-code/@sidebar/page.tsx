import { SideBar } from '~/components/sidebar';
import initTranslations from '~/lib/i18n';

const i18nNamespaces = ['resource-code'];

const mainRouter = '/source-code';
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i18n = await initTranslations(locale, i18nNamespaces);
  const t = i18n.t.bind(i18n);
  const links = [
    {
      href: mainRouter,
      label: t?.('hc-requests'),
      children: [
        {
          href: `${mainRouter}/p-queue`,
          label: t?.('P-Queue'),
        },
      ],
    },
  ];

  return <SideBar links={links} />;
}
