'use client';

import { Spinner } from 'flowbite-react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import { MDXWrapper } from '~/components/mdx-wrapper';
import { MdxEnhancer } from '~/components/mdx-enhancer';

const PageZh = dynamic(() => import('./index.zh.mdx'), {
  loading: () => <Spinner />,
});
const PageEn = dynamic(() => import('./index.en.mdx'), {
  loading: () => <Spinner />,
});

export default function Page() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  return (
    <MDXWrapper>
      <MdxEnhancer>{currentLocale === 'zh' ? <PageZh /> : <PageEn />}</MdxEnhancer>
    </MDXWrapper>
  );
}
