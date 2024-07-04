import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import NavPageLayout from '~/components/nav-page-layout';

const i18nNamespaces = ['react'];

const DynamicSidebar = dynamic<{
  children: ReactNode;
}>(() => import('./@sidebar/page'), {
  ssr: false,
});

function InterviewLayout({
  params,
  sidebar,
  children,
}: {
  params: { locale: string };
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <NavPageLayout
      params={params}
      i18nNamespaces={i18nNamespaces}
      sidebar={<DynamicSidebar>{sidebar}</DynamicSidebar>}
    >
      {children}
    </NavPageLayout>
  );
}

export default InterviewLayout;
