'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, Suspense } from 'react';
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
      { href: '/react', label: t('react') },
      { href: '/vue', label: t('vue') },
      { href: '/graphics', label: t('graphics') },
      { href: '/engineering', label: t('engineering') },
      { href: '/nodejs', label: t('nodeJs') },
      { href: '/nextjs', label: t('nextJs') },
      { href: '/patterns', label: t('patterns') },
      { href: '/algorithm', label: t('algorithm') },
    ],
    [t]
  );

  return (
    <Suspense fallback={null}>
      <nav className="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200">
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) => {
              return (
                <Link key={link.href} href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} home-nav bg-transparent hover:text-primary-400 dark:hover:text-primary-300 ${pathname?.includes(link.href) && link.href !== '/' ? ' text-primary' : ''} ${
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
      </nav>
    </Suspense>
  );
};

export default Navbar;
