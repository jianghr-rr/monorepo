'use client';

import { useTranslation } from 'react-i18next';

export default function PatternsPage() {
  const { t } = useTranslation();

  return (
    <div className="blog-container">
      <h1 className="blog-h1">{t('graphics.r3f.title')}</h1>
      <p className="blog-p">使用R3F来创建3D的web应用</p>
    </div>
  );
}
