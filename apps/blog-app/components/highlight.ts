/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // 使用 GitHub 样式

export default function highlightCode() {
  document.querySelectorAll('pre code').forEach((block) => {
    if (block instanceof HTMLElement) {
      hljs?.highlightBlock(block);
    }
    // hljs?.highlightBlock(block);
  });
}
