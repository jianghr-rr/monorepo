import type { ReactNode } from 'react';
import PageLayout from '~/components/page-layout';
import initTranslations from '~/lib/i18n';

const i18nNamespaces = ['react-natvie'];

const SourceCodeLayout = async function ({
  params,
  sidebar,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: ReactNode;
  sidebar: ReactNode | ((t: (key: string) => string) => ReactNode);
}) {
  const { locale } = await params;
  const i18n = await initTranslations(locale, i18nNamespaces);
  const t = i18n.t.bind(i18n);

  return (
    <PageLayout sidebar={typeof sidebar === 'function' ? sidebar(t) : sidebar}>
      {children}
    </PageLayout>
  );
};

export default SourceCodeLayout;
