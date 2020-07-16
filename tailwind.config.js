const colors = require('@tailwindcss/ui/colors')

module.exports = {
  theme: {
    colors,
    extend: {
      colors: {
        brand: colors.blue
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  purge: {
    content: ['./components/**/*.js', './pages/**/*.js'],
    mode: 'all',
  },
}
