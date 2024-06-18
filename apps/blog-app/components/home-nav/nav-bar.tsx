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
      { href: '/fabric', label: t('fabric') },
      // { href: '/blog', label: t('blog') },
      { href: '/patterns', label: t('patterns') },
    ],
    [t]
  );

  return (
    <nav>
      <div className="navbar mx-auto max-w-6xl flex-col px-8 sm:flex-row">
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => {
              return (
                <Link key={link.href} href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} text-lg ${pathname.includes(link.href) && link.href !== '/' ? ' text-primary' : ''} ${
                      pathname === '/' && link.href === '/'
                        ? ' text-primary'
                        : ''
                    }`}
                  >
                    {link.label}
                  </NavigationMenuLink>
                </Link>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
