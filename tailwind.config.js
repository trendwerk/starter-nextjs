const colors = require('@tailwindcss/ui/colors')

module.exports = {
  theme: {
    colors,
    extend: {
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
