import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#2563eb',
        'accent-hover': '#1d4ed8',
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          elevated: '#334155',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-lora)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'Menlo', 'monospace'],
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.slate[700]'),
            '--tw-prose-headings': theme('colors.slate[900]'),
            '--tw-prose-links': theme('colors.blue[600]'),
            '--tw-prose-code': theme('colors.slate[900]'),
            '--tw-prose-pre-bg': '#0f172a',
            fontFamily: 'var(--font-lora), Georgia, serif',
            'h2, h3, h4': {
              fontFamily: 'var(--font-inter), system-ui, sans-serif',
            },
            a: {
              textDecoration: 'underline',
              textDecorationColor: theme('colors.blue[300]'),
              textUnderlineOffset: '3px',
              '&:hover': {
                color: theme('colors.blue[700]'),
              },
            },
            code: {
              fontFamily: 'var(--font-mono), Menlo, monospace',
              backgroundColor: theme('colors.slate[100]'),
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '0.875em',
              fontWeight: '400',
              '&::before': { content: '""' },
              '&::after': { content: '""' },
            },
            pre: {
              backgroundColor: 'transparent',
              padding: '0',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.slate[300]'),
            '--tw-prose-headings': theme('colors.slate[100]'),
            '--tw-prose-links': theme('colors.blue[400]'),
            '--tw-prose-code': theme('colors.slate[200]'),
            code: {
              backgroundColor: theme('colors.slate[800]'),
            },
            a: {
              textDecorationColor: theme('colors.blue[600]'),
              '&:hover': {
                color: theme('colors.blue[300]'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
}

export default config
