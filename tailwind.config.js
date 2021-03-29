const colors = require('tailwindcss/colors')
const theme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    borderColor: (theme) => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.200', 'currentColor'),
    }),
    extend: {
      colors: {
        gray: colors.coolGray,
        brand: theme.colors.blue,
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
      },
      inset: {
        '1/2': '50%',
        16: '4rem',
        20: '5rem',
        full: '100%',
      },
      spacing: {
        '3/8': '37.5%',
        '9/16': '56.25%',
        18: '4.5rem',
      },
    },
    screens: {
      '2xs': '360px',
      xs: '480px',
      ...theme.screens,
    },
  },
  plugins: [require('@tailwindcss/forms')],
  purge: {
    content: ['./components/**/*.js', './pages/**/*.js'],
    mode: 'all',
    options: {
      whitelist: ['html'],
    },
  },
  variants: {
    extend: {
      borderRadius: ['first', 'last'],
      display: ['group-hover'],
      margin: ['last'],
      translate: ['group-hover'],
    },
  },
}
