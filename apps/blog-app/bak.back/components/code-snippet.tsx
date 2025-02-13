'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

const CodeSnippet = () => {
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    let link: HTMLLinkElement;
    const currentTheme = theme === 'system' ? systemTheme : theme;
    if (currentTheme) {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = `/styles/atom-one-${currentTheme}.css`;
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [theme, systemTheme]);

  useEffect(() => {
    let link: HTMLLinkElement;
    const currentTheme = theme === 'system' ? systemTheme : theme;
    if (currentTheme === 'light') {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = '/styles/prism-tomorrow.min.css';
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }

    if (currentTheme === 'dark') {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = '/styles/prism-okaidia.min.css';
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [theme, systemTheme]);

  return null;
};

export default CodeSnippet;
