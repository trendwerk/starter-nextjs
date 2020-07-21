import Link from 'next/link'

export default ({ children, className, href }) => {
  // Remove app URL or WordPress URL from links
  href = (href.startsWith(process.env.URL)) ? href.replace(process.env.URL, '') : href
  href = (href.startsWith(process.env.WP_URL)) ? href.replace(process.env.WP_URL, '') : href

  const as = href;
  const target = false;
  const rel = false;

  // Set template file based on href attribute
  if (href.startsWith('/blog/')) {
    href = '/blog/[post]'
  } else if (href.startsWith('/blog')) {
    href = '/blog'
  } else if (href.startsWith('/')) {
    href = '/[page]'
  } else {
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
