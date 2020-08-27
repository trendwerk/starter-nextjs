import Link from 'next/link'
import getLink from 'utils/getLink'

export default function LinkComponent({
  arrow = false,
  children,
  className = '',
  href,
  onClick,
}) {
  const link = getLink(href)

  className = arrow ? `inline-flex items-center group ${className}` : className

  return link.external ? (
    <a
      className={className}
      href={link.href}
      onClick={onClick}
      rel="noopener"
      target="_blank"
    >
      <Content arrow={arrow}>{children}</Content>
    </a>
  ) : (
    <Link href={link.href} as={link.as}>
      <a className={className} onClick={onClick}>
        <Content arrow={arrow}>{children}</Content>
      </a>
    </Link>
  )
}

export const Content = ({ arrow, children }) => {
  const className = `
    ${
      arrow === 'right'
        ? 'group-hover:translate-x-1 group-hover:bg-red-300'
        : 'group-hover:-translate-x-1'
    }
    duration-100
    flex-none
    h-4
    mx-1
    transform
    transition
    w-4
  `

  return (
    <>
      {arrow === 'left' && (
        <svg className={className} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {children}
      {arrow === 'right' && (
        <svg className={className} fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </>
  )
}
