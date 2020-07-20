if (process.env.NODE_ENV === 'development') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0
}

module.exports = {
  env: {
    API_URL: process.env.API_URL,
    LANGUAGE: process.env.LANGUAGE,
   }
}
