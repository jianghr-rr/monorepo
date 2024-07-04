'use client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SideBar } from '~/components/sidebar';

export default function InterviewPageSideBar({
  direction,
}: {
  direction: string;
}) {
  const { t } = useTranslation();

  const links = useMemo(
    () => [
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
          {
            href: '/interview/base/promise',
            label: t('base.promise'),
          },
          {
            href: '/interview/base/ast',
            label: t('base.ast'),
          },
          {
            href: '/interview/base/es6',
            label: t('base.es6'),
            children: [
              {
                href: '/interview/base/es6/const',
                label: t('base.es.const'),
              },
              {
                href: '/interview/base/es6/arrow-fun',
                label: t('base.es.arrowFun'),
              },
            ],
          },
        ],
      },
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
        href: '/interview/typescript',
        label: t('typescript.title'),
      },
      {
        href: '/interview/browser',
        label: t('browser.title'),
      },
      {
        href: '/interview/webpack',
        label: t('webpack.title'),
      },
      {
        href: '/interview/lowcode',
        label: t('lowcode.title'),
      },
      {
        href: '/interview/nextjs',
        label: t('nextjs.title'),
      },
    ],
    [t]
  );

  return <SideBar direction={direction} links={links} />;
}
