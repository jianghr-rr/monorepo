'use client';

import { useTranslation } from 'react-i18next';

export default function PatternsPage() {
  const { t } = useTranslation();

  return (
    <div className="blog-container">
      <h1 className="page-title">{t('title')}</h1>
      <p className="blog-p">{t('introd.p1')}</p>
      <p className="blog-p">{t('introd.p2')}</p>
      <p className="blog-p">{t('introd.p3')}</p>
      <p className="blog-p">{t('introd.p4')}</p>
    </div>
  );
}
