const colors = require('@tailwindcss/ui/colors')
const theme = require('tailwindcss/defaultTheme')
const config = require('tailwindcss/defaultConfig')

module.exports = {
  theme: {
    colors: { ...colors, brand: colors.blue },
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif'],
      },
      inset: {
        '16': '4rem',
        '20': '5rem',
        '1/2': '50%',
      },
    },
    screens: {
      '2xs': '360px',
      xs: '480px',
      ...theme.screens,
    },
  },
  variants: {
    display: [...config.variants.display, 'group-hover'],
    margin: [...config.variants.margin, 'last'],
  },
  purge: {
    content: ['./components/**/*.js', './pages/**/*.js'],
    mode: 'all',
  },
}
