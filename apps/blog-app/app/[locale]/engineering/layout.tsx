// import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import NavPageLayout from '~/components/nav-page-layout';
import Sidebar from './@sidebar/page';
const i18nNamespaces = ['engineering'];

function InterviewLayout({
  params,
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
      sidebar={<Sidebar direction="horizontal" locale={params.locale} />}
    >
      {children}
    </NavPageLayout>
  );
}

export default InterviewLayout;
