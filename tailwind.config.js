const colors = require('@tailwindcss/ui/colors')
const theme = require('tailwindcss/defaultTheme')

const brandColor = colors.blue

const headingStyle = {
  color: colors.gray[800],
}

module.exports = {
  theme: {
    colors: { ...colors, brand: brandColor },
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif'],
      },
      inset: {
        '16': '4rem',
        '20': '5rem',
        '1/2': '50%',
      },
      width: {
        '3/8': '37.5%',
      },
    },
    screens: {
      '2xs': '360px',
      xs: '480px',
      ...theme.screens,
    },
    typography: {
      default: {
        css: {
          color: colors.gray[500],
          a: {
            color: brandColor[600],
            textDecoration: 'none',
            transitionDuration: '200ms',
            transitionProperty: 'color',
            '&:hover': {
              color: brandColor[700],
            },
          },
          h2: headingStyle,
          h3: headingStyle,
          h4: headingStyle,
          h5: headingStyle,
          h6: headingStyle,
        },
      },
    },
  },
  variants: {
    display: ['responsive', 'group-hover'],
    margin: ['responsive', 'last'],
  },
  plugins: [require('@tailwindcss/typography')],
  purge: {
    content: ['./components/**/*.js', './pages/**/*.js'],
    mode: 'all',
  },
}
