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
      yellow: colors.yellow,
      red: colors.red,
      customIndigo: '#6B5FD6',
      profileIndigo: 'rgba(79,70,229,1)',
    },
    screens: {
      '3xl': { max: '1919px' },
      // => @media (max-width: 1920px) { ... }

      '2xl': { max: '1735px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '767px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
    },
  },

  variants: {
    extend: {},
  },
  plugins: [],
};
