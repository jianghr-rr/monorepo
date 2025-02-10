'use client';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

export default function FabricPage() {
  const { t } = useTranslation();

  return (
    <Suspense fallback={null}>
      <div className="blog-container">
        <h1 className="blog-h1">{t('title')}</h1>
        <p>
          https://www.youtube.com/watch?v=-_MGT_4jBms&list=PL-gIJFyHJjykXg776HNz3H7XXzBMSu5mL&index=5
        </p>
      </div>
    </Suspense>
  );
}
