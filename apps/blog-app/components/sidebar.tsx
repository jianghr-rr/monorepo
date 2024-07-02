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
  NavigationMenuContent,
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

const RecursiveNavigationMenuItem: FC<SideBarProps> = ({ links }) => {
  const pathname = usePathname();
  return (
    <>
      {links.map((link, index) => (
        <NavigationMenuItem key={index} className="relative w-full">
          <NavigationMenuTrigger>
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
          </NavigationMenuTrigger>
          {link.children && (
            <NavigationMenuContent>
              <RecursiveNavigationMenuItem links={link.children} />
            </NavigationMenuContent>
          )}
        </NavigationMenuItem>
      ))}
    </>
  );
};

// const RecursiveNavigationMenu: FC<SideBarProps> = ({ links }) => {
//   return (
//     <NavigationMenu orientation="vertical">
//       <NavigationMenuList className="flex-col">
//         <RecursiveNavigationMenuItem links={links} />
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// };

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
                  <Link href={link.href} legacyBehavior passHref>
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
              <p
                className={`flex-col hover:text-primary-300 ${pathname?.includes(link.href) && link.href !== '/' ? ' text-primary-400' : ''} ${
                  pathname === '/' && link.href === '/'
                    ? ' text-primary-400'
                    : ''
                }`}
              >
                {link.label}
              </p>
            </Link>
          </li>
        );
      })}
    </>
  );
};

const SideBar: FC<SideBarProps> = ({ links }) => {
  return (
    <ul className="menu w-full rounded-box">
      <RecursiveNavigation links={links} />
    </ul>

    // <RecursiveNavigationMenu links={links} />
    // <NavigationMenu orientation="vertical">
    //   <NavigationMenuList className="flex-col">
    //     {links.map((link) => {
    //       return (
    //         <NavigationMenuItem key={link.href} className="w-full">
    //           <Link href={link.href} legacyBehavior passHref>
    //             <NavigationMenuLink
    //               className={`${navigationMenuTriggerStyle()} flex-col hover:text-primary-300 ${pathname?.includes(link.href) && link.href !== '/' ? ' text-primary-400' : ''} ${
    //                 pathname === '/' && link.href === '/'
    //                   ? ' text-primary-400'
    //                   : ''
    //               }`}
    //             >
    //               <p className="font-semibold">{link.label}</p>
    //             </NavigationMenuLink>
    //           </Link>
    //           {/* {link?.children && subNav(link?.children)} */}
    //           <NavigationMenuTrigger>123</NavigationMenuTrigger>

    //           {link?.children?.map((subLink) => {
    //             return (
    //               <NavigationMenuItem
    //                 key={subLink.href}
    //                 className="ml-2 w-full"
    //               >
    //                 <Link href={subLink.href} legacyBehavior passHref>
    //                   <NavigationMenuLink
    //                     className={`${navigationMenuTriggerStyle()} -ml-px block border-l border-transparent pl-4 hover:text-primary-300 dark:text-primary-200 dark:hover:text-primary-300 ${pathname?.includes(subLink.href) && link.href !== '/' ? ' text-primary-400' : ''} ${
    //                       pathname === '/' && link.href === '/'
    //                         ? ' text-primary-400'
    //                         : ''
    //                     }`}
    //                   >
    //                     {subLink.label}
    //                   </NavigationMenuLink>
    //                 </Link>

    //                 {subLink?.children?.map((ssLink) => {
    //                   return (
    //                     <NavigationMenuItem
    //                       key={ssLink.href}
    //                       className="ml-2 w-full"
    //                     >
    //                       <Link href={ssLink.href} legacyBehavior passHref>
    //                         <NavigationMenuLink
    //                           className={`${navigationMenuTriggerStyle()} -ml-px block border-l border-transparent pl-4 hover:text-primary-300 dark:text-primary-200 dark:hover:text-primary-300 ${pathname?.includes(subLink.href) && link.href !== '/' ? ' text-primary-400' : ''} ${
    //                             pathname === '/' && link.href === '/'
    //                               ? ' text-primary-400'
    //                               : ''
    //                           }`}
    //                         >
    //                           {ssLink.label}
    //                         </NavigationMenuLink>
    //                       </Link>
    //                     </NavigationMenuItem>
    //                   );
    //                 })}
    //               </NavigationMenuItem>
    //             );
    //           })}
    //         </NavigationMenuItem>
    //       );
    //     })}
    //   </NavigationMenuList>
    // </NavigationMenu>
  );
};

export default SideBar;
export { SideBar };
