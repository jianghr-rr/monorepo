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
        href: '/engineering',
        label: t('engineering.title'),
        children: [
          {
            href: '/engineering/webpack',
            label: t('engineering.webpack'),
            children: [
              {
                href: '/engineering/webpack/4',
                label: t('engineering.webpack4.title'),
                children: [
                  {
                    href: '/engineering/webpack/4/bound',
                    label: t('engineering.webpack4.bound'),
                  },
                  {
                    href: '/engineering/webpack/4/theory',
                    label: t('engineering.webpack4.theory'),
                  },
                  {
                    href: '/engineering/webpack/4/loader-plugin',
                    label: t('engineering.webpack4.loaderPlugin'),
                  },
                ],
              },
            ],
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

  return <SideBar direction={direction} links={links} />;
}
