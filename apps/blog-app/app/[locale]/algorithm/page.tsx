'use client';

import { useTranslation } from 'react-i18next';

export default function PatternsPage() {
  const { t } = useTranslation();

  return (
    <div className="blog-container">
      <h1 className="page-title">{t('algorithm')}</h1>
    </div>
  );
}
