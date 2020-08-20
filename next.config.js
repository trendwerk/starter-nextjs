const transpiled = require('next-transpile-modules')(['lodash-es'])

const redirects = async () => [
  {
    source: '/admin',
    destination: `${process.env.WP_URL}/wp/wp-admin/`,
    permanent: false,
  },
]

module.exports = transpiled({
  env: { URL: process.env.URL, WP_URL: process.env.WP_URL },
  redirects,
})
