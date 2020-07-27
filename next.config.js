const transpiled = require('next-transpile-modules')(['lodash-es'])

module.exports = transpiled({
  env: { URL: process.env.URL, WP_URL: process.env.WP_URL },
})
