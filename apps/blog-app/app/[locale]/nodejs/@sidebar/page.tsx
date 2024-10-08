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
        href: '/nodejs/ecmascript',
        label: t('ecmascript'),
      },
      {
        href: '/nodejs/v8',
        label: t('V8'),
      },
      {
        href: '/nodejs/run-time',
        label: t('Runtime'),
      },
      {
        href: '/nodejs/what-is-nodejs',
        label: t('whatIsNodejs'),
      },
      {
        href: '/nodejs/browser-vs-nodejs',
        label: t('browserVsNodeJs'),
      },
      {
        href: '/nodejs/modules',
        label: t('Modules'),
      },
      {
        href: '/nodejs/node-server',
        label: t('NodeServer'),
      },
    ],
    [t]
  );

  return <SideBar direction={direction} links={links} />;
}
