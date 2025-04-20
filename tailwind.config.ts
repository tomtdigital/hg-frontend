import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        black: '#4D4B4B',
        blue: '#52d9e2',
        lightGrey: '#aaaaaa',
        midGrey: '#4d4b4b',
        darkGrey: '#222',
        darkPurple: '#3c1053',
        green: '#47d7ac',
        pastel: '#cfc7dd',
        pink: '#d42360',
        purple: '#614b79',
        red: '#dd0000',
        yellow: '#fdda24',
        white: '#fff',
      },
      screens: {
        device: '375px',
      },
      fontSize: {
        header1: '1.8em',
        header2: '1.5em',
        header3: '1.2em',
        header4: '1.1em',
        header5: '1em',
        para: '10em',
      },
      lineHeight: {
        header1: '3.4em',
        header2: '2em',
        header3: '1.6em',
        header4: '1.5em',
        header5: '1.5em',
        para: '1.5em',
      },
      boxShadow: {
        z1: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);',
      },
    },
  },
  plugins: [],
};

export default config;
