import Link from 'components/Link'

const Button = function ({ children, className = '', href, large = false }) {
  return (
    <Link
      className={`
          bg-brand-600
          duration-200
          font-semibold
          hover:bg-brand-700
          inline-block
          rounded-lg
          shadow-md
          text-center
          text-white
          transition-bg
          ${
            large
              ? `
            px-8
            py-4
          `
              : `
            px-6
            py-3
            text-sm
          `
          }
          ${className}
      `}
      href={href}
    >
      {children}
    </Link>
  )
}

export default Button
