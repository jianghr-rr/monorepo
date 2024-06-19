'use client';

import { useTranslation } from 'react-i18next';

export default function InterviewPage() {
  const { t } = useTranslation();

  return <div>{t('title')}</div>;
}
