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

  useEffect(() => {
    let link: HTMLLinkElement;
    if (theme === 'light') {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = '/styles/prism-tomorrow.min.css';
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }

    if (theme === 'dark') {
      link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = '/styles/prism-okaidia.min.css';
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [theme]);

  return null;
};

export default CodeSnippet;
