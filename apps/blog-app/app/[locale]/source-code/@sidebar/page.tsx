'use client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SideBar } from '~/components/sidebar';

const mainRouter = '/source-code';
export default function Page({ params }: { params: { locale: string } }) {
  const { t } = useTranslation();

  const links = useMemo(() => {
    return [
      {
        href: mainRouter,
        label: t('title'),
        children: [
          {
            href: `${mainRouter}/api`,
            label: t('api'),
          },
        ],
      },
    ];
  }, [t]);

  return <SideBar links={links} />;
}
