'use client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SideBar } from '~/components/sidebar';

export default function FabricPageSideBar() {
  const { t } = useTranslation();

  const links = useMemo(
    () => [
      { href: '/fabric/initial', label: t('initial') },
      { href: '/fabric/add-line', label: t('addLine') },
      { href: '/fabric/select-line', label: t('selectLine') },
      { href: '/fabric/redraw-line', label: t('redrawLine') },
      {
        href: '/fabric/fabric-demo',
        label: t('fabricDemo.title'),
        children: [
          {
            href: '/fabric/fabric-demo/e-w-e-b',
            label: t('fabricDemo.ErasingWithEraserBrush'),
          },
        ],
      },
    ],
    [t]
  );

  return <SideBar links={links} />;
}
