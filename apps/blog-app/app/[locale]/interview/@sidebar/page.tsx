'use client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SideBar } from '~/components/sidebar';

export default function InterviewPageSideBar() {
  const { t } = useTranslation();

  const links = useMemo(
    () => [
      {
        href: '/interview/module',
        label: t('module.title'),
        children: [
          {
            href: '/interview/module/commonjs',
            label: t('module.commonJS'),
          },
        ],
      },
      {
        href: '/interview/engineering',
        label: t('engineering.title'),
      },
    ],
    [t]
  );

  return <SideBar links={links} />;
}
