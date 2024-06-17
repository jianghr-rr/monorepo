'use client';

import { useTranslation } from 'react-i18next';

export default function FabricPage() {
  const { t } = useTranslation();

  return <h1 className="mb-8 text-center text-5xl font-bold">{t('title')}</h1>;
}
