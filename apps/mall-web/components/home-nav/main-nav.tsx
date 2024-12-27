'use client';
import { Navbar } from 'flowbite-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const MainNav = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar.Link as={Link} href="/">
        {t('home')}
      </Navbar.Link>
    </>
  );
};

export default MainNav;
export { MainNav };
