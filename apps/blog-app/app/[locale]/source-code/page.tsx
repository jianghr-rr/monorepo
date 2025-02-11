'use client';

import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { MDXWrapper } from '~/components/mdx-wrapper';

const PageZh = dynamic(() => import('./index.zh.mdx'), { ssr: false });
const PageEn = dynamic(() => import('./index.en.mdx'), { ssr: false });

export default function Page() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  return (
    <MDXWrapper>{currentLocale === 'zh' ? <PageZh /> : <PageEn />}</MDXWrapper>
  );
}
