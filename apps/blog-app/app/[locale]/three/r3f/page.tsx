'use client';

import { useTranslation } from 'react-i18next';

export default function PatternsPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="page-title">{t('r3f.title')}</h1>
      <p className="blog-p">使用R3F来创建3D的web应用</p>
    </div>
  );
}
