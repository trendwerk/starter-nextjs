const transpiled = require('next-transpile-modules')(['lodash-es'])

const redirects = async () => [
  {
    source: '/admin',
    destination: `${process.env.CMS_URL}/wp/wp-admin/`,
    permanent: false,
  },
  {
    source: '/cms',
    destination: `${process.env.CMS_URL}/wp/wp-admin/`,
    permanent: false,
  },
  {
    source: '/wp-admin',
    destination: `${process.env.CMS_URL}/wp/wp-admin/`,
    permanent: false,
  },
]

const { SITE_URL, TRACKING_ID, CMS_URL } = process.env

module.exports = transpiled({
  env: { SITE_URL, TRACKING_ID, CMS_URL },
  redirects,
})
