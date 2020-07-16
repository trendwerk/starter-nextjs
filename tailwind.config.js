const colors = require('@tailwindcss/ui/colors')

module.exports = {
  theme: { colors },
  purge: {
    content: ['./components/**/*.js', './pages/**/*.js'],
    mode: 'all',
  },
}
