import Link from 'next/link'

export default ({ children, className, href }) => {
  // Remove app URL or WordPress URL from links
  href = (href.indexOf(process.env.URL) == 0) ? href.replace(process.env.URL, '') : href
  href = (href.indexOf(process.env.WP_URL) == 0) ? href.replace(process.env.WP_URL, '') : href

  // Remove trailing slash
  href = (href == '/') ? href : href.replace(/\/$/, '');

  const as = href;
  let rel = undefined;
  let target = undefined;

  // Set template file based on href attribute
  if (href.indexOf('/blog/') == 0) {
    href = '/blog/[post]'
  } else if (href.indexOf('/blog') == 0) {
    href = '/blog'
  } else if (href.indexOf('/') == 0) {
    href = '/[page]'
  } else if (href === '/') {
    href = '/'
  }else {
    rel="noopener"
    target="_blank"
  }

  return (
    <Link href={href} as={as}>
      <a
        className={className}
        rel={rel}
        target={target}
      >
        {children}
      </a>
    </Link>
  )
}
