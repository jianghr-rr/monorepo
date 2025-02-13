'use client';

import { useTranslation } from 'react-i18next';

export default function InterviewPage() {
  const { t } = useTranslation();

  return (
    <div className="blog-container">
      <h1 className="blog-h1">{t('title')}</h1>
    </div>
  );
}
