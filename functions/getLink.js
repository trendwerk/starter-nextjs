import cleanUrl from 'utils/cleanUrl'

export default function getLink(href) {
  if (!href) {
    return {
      external: false,
      href: '/404',
    }
  }

  return {
    external:
      href.indexOf('/') === 0 ||
      href.indexOf(process.env.CMS_URL) === 0 ||
      href.indexOf(process.env.SITE_URL) === 0
        ? false
        : true,
    href: cleanUrl(href),
  }
}
