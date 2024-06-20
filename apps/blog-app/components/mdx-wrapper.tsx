import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';

export default function MDXWrapper({ children }: { children?: ReactNode }) {
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div
      className={`prose ${currentTheme === 'dark' ? 'prose-dark' : 'prose-light'} my-8 w-full`}
    >
      {children}
    </div>
  );
}

export { MDXWrapper };
