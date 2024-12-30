/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import path from 'path';
import type { Config } from 'tailwindcss';
const flowbite = require('flowbite-react/tailwind');
console.log('123', path.join(__dirname, 'app/**/*.{js,ts,jsx,tsx,mdx}'));
const config = {
  darkMode: 'class',
  content: [
    path.join(__dirname, 'app/**/*.{js,ts,jsx,tsx,mdx}'), // 动态解析 app 目录
    path.join(__dirname, 'pages/**/*.{js,ts,jsx,tsx,mdx}'), // 动态解析 pages 目录
    path.join(__dirname, 'components/**/*.{js,ts,jsx,tsx,mdx}'), // 动态解析 components 目录
    path.join(__dirname, 'node_modules/flowbite-react/dist/esm/**/*.mjs'), // 动态解析 flowbite-react

    // './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './components/**/*.{js,ts,jsx,tsx,mdx}',
    // flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        lexend: ['var(--font-lexend)'],
        lexendBold: ['var(--font-lexend-bold)'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    flowbite.plugin(),
  ],
  // variants: {
  //   extend: {
  //     display: ['group-hover'],
  //   },
  // },
} satisfies Config;

export default config;
