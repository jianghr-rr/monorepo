'use client';
import { EllipsisVertical } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~components/ui/dropdown-menu';
import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from '~ui/navigation-menu';

const Navbar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [title, setTitle] = useState<string>('');

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

  useEffect(() => {
    if (pathname === '/') {
      setTitle(t('home'));
    } else {
      links?.forEach((link) => {
        if (pathname?.includes(link.href) && link.href !== '/') {
          setTitle(link.label);
        }
      });
    }
  }, [pathname, links]);

  return (
    <Suspense fallback={null}>
      <nav className="hidden text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200 lg:block">
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
      <nav className="flex grow cursor-pointer items-center lg:hidden">
        <p>{title}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white dark:bg-gray-950"
          >
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col items-baseline">
                {links.map((link) => {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      legacyBehavior
                      passHref
                    >
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
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </Suspense>
  );
};

export default Navbar;
