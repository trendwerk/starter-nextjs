const colors = require('@tailwindcss/ui/colors')
const theme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    colors: { ...colors, brand: colors.blue },
    screens: {
      '2xs': '360px',
      xs: '480px',
      ...theme.screens
    },
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif']
      }
    }
  },
  purge: {
    content: ['./components/**/*.js', './pages/**/*.js'],
    mode: 'all'
  }
}
