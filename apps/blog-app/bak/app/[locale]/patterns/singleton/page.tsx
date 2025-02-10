'use client';
import dynamic from 'next/dynamic';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import highlightCode from '~/components/highlight';
import { MDXWrapper } from '~/components/mdx-wrapper';
import BreadCrumb from '../bread-crumb';

const PageZh = dynamic(() => import('./index.zh.mdx'));
const PageEn = dynamic(() => import('./index.en.mdx'));

export default function Home() {
  const { i18n, t } = useTranslation();
  const currentLocale = i18n.language;

  useLayoutEffect(() => {
    highlightCode();
  }, []);

  return (
    <>
      <BreadCrumb text={t('singleton.title')} />
      <MDXWrapper>
        {currentLocale === 'zh' ? <PageZh /> : <PageEn />}
      </MDXWrapper>
    </>
  );
}
