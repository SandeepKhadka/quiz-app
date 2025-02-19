/** @type {import('tailwindcss').Config} */
import colors from './colors';
import fontSize from './fontSize';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: { colors, fontSize },
  },
  plugins: [],
};
