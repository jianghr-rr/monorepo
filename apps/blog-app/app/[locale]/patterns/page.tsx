'use client';
import dynamic from 'next/dynamic';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import highlightCode from '~/components/highlight';
import { MDXWrapper } from '~/components/mdx-wrapper';

const PageZh = dynamic(() => import('./index.zh.mdx'), { ssr: false });
const PageEn = dynamic(() => import('./index.en.mdx'), { ssr: false });

export default function Home() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  useLayoutEffect(() => {
    highlightCode();
  }, []);

  return (
    <MDXWrapper>{currentLocale === 'zh' ? <PageZh /> : <PageEn />}</MDXWrapper>
  );
}
