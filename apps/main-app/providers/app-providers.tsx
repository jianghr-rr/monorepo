/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC, PropsWithChildren } from 'react';

import { ThemeProvider } from '~/components/theme-provider';
import TranslationsProvider from '~/components/translations-provider';

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
