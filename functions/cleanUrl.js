export default function cleanUrl(url) {
  if (!url) {
    return null
  }

  // Remove site URL
  if (url.indexOf(process.env.SITE_URL) === 0) {
    url = url.replace(process.env.SITE_URL, '')
  }

  // Remove CMS URL
  if (url.indexOf(process.env.CMS_URL) === 0) {
    url = url.replace(process.env.CMS_URL, '')
  }

  // Remove trailing slash
  if (url !== '/') {
    url = url.replace(/\/$/, '')
  }

  return url
}
