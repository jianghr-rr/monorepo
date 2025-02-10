import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import NavPageLayout from '~/components/nav-page-layout';

const i18nNamespaces = ['interview'];

const DynamicSidebar = dynamic<{
  children: ReactNode;
  direction: string; // 添加 direction 属性
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
      sidebar={<DynamicSidebar direction="vertical">{sidebar}</DynamicSidebar>}
      breadcrumb={
        <DynamicSidebar direction="horizontal">{sidebar}</DynamicSidebar>
      }
    >
      {children}
    </NavPageLayout>
  );
}

export default InterviewLayout;
