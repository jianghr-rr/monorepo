import type { Config } from 'tailwindcss';
// import { fontFamily } from 'tailwindcss/defaultTheme';

const config = {
  darkMode: 'class',
  // safelist: [
  //   {
  //     pattern: /hljs+/,
  //   },
  // ],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
          DEFAULT: '#8b5cf6',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      typography: {
        DEFAULT: {
          css: {
            'h2, h3, h4, h5, ul, ol': {
              'margin-top': '1em',
              'margin-bottom': '0.6em',
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
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
} satisfies Config;

export default config;
