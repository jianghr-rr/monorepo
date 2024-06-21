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
        children: [
          {
            href: '/interview/engineering/webpack',
            label: t('engineering.webpack'),
          },
          {
            href: '/interview/engineering/functional',
            label: t('engineering.functional'),
          },
        ],
      },
      {
        href: '/interview/base',
        label: t('base.title'),
        children: [
          {
            href: '/interview/base/this',
            label: t('base.this'),
          },
          {
            href: '/interview/base/object',
            label: t('base.object'),
          },
        ],
      },
    ],
    [t]
  );

  return <SideBar links={links} />;
}
