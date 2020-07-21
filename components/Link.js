import Link from 'next/link'

export default ({
  arrowleft = false,
  arrowright = false,
  children,
  className,
  href
}) => {
  // Remove app URL or WordPress URL from links
  href = (href.indexOf(process.env.URL) == 0) ? href.replace(process.env.URL, '') : href
  href = (href.indexOf(process.env.WP_URL) == 0) ? href.replace(process.env.WP_URL, '') : href

  // Remove trailing slash
  href = (href == '/') ? href : href.replace(/\/$/, '');

  const as = href;
  let rel = undefined;
  let target = undefined;

  // Set template based on href attribute
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
        {arrowleft && (
        <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {children}
      {arrowright && (
        <svg className="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
      </a>
    </Link>
  )
}
