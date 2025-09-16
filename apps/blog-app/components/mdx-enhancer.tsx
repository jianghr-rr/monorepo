'use client';

import type { ReactNode } from 'react';
import { useLayoutEffect } from 'react';
import { useTheme } from 'next-themes';
import mermaid from 'mermaid';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.min.css';

type Props = {
  children?: ReactNode;
};

export function MdxEnhancer({ children }: Props) {
  const { theme, systemTheme } = useTheme();
  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      try {
        const mermaidCodeBlocks = document.querySelectorAll('pre > code.language-mermaid');
        mermaidCodeBlocks.forEach((codeEl, index) => {
          const preEl = codeEl.parentElement; // <pre>
          const graphDefinition = codeEl.textContent || '';
          const container = document.createElement('div');
          container.className = 'mermaid';
          container.id = `mermaid-${index}`;
          container.textContent = graphDefinition;
          if (preEl && preEl.parentElement) {
            preEl.parentElement.replaceChild(container, preEl);
          }
        });

        mermaid.initialize({ startOnLoad: false, theme: resolvedTheme === 'dark' ? 'dark' : 'default' });
        const mermaidNodes = document.querySelectorAll('.mermaid');
        if (mermaidNodes.length > 0) {
          // @ts-ignore
          mermaid.run({ querySelector: '.mermaid' });
        }
      } catch (e) {
        console.warn('Mermaid init failed:', e);
      }

      document.querySelectorAll('pre').forEach((block) => {
        if (block instanceof HTMLElement) {
          hljs?.highlightBlock(block);
        }
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [resolvedTheme]);

  return <>{children}</>;
}

export default MdxEnhancer;


