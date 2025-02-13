'use client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SideBar } from '~/components/sidebar';

export default function PatternsPageSideBar({
  direction,
}: {
  direction: string;
}) {
  const { t } = useTranslation();

  const links = useMemo(
    () => [
      {
        href: '/java-web/mysql',
        label: t('mysql'),
      },
      {
        href: '/java-web/mybatis',
        label: t('mybatis'),
      },
      {
        href: '/java-web/spring',
        label: t('spring spring-mvc'),
      },
    ],
    [t]
  );

  return <SideBar direction={direction} links={links} />;
}
