'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();

  const links = useMemo(
    () => [
      { href: '/fabric', label: t('fabric') },
      { href: '/blog', label: t('blog') },
    ],
    [t]
  );

  return (
    <nav>
      <div className="navbar mx-auto max-w-6xl flex-col px-8 sm:flex-row">
        <li>
          <Link href="/" className="btn btn-primary">
            {t('home')}
          </Link>
        </li>
        <ul className="menu menu-horizontal md:ml-8">
          {links.map((link) => {
            return (
              <li key={link.href}>
                <Link href={link.href} className=" capitalize">
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
