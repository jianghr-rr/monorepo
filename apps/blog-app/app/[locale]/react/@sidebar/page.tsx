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
        href: '/react/16',
        label: t('16.title'),
        children: [
          {
            href: '/react/16/interview',
            label: t('16.interview'),
          },
        ],
      },
      {
        href: '/react/18',
        label: t('18.title'),
        children: [
          {
            href: '/react/18/interview',
            label: t('18.interview'),
          },
        ],
      },
      {
        href: '/react/ui-component',
        label: t('uiComponent.title'),
        children: [
          {
            href: '/react/ui-component/interview',
            label: t('uiComponent.interview'),
          },
        ],
      },
      {
        href: '/react/hooks',
        label: t('hooks.title'),
        children: [
          {
            href: '/react/hooks/interview',
            label: t('hooks.interview'),
          },
        ],
      },
    ],
    [t]
  );

  return <SideBar direction={direction} links={links} />;
}
