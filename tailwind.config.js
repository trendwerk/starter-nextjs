const config = require('tailwindcss/defaultConfig')
const theme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    borderColor: { ...theme.colors, DEFAULT: theme.colors.gray[200] },
    colors: { ...theme.colors, brand: theme.colors.blue },
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif'],
      },
      inset: {
        16: '4rem',
        20: '5rem',
        '1/2': '50%',
        full: '100%',
      },
      spacing: {
        '3/8': '37.5%',
        '9/16': '56.25%',
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
    borderRadius: [...config.variants.borderRadius, 'first', 'last'],
    display: [...config.variants.display, 'group-hover'],
    margin: [...config.variants.margin, 'last'],
    translate: [...config.variants.display, 'group-hover'],
  },
}
