'use client';
import { useTranslation } from 'react-i18next';

export default function SingletonPage() {
  const { t } = useTranslation();
  return <div>{t('singleton.title')}</div>;
}
