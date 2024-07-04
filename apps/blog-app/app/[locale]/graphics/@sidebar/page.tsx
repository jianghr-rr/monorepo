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
        href: '/graphics',
        label: t('graphics.title'),
        children: [
          {
            href: '/graphics/canvas',
            label: t('graphics.canvas.title'),
          },
          {
            href: '/graphics/svg',
            label: t('graphics.svg.title'),
          },
          {
            href: '/graphics/webgl',
            label: t('graphics.WebGL.title'),
          },
          {
            href: '/graphics/coordinate',
            label: t('graphics.coordinate.title'),
          },
        ],
      },
    ],
    [t]
  );

  return <SideBar direction={direction} links={links} />;
}
