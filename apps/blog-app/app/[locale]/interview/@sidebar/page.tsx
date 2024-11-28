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
            href: '/interview/base/class',
            label: t('base.class'),
          },
          {
            href: '/interview/base/object',
            label: t('base.object'),
          },
          {
            href: '/interview/base/context',
            label: t('base.context'),
          },
          {
            href: '/interview/base/this',
            label: t('base.this'),
          },
          {
            href: '/interview/base/ast',
            label: t('base.ast'),
          },
          {
            href: '/interview/base/promise',
            label: t('base.promise'),
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
              {
                href: '/interview/base/es6/reflect',
                label: t('base.es.reflect'),
              },
            ],
          },
          {
            href: '/interview/base/iteration',
            label: t('base.iteration'),
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
        href: '/interview/lowcode',
        label: t('lowcode.title'),
      },
      {
        href: '/interview/html_css',
        label: t('htmlCss.title'),
      },
      {
        href: '/interview/test',
        label: t('test.title'),
        children: [
          {
            href: '/interview/test/tdd',
            label: t('TDD'),
          },
        ],
      },
      {
        href: '/interview/eslint',
        label: t('eslint.title'),
      },
    ],
    [t]
  );

  return <SideBar direction={direction} links={links} />;
}
