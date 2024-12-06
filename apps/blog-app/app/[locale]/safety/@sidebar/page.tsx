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
        href: '/safety/base',
        label: t('base'),
      },
      {
        href: '/safety/overview',
        label: t('overview'),
      },
      {
        href: '/safety/cve',
        label: t('cve'),
      },
      {
        href: '/safety/xss',
        label: t('xss'),
        children: [
          { href: '/safety/xss/reflected', label: t('xss-reflected') },
          { href: '/safety/xss/store', label: t('xss-stored') },
          { href: '/safety/xss/dom', label: t('xss-dom') },
          { href: '/safety/xss/worm', label: t('xss-worm') },
        ],
      },
      {
        href: '/safety/pseudo-protocol',
        label: t('pseudo-protocol'),
      },
      {
        href: '/safety/csrf',
        label: t('csrf'),
      },
    ],
    [t]
  );

  return <SideBar direction={direction} links={links} />;
}
