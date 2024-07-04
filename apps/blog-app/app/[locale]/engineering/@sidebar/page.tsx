'use client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SideBar } from '~/components/sidebar';

export default function InterviewPageSideBar() {
  const { t } = useTranslation();

  const links = useMemo(
    () => [
      {
        href: '/engineering',
        label: t('engineering.title'),
        children: [
          {
            href: '/engineering/webpack',
            label: t('engineering.webpack'),
          },
          {
            href: '/engineering/functional',
            label: t('engineering.functional'),
          },
        ],
      },
    ],
    [t]
  );

  return <SideBar links={links} />;
}
