'use client';

import { useTranslation } from 'react-i18next';

export default function PatternsPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="mb-8 text-center text-5xl font-bold">{t('title')}</h1>
      <div className="mx-8">
        <h3 className="mb-4 text-xl">{t('introd.p1')}</h3>
        <h3 className="mb-4 text-xl">{t('introd.p2')}</h3>
        <h3 className="mb-4 text-xl">{t('introd.p3')}</h3>
        <h3 className="mb-4 text-xl">{t('introd.p4')}</h3>
      </div>
    </div>
  );
}
