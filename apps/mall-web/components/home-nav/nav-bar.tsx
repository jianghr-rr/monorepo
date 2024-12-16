'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  // console.log('lng', lng);
  // const { t } = useTranslation(lng, 'navigation');
  return (
    <nav>
      <div className="navbar mx-auto max-w-6xl flex-col px-8 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          {t('home')}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
