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
        href: '/three',
        label: t('title'),
        children: [
          {
            href: '/three/thebasics',
            label: t('theBasics'),
          },
          {
            href: '/three/thebasics/scene',
            label: t('tb.scene'),
          },
          {
            href: '/three/thebasics/camera',
            label: t('tb.camera'),
          },
          {
            href: '/three/thebasics/webglrender',
            label: t('tb.webglrender'),
          },
        ],
      },
      {
        href: '/three/r3f',
        label: t('r3f.title'),
        children: [
          {
            href: '/three/r3f/thebasics',
            label: t('r3f.theBasics'),
          },
          {
            href: '/three/r3f/editable-cube',
            label: t('r3f.editableCube'),
          },
        ],
      },
    ],
    [t]
  );

  return <SideBar direction={direction} links={links} />;
}
