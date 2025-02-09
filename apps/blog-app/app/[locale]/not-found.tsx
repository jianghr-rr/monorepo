'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="mb-4 text-5xl font-bold">123123</h1>
          <Link className="btn btn-primary" href="/">
            {t('not_found.go_back')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
