import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';

export default function MDXWrapper({ children }: { children?: ReactNode }) {
  const { theme } = useTheme();

  return (
    <div
      className={`prose ${theme === 'dark' ? 'prose-dark' : 'prose-light'} my-8 w-full`}
    >
      {children}
    </div>
  );
}

export { MDXWrapper };
