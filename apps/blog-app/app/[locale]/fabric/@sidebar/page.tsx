'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function FabricPageSideBar() {
  const { t } = useTranslation();

  const links = useMemo(
    () => [{ href: '/fabric/initial', label: t('initial') }],
    [t]
  );

  return (
    <div>
      <ul className="menu md:ml-8">
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
  );
}
