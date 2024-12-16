/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Config } from 'tailwindcss';
const flowbite = require('flowbite-react/tailwind');

const config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        lexend: ['var(--font-lexend)'],
        lexendBold: ['var(--font-lexend-bold)'],
      },
      typography: (theme: any) => ({
        light: {
          css: {
            color: theme('colors.gray.900'),
            h1: {
              color: theme('colors.purple.900'),
            },
            h2: {
              color: theme('colors.purple.800'),
            },
            a: {
              color: theme('colors.purple.600'),
              '&:hover': {
                color: theme('colors.purple.800'),
              },
            },
            // 其他 light 主题的自定义样式
          },
        },
        dark: {
          css: {
            'h1, h2, h3, h4, strong, p': {
              color: theme('colors.gray.100'),
            },
            color: theme('colors.gray.100'),
            a: {
              color: theme('colors.purple.400'),
              '&:hover': {
                color: theme('colors.purple.600'),
              },
            },
            // 其他 dark 主题的自定义样式
          },
        },
        DEFAULT: {
          css: {
            margin: '0 auto !important',
            'h2, h3, h4, h5, ul, ol': {
              'margin-top': '1em',
              'margin-bottom': '0.6em',
            },
            h1: {
              'font-size': theme('fontSize.3xl'),
              'margin-top': '1.25rem !important',
              'margin-bottom': '1.25rem',
            },
            'p, pre, blockquote': {
              'margin-top': '0.6em',
              'margin-bottom': '0.6em',
            },
            li: {
              'margin-top': '0px',
              'margin-bottom': '0px',
            },
            'li > p, li > ul, li > ol ': {
              'margin-top': '0px',
              'margin-bottom': '0px',
            },
            hr: {
              'margin-top': '1em',
              'margin-bottom': '1em',
            },
            p: {
              'margin-top': '1rem',
              'margin-bottom': '1rem',
              'font-size': '1rem',
              'line-height': '1.5rem',
              '--tw-text-opacity': '1',
              color: 'rgb(51 65 85 / var(--tw-text-opacity))',
            },
          },
        },
      }),
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
