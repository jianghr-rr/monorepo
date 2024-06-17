'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const CodeSnippet = () => {
  const { theme } = useTheme();

  useEffect(() => {
    let link: HTMLLinkElement;
    if (theme) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = `/styles/atom-one-${theme}.css`;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [theme]);

  return null;
};

export default CodeSnippet;
