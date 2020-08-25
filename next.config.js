const transpiled = require('next-transpile-modules')(['lodash-es'])

const redirects = async () => [
  {
    source: '/admin',
    destination: `${process.env.WP_URL}/wp/wp-admin/`,
    permanent: false,
  },
  {
    source: '/wp-admin',
    destination: `${process.env.WP_URL}/wp/wp-admin/`,
    permanent: false,
  },
]

const { SITE_URL, TRACKING_ID, WP_URL } = process.env

module.exports = transpiled({
  env: { SITE_URL, TRACKING_ID, WP_URL },
  redirects,
})
