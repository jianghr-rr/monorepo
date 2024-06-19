import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
} from '~ui/navigation-menu';

interface SideBarProps {
  links: {
    label: string;
    href: string;
  }[];
}

const SideBar: FC<SideBarProps> = ({ links }) => {
  const pathname = usePathname();

  return (
    <NavigationMenu orientation="vertical">
      <NavigationMenuList className="flex-col">
        {links.map((link) => {
          return (
            <NavigationMenuItem key={link.href} className="w-full">
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${pathname?.includes(link.href) && link.href !== '/' ? ' text-primary-400' : ''} ${
                    pathname === '/' && link.href === '/'
                      ? ' text-primary-400'
                      : ''
                  }`}
                >
                  {link.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default SideBar;
export { SideBar };
