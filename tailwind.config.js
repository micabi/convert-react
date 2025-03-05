import {defaultTheme } from 'tailwindcss/defaultTheme';

export default {
  mode: 'jit',
  content: [
    // './src/*.{js, ts, tsx, jsx}',
    // './src/**/*.{js, ts, tsx, jsx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      ...defaultTheme.screens,
    }
  },
  plugins: []
}