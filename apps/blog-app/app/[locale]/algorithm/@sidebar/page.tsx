'use client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SideBar } from '~/components/sidebar';

export default function PatternsPageSideBar() {
  const { t } = useTranslation();

  const links = useMemo(() => [{ href: '/three', label: t('three') }], [t]);

  return <SideBar links={links} />;
}
