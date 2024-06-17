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

export default function PatternsPageSideBar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const links = useMemo(
    () => [{ href: '/patterns/singleton', label: t('SingletonPattern') }],
    [t]
  );

  return (
    <div>
      <NavigationMenu orientation="vertical">
        <NavigationMenuList>
          {links.map((link) => {
            return (
              <Link key={link.href} href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${pathname.includes(link.href) && link.href !== '/' ? ' text-primary-400' : ''} ${
                    pathname === '/' && link.href === '/'
                      ? ' text-primary-400'
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
  );
}
