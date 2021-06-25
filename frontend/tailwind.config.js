const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {},
    extend: {},
    colors: {
      indigo: colors.indigo,
      white: colors.white,
      black: colors.black,
      gray: colors.coolGray,
      green: colors.green,
      red: colors.red,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
