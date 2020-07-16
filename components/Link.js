import Link from 'next/link'

export default function ({ as, children, className, href }) {
  return (
      <Link href={href} as={as}>
        <a className={`text-brand-500 hover:text-brand-600 transition-color duration-200 ${className}`}>
          {children}
        </a>
      </Link>
  )
}
