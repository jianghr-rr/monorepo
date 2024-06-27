'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from '~ui/navigation-menu';

const Navbar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();

  const links = useMemo(
    () => [
      { href: '/', label: t('home') },
      { href: '/interview', label: t('interview') },
      { href: '/fabric', label: t('fabric') },
      { href: '/three', label: t('three') },
      { href: '/patterns', label: t('patterns') },
      { href: '/algorithm', label: t('algorithm') },
    ],
    [t]
  );

  return (
    <nav className="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((link) => {
            return (
              <Link key={link.href} href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} bg-transparent hover:text-primary-400 dark:hover:text-primary-300 ${pathname?.includes(link.href) && link.href !== '/' ? ' text-primary' : ''} ${
                    pathname === '/' && link.href === '/' ? ' text-primary' : ''
                  }`}
                >
                  {link.label}
                </NavigationMenuLink>
              </Link>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Navbar;
