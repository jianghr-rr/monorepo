'use client';
import { useTranslation } from 'react-i18next';

export default function SingletonPage() {
  const { t } = useTranslation();
  return <div className="blog-container">{t('singleton.title')}</div>;
}
