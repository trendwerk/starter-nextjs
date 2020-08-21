const transpiled = require('next-transpile-modules')(['lodash-es'])

const redirects = async () => [
  {
    source: '/admin',
    destination: `${process.env.WP_URL}/wp/wp-admin/`,
    permanent: false,
  },
]

module.exports = transpiled({
  env: { SITE_URL: process.env.SITE_URL, WP_URL: process.env.WP_URL },
  redirects,
})
