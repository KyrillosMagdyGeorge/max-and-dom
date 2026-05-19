import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c8a14a',
          dark: '#8b6b1f',
          light: '#e8d49a',
        },
        brown: {
          DEFAULT: '#5a3a22',
          dark: '#3a2410',
        },
        beige: {
          DEFAULT: '#f5ecd9',
          dark: '#e7d8b4',
        },
        darkred: '#7a1f1f',
      },
      fontFamily: {
        serif: ['var(--font-cairo)', 'var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-cairo)', 'var(--font-cinzel)', 'serif'],
      },
      backgroundImage: {
        cross: "url('/images/cross-pattern.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
