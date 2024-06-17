'use client';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const links = [
  { href: '/client', label: 'client' },
  { href: '/drinks', label: 'drinks' },
  { href: '/tasks', label: 'tasks' },
  { href: '/query', label: 'react-query' },
];

const Navbar = () => {
  const { t } = useTranslation();
  // console.log('lng', lng);
  // const { t } = useTranslation(lng, 'navigation');
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
