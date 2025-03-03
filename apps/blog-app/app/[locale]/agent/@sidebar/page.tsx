import { SideBar } from '~/components/sidebar';
import initTranslations from '~/lib/i18n';

const i18nNamespaces = ['agent'];

const mainRouter = '/agent';

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
      label: t?.('agent.title'),
      children: [
        {
          href: `${mainRouter}/1`,
          label: t?.('1'),
        },
      ],
    },
  ];

  return <SideBar links={links} />;
}
