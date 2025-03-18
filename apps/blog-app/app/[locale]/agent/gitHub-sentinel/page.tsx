'use client';

import { Spinner } from 'flowbite-react';
import hljs from 'highlight.js';
import dynamic from 'next/dynamic';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MDXWrapper } from '~/components/mdx-wrapper';
import 'highlight.js/styles/github-dark.min.css'; // 使用 GitHub 样式

const PageZh = dynamic(() => import('./index.zh.mdx'), {
  loading: () => <Spinner />,
});
const PageEn = dynamic(() => import('./index.en.mdx'), {
  loading: () => <Spinner />,
});

export default function Page() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  useLayoutEffect(() => {
    setTimeout(() => {
      // 延迟执行高亮代码块
      document.querySelectorAll('pre').forEach((block) => {
        if (block instanceof HTMLElement) {
          hljs?.highlightBlock(block);
        }
        // hljs?.highlightBlock(block);
      });
    }, 1000);
  }, [currentLocale]);

  return (
    <MDXWrapper>{currentLocale === 'zh' ? <PageZh /> : <PageEn />}</MDXWrapper>
  );
}
