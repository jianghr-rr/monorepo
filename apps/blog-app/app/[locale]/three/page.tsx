'use client';

import { useTranslation } from 'react-i18next';

export default function PatternsPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="mb-8 text-center text-5xl font-bold">{t('title')}</h1>
    </div>
  );
}
