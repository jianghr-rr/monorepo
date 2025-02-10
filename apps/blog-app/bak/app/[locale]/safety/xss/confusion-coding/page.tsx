'use client';
import dynamic from 'next/dynamic';
import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BreadCrumb from '~/components/bread-crumb';
import highlightCode from '~/components/highlight';
import { MDXWrapper } from '~/components/mdx-wrapper';

const PageZh = dynamic(() => import('./index.zh.mdx'), { ssr: false });
const PageEn = dynamic(() => import('./index.en.mdx'));

export default function Home() {
  const { i18n, t } = useTranslation();
  const currentLocale = i18n.language;

  useLayoutEffect(() => {
    highlightCode();
  }, []);

  return (
    <>
      <BreadCrumb
        parentText={t('factory.title')}
        parentUrl="/safety"
        text={t('xss-reflected')}
      />
      <MDXWrapper>
        {currentLocale === 'zh' ? <PageZh /> : <PageEn />}
      </MDXWrapper>
    </>
  );
}
