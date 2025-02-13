'use client';

import { useTranslation } from 'react-i18next';

export default function PatternsPage() {
  const { t } = useTranslation();

  return (
    <div className="blog-container">
      <h1 className="page-title">{t('algorithm')}</h1>
      <p>{t('如果不是担心那啥，真不想刷这个')}</p>
    </div>
  );
}
