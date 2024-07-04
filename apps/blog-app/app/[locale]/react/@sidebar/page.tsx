'use client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SideBar } from '~/components/sidebar';

export default function InterviewPageSideBar() {
  const { t } = useTranslation();

  const links = useMemo(
    () => [
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
    ],
    [t]
  );

  return <SideBar links={links} />;
}
