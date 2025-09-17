import { SideBar } from '~/components/sidebar';
import initTranslations from '~/lib/i18n';

const i18nNamespaces = ['react-native'];

const mainRouter = '/react-native';
const tag010Router = '/tag-010'

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
      label: t?.('version'),
      children: [
        {
          href: `${mainRouter}/${tag010Router}`,
          label: t?.('0.1.0'),
          children: [
            {
              href: `${mainRouter}/${tag010Router}/chapter-01`,
              label: t?.('chapter-01'),
            },
            {
              href: `${mainRouter}/${tag010Router}/chapter-02`,
              label: t?.('chapter-02'),
            },
            {
              href: `${mainRouter}/${tag010Router}/chapter-03`,
              label: t?.('chapter-03'),
            },
          ]
        },
      ],
    },
  ];

  return <SideBar links={links} />;
}
