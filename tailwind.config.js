const colors = require('@tailwindcss/ui/colors')
const theme = require('tailwindcss/defaultTheme')

const brandColor = colors.blue;

const headingStyle = {
  color: colors.gray[800],
};

module.exports = {
  theme: {
    colors: { ...colors, brand: brandColor },
    screens: {
      '2xs': '360px',
      xs: '480px',
      ...theme.screens
    },
    typography: {
      default: {
        css: {
          color: colors.gray[500],
          a: {
            color: brandColor[600],
            textDecoration: 'none',
          },
          h2: headingStyle,
          h3: headingStyle,
          h4: headingStyle,
          h5: headingStyle,
          h6: headingStyle,
        },
      },
    },
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
  purge: {
    content: ['./components/**/*.js', './pages/**/*.js'],
    mode: 'all'
  }
}
