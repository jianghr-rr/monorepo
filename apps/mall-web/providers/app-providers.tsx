'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from 'next/dynamic';
import type { FC, PropsWithChildren } from 'react';
import TranslationsProvider from './translations-provider';
const ThemeProvider = dynamic(() => import('./theme-provider'), { ssr: false });

type Props = PropsWithChildren<{
  locale: string;
  namespaces: string[];
  resources: Record<string, any>;
}>;

export const AppProviders: FC<Props> = (props) => {
  const { children, locale, namespaces, resources } = props;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TranslationsProvider
        namespaces={namespaces}
        locale={locale}
        resources={resources}
      >
        {children}
      </TranslationsProvider>
    </ThemeProvider>
  );
};