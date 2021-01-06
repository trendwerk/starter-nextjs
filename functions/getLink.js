const getLink = function (href) {
  const link = {
    as: href,
    href: undefined,
    external: false,
  }

  // Remove app URL or WordPress URL from link
  if (link.as.indexOf(process.env.SITE_URL) === 0) {
    link.as = link.as.replace(process.env.SITE_URL, '')
  } else if (link.as.indexOf(process.env.WP_URL + '/wp/') === 0) {
    link.external = true
  } else if (link.as.indexOf(process.env.WP_URL) === 0) {
    link.as = link.as.replace(process.env.WP_URL, '')
  }

  // Remove trailing slash
  if (link.as !== '/') {
    link.as = link.as.replace(/\/$/, '')
  }

  // Set template based on href attribute
  if (link.as === '/') {
    link.href = '/'
  } else if (link.as === '/blog') {
    link.href = '/blog'
  } else if (link.as.indexOf('/blog/') === 0) {
    link.href = '/blog/[post]'
  } else if (link.as.indexOf('/blog-category/') === 0) {
    link.href = '/blog-category/[category]'
  } else if (link.as.indexOf('/') === 0) {
    link.href = '/[...page]'
  } else {
    // External links
    link.href = link.as
    link.external = true
  }

  return link
}

export default getLink
