module.exports = {
  images: {
    domains: ['localhost', process.env.CMS_URL.replace(/^https?:\/\//, '')],
  },
  async redirects() {
    return [
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
  },
}
