if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
}

module.exports = {
  env: { STATIC_URL: process.env.STATIC_URL }
}
