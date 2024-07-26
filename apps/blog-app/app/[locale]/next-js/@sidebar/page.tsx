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
        href: '/next-js/rsc',
        label: t('rsc'),
      },
    ],
    [t]
  );

  return <SideBar direction={direction} links={links} />;
}
