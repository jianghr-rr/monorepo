import type { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from '~/components/theme-provider';

type Props = PropsWithChildren<Record<string, unknown>>;

export const AppProviders: FC<Props> = (props) => {
  const { children } = props;

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};
