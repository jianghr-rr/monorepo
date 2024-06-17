'use client';

import { useTranslation } from 'react-i18next';

export default function FabricPage() {
  const { t } = useTranslation();

  return <div>{t('title')}</div>;
}
