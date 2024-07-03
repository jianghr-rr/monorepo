import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from '~ui/navigation-menu';

interface SideBarProps {
  links: {
    label: string;
    href: string;
    children?: {
      label: string;
      href: string;
      children?: {
        label: string;
        href: string;
      }[];
    }[];
  }[];
}

const RecursiveNavigation: FC<SideBarProps> = ({ links }) => {
  const pathname = usePathname();
  return (
    <>
      {links.map((link, index) => {
        if (link.children) {
          return (
            <li key={`${link.href}-${index}`}>
              <details open>
                <summary>
                  <NavigationMenuLink>
                    <Link href={link.href}>
                      <p
                        className={`w-full flex-col hover:text-primary-300 ${pathname?.includes(link.href) && link.href !== '/' ? ' text-primary-400' : ''} ${
                          pathname === '/' && link.href === '/'
                            ? ' text-primary-400'
                            : ''
                        }`}
                      >
                        {link.label}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </summary>
                <ul>
                  <RecursiveNavigation links={link.children} />
                </ul>
              </details>
            </li>
          );
        }
        return (
          <li key={`${link.href}-${index}`}>
            <Link href={link.href} legacyBehavior passHref>
              <NavigationMenuLink>
                <p
                  className={`flex-col hover:text-primary-300 ${pathname?.includes(link.href) && link.href !== '/' ? ' text-primary-400' : ''} ${
                    pathname === '/' && link.href === '/'
                      ? ' text-primary-400'
                      : ''
                  }`}
                >
                  {link.label}
                </p>
              </NavigationMenuLink>
            </Link>
          </li>
        );
      })}
    </>
  );
};

const SideBar: FC<SideBarProps> = ({ links }) => {
  return (
    <NavigationMenu className="sidebar w-full">
      <NavigationMenuList className="w-full">
        <ul className="menu w-full rounded-box">
          <RecursiveNavigation links={links} />
        </ul>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default SideBar;
export { SideBar };
