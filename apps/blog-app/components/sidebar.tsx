import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';
import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
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

// const RecursiveNavigationMenu: FC<SideBarProps> = ({ links }) => {
//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         {links.map((link, index) => (
//           <NavigationMenuItem key={index}>
//             <NavigationMenuTrigger as="a" href={link.href}>
//               {link.label}
//             </NavigationMenuTrigger>
//             {link.children && (
//               <NavigationMenuContent>
//                 <RecursiveNavigationMenu links={link.children} />
//               </NavigationMenuContent>
//             )}
//           </NavigationMenuItem>
//         ))}
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// };

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
                  className={`${navigationMenuTriggerStyle()} flex-col hover:text-primary-300 ${pathname?.includes(link.href) && link.href !== '/' ? ' text-primary-400' : ''} ${
                    pathname === '/' && link.href === '/'
                      ? ' text-primary-400'
                      : ''
                  }`}
                >
                  <p className="font-semibold">{link.label}</p>
                </NavigationMenuLink>
              </Link>
              {/* {link?.children && subNav(link?.children)} */}
              <NavigationMenuTrigger>123</NavigationMenuTrigger>

              {link?.children?.map((subLink) => {
                return (
                  <NavigationMenuItem
                    key={subLink.href}
                    className="ml-2 w-full"
                  >
                    <Link href={subLink.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} -ml-px block border-l border-transparent pl-4 hover:text-primary-300 dark:text-primary-200 dark:hover:text-primary-300 ${pathname?.includes(subLink.href) && link.href !== '/' ? ' text-primary-400' : ''} ${
                          pathname === '/' && link.href === '/'
                            ? ' text-primary-400'
                            : ''
                        }`}
                      >
                        {subLink.label}
                      </NavigationMenuLink>
                    </Link>

                    {subLink?.children?.map((ssLink) => {
                      return (
                        <NavigationMenuItem
                          key={ssLink.href}
                          className="ml-2 w-full"
                        >
                          <Link href={ssLink.href} legacyBehavior passHref>
                            <NavigationMenuLink
                              className={`${navigationMenuTriggerStyle()} -ml-px block border-l border-transparent pl-4 hover:text-primary-300 dark:text-primary-200 dark:hover:text-primary-300 ${pathname?.includes(subLink.href) && link.href !== '/' ? ' text-primary-400' : ''} ${
                                pathname === '/' && link.href === '/'
                                  ? ' text-primary-400'
                                  : ''
                              }`}
                            >
                              {ssLink.label}
                            </NavigationMenuLink>
                          </Link>
                        </NavigationMenuItem>
                      );
                    })}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default SideBar;
export { SideBar };
