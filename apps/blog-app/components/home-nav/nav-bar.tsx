'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const links = useMemo(
    () => [
      { href: '/', label: t('home') },
      { href: '/fabric', label: t('fabric') },
      { href: '/blog', label: t('blog') },
    ],
    [t]
  );

  return (
    <nav>
      <div className="navbar mx-auto max-w-6xl flex-col px-8 sm:flex-row">
        <ul className="menu menu-horizontal md:ml-8">
          {links.map((link) => {
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`capitalize ${pathname.includes(link.href) && link.href !== '/' ? ' btn-primary' : ''} ${
                    pathname === '/' && link.href === '/' ? ' btn-primary' : ''
                  }`}
                >
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
