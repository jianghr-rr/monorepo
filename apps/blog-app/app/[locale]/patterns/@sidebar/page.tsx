import { SideBar } from '~/components/sidebar';
import initTranslations from '~/lib/i18n';

const i18nNamespaces = ['patterns'];

const mainRouter = '/patterns';
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
      label: t?.('patterns'),
      children: [
        {
          href: `${mainRouter}/prototype-pattern`,
          label: t?.('prototypePattern'),
        },
      ],
    },
  ];

  return <SideBar links={links} />;
}
