import type { ReactNode } from 'react';
import PageLayout from '~/components/page-layout';
import initTranslations from '~/lib/i18n';

const i18nNamespaces = ['home', 'source-code'];

const SourceCodeLayout = async function ({
  params,
  sidebar,
  children,
}: {
  params: Promise<{ locale: string }>;
  sidebar: ReactNode;
  children: ReactNode;
}) {
  const { locale } = await params;
  await initTranslations(locale, i18nNamespaces);

  return <PageLayout sidebar={sidebar}>{children}</PageLayout>;
};

export default SourceCodeLayout;
