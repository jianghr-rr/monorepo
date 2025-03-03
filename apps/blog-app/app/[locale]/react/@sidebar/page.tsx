import { SideBar } from '~/components/sidebar';
import initTranslations from '~/lib/i18n';

const i18nNamespaces = ['react'];

const mainRouter = '/react';

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
      href: '',
      label: t?.('react'),
      children: [
        {
          href: `${mainRouter}/hooks`,
          label: t?.('hooks.title'),
        },
      ],
    },
  ];

  return <SideBar links={links} />;
}
