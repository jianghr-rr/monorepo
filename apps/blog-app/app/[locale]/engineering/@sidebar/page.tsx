'use client';
import initTranslations from '~/app/i18n';
import { SideBar } from '~/components/sidebar';

interface PatternsPageSideBarProps {
  direction: string;
  locale: string; // 动态传入的语言
}

export default async function PatternsPageSideBar({
  direction,
  locale,
}: PatternsPageSideBarProps) {
  // 服务端初始化翻译
  const { t } = await initTranslations(locale, ['engineering']);

  // 在服务端生成 links 数据
  const links = [
    {
      href: '/engineering',
      label: t('engineering.title'),
      children: [
        {
          href: '/engineering/build-system',
          label: t('engineering.buildSystem'),
        },
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
  ];

  return <SideBar direction={direction} links={links} />;
}
