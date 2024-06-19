import { useTheme } from 'next-themes';
import type { ReactNode } from 'react';

export default function MDXWrapper({ children }: { children?: ReactNode }) {
  const { theme } = useTheme();
  console.log('theme', theme);

  return (
    <div
      className={`prose ${theme === 'dark' ? 'prose-dark' : 'prose-light'} mx-auto my-8`}
    >
      {children}
    </div>
  );
}

export { MDXWrapper };
